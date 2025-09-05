import Bases from ".";
import Instances from "../consts";
import Colors from "../consts/colors";

const Objects = {
    player(scene, scale = 1.8) {
        const player = scene.physics.add
            .sprite(Instances.game.width / 2, Instances.game.height, Instances.image.key.player)
            .setBounce(0.2)
            .setScale(scale);

        player.body.setCollideWorldBounds(true);

        return player;
    },
    animations(scene) {
        scene.anims.create({
            key: "left",
            frames: scene.anims.generateFrameNumbers(Instances.image.key.player, { start: 0, end: 3 }),
            frameRate: 16,
            repeat: -1,
        });
        scene.anims.create({
            key: "right",
            frames: scene.anims.generateFrameNumbers(Instances.image.key.player, { start: 5, end: 8 }),
            frameRate: 16,
            repeat: -1,
        });
        scene.anims.create({
            key: "turn",
            frames: [{ key: Instances.image.key.player, frame: 4 }],
            frameRate: 20,
        });
    },
    bomb({ scene, x, y }) {
        const bomb = scene.physics.add.sprite(x, y, Instances.image.key.bomb).setScale(0.1);
        scene.bombBoxes.add(bomb);
        bomb.x = x;
        bomb.y = y;

        scene.physics.add.existing(bomb);
        scene.bombBoxes.add(bomb);
        bomb.body.setVelocityY(120);

        return bomb;
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
            bg: Colors.purple,
            strokeThickness,
            width,
            stroke: Colors.primary,
        });
    },
    boxes(element) {
        element.children.entries.forEach((box) => {
            if (box.textObj) {
                box.textObj.x = box.x;
                box.textObj.y = box.y;
            }

            if (box.y > Instances.game.height + 50) {
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
