import { powersOf2, textBox } from ".";
import { height, image, width } from "../consts";
import { purple } from "../consts/colors";

const Objects = {
    player(scene, scale = 1.8) {
        const plr = scene.physics.add
            .sprite(width / 2, height, image.key.player)
            .setBounce(0.2)
            .setScale(scale);

        plr.body.setCollideWorldBounds(true);

        return plr;
    },
    animations(scene) {
        if (!scene.anims.exists("left")) {
            scene.anims.create({
                key: "left",
                frames: scene.anims.generateFrameNumbers(image.key.player, { start: 0, end: 3 }),
                frameRate: 16,
                repeat: -1,
            });
        }

        if (!scene.anims.exists("right")) {
            scene.anims.create({
                key: "right",
                frames: scene.anims.generateFrameNumbers(image.key.player, { start: 5, end: 8 }),
                frameRate: 16,
                repeat: -1,
            });
        }

        if (!scene.anims.exists("turn")) {
            scene.anims.create({
                key: "turn",
                frames: [{ key: image.key.player, frame: 4 }],
                frameRate: 20,
            });
        }
    },
    bomb({ scene, x, y }) {
        const bom = scene.physics.add.sprite(x, y, image.key.bomb).setScale(0.1);
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

        textBox({
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
        let { value, widthBox } = 60;
        const operator = Phaser.Math.RND.pick(["x", "/"]);
        if (operator === "x") {
            value = powersOf2(Phaser.Math.Between(1, 11));
            widthBox = 70;
        } else {
            value = Phaser.Math.Between(2, 4);
        }

        textBox({
            scene,
            x,
            y,
            element: scene.powerBoxes,
            operator,
            value,
            fontSize,
            bg: purple.hex,
            strokeThickness,
            width: widthBox,
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

export const { player, animations, bomb, score, power, boxes, bindButtons, bindToggleButtons } = Objects;
