import Bases from ".";
import Instances from "../consts";
import Colors from "../consts/colors";

const { width, height } = Instances.game;
const { player, bomb } = Instances.image.key;
const { purple } = Colors;
const Objects = {
    player(scene, scale = 1.8) {
        const plr = scene.physics.add
            .sprite(width / 2, height, player)
            .setBounce(0.2)
            .setScale(scale);

        plr.body.setCollideWorldBounds(true);

        return plr;
    },
    animations(scene) {
        if (!scene.anims.exists("left")) {
            scene.anims.create({
                key: "left",
                frames: scene.anims.generateFrameNumbers(player, { start: 0, end: 3 }),
                frameRate: 16,
                repeat: -1,
            });
        }

        if (!scene.anims.exists("right")) {
            scene.anims.create({
                key: "right",
                frames: scene.anims.generateFrameNumbers(player, { start: 5, end: 8 }),
                frameRate: 16,
                repeat: -1,
            });
        }

        if (!scene.anims.exists("turn")) {
            scene.anims.create({
                key: "turn",
                frames: [{ key: player, frame: 4 }],
                frameRate: 20,
            });
        }
    },
    bomb({ scene, x, y }) {
        const bom = scene.physics.add.sprite(x, y, bomb).setScale(0.1);
        scene.bombBoxes.add(bom);
        bom.x = x;
        bom.y = y;

        scene.physics.add.existing(bom);
        scene.bombBoxes.add(bom);
        bom.body.setVelocityY(120);

        return bom;
    },
    score({ scene, x, y, fontSize, strokeThickness }) {
        const operator = Phaser.Math.RND.pick(["+", "-"]);
        const value = operator === "+" ? Phaser.Math.Between(50, 500) : Phaser.Math.Between(25, 250);

        Bases.textBox({
            scene,
            x,
            y,
            element: scene.scoreBoxes,
            operator,
            value,
            fontSize,
            strokeThickness,
        });
    },
    power({ scene, x, y, fontSize, strokeThickness }) {
        let { value, width } = 60;
        const operator = Phaser.Math.RND.pick(["x", "/"]);
        if (operator === "x") {
            value = Bases.powersOf2(Phaser.Math.Between(1, 11));
            width = 70;
        } else {
            value = Phaser.Math.Between(2, 4);
        }

        Bases.textBox({
            scene,
            x,
            y,
            element: scene.powerBoxes,
            operator,
            value,
            fontSize,
            bg: purple.hex,
            strokeThickness,
            width,
            stroke: purple.css,
        });
    },
    boxes(elements) {
        elements.children.entries.forEach((box) => {
            if (box.textObj) {
                box.textObj.x = box.x;
                box.textObj.y = box.y;
            }

            if (box.y > height + 50) {
                if (box.textObj) box.textObj.destroy();
                box.destroy();
            }
        });
    },
    bindButtons({ scene, elements, keys }) {
        elements.forEach((el, i) => {
            const key = keys[i]; // match button to key by index
            ["pointerdown", "pointerup", "pointerout"].forEach((ev) => {
                el.addEventListener(ev, () => (scene[key] = ev === "pointerdown"));
            });
        });
    },
    bindToggleButtons({ scene, elements, callback }) {
        elements.forEach((el) => el.addEventListener("pointerdown", () => callback(scene)));
    },
};

export default Objects;
