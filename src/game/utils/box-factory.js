import { GAME_WIDTH, LOAD_ASSETS, powersOf2 } from "../consts";
import { black_color, orange_color, purple_color } from "../consts/colors";

const spawnBoxes = (scene) => {
    if (scene.isPaused) return;

    const setY = -50;
    const strokeThickness = 3;
    const fontSize = Math.max(12, GAME_WIDTH / 50);

    // Define 3 fixed lanes
    const lanes = [150, 400, 650];

    // Shuffle them so order is random
    Phaser.Utils.Array.Shuffle(lanes);

    // --- Power & Score Box ---
    spawnPowerBox(scene, lanes[0], fontSize, strokeThickness, setY);
    spawnScoreBox(scene, lanes[1], fontSize, strokeThickness, setY);

    // --- Bomb (20% chance) ---
    if (Phaser.Math.Between(0, 4) === 0) spwanBomb(scene, lanes[2], setY);
};

const spawnPowerBox = (scene, powerX, fontSize, strokeThickness, setY) => {
    const powerBox = scene.add.graphics();
    powerBox.fillStyle(purple_color);
    powerBox.fillRoundedRect(-30, -30, 60, 60, 12);
    powerBox.x = powerX;
    powerBox.y = setY;

    scene.physics.add.existing(powerBox);
    scene.powerBoxes.add(powerBox);

    // Add power operation
    const powerOp = Phaser.Math.RND.pick(["x", "/"]);
    let powerValue =
        powerOp === "x" ? powersOf2(Phaser.Math.Between(1, 11)) : Phaser.Math.Between(2, 4);
    powerBox.operation = powerOp;
    powerBox.value = powerValue;

    // === Add text to power
    const powerText = scene.add
        .text(powerX, setY, `${powerOp}${powerValue}`, {
            fontSize: `${fontSize}px`,
            fill: "#fff",
            fontWeight: "bold",
            stroke: black_color,
            strokeThickness: strokeThickness,
        })
        .setOrigin(0.5);

    powerBox.textObj = powerText;
    powerBox.body.setVelocityY(120);
};

const spawnScoreBox = (scene, scoreX, fontSize, strokeThickness, setY) => {
    const scoreBox = scene.add.graphics();
    scoreBox.fillStyle(orange_color);
    scoreBox.fillRoundedRect(-30, -30, 60, 60, 12);
    scoreBox.x = scoreX;
    scoreBox.y = setY;

    scene.physics.add.existing(scoreBox);
    scene.scoreBoxes.add(scoreBox);

    const scoreOp = Phaser.Math.RND.pick(["+", "-"]);
    let scoreValue = scoreOp === "+" ? Phaser.Math.Between(50, 500) : Phaser.Math.Between(25, 250);
    scoreBox.operation = scoreOp;
    scoreBox.value = scoreValue;

    // === Add text to score ===
    const scoreText = scene.add
        .text(scoreX, setY, `${scoreOp}${scoreValue}`, {
            fontSize: `${fontSize}px`,
            fill: "#fff",
            fontWeight: "bold",
            stroke: black_color,
            strokeThickness: strokeThickness,
        })
        .setOrigin(0.5);
    scoreBox.textObj = scoreText;
    scoreBox.body.setVelocityY(120);
};

const spwanBomb = (scene, bombX, setY) => {
    const bomb = scene.physics.add.sprite(bombX, setY, LOAD_ASSETS.KEY.BOMB).setScale(0.1);
    scene.bombBoxes.add(bomb);
    bomb.x = bombX;
    bomb.y = setY;
    scene.physics.add.existing(bomb);
    scene.bombBoxes.add(bomb);
    bomb.body.setVelocityY(120);
};

export { spawnPowerBox, spawnScoreBox, spwanBomb };
export default spawnBoxes;
