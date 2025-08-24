import {
  GAME_WIDTH,
  powersOf2,
} from '../consts';
import {
  black_color,
  orange_color,
  purple_color,
} from '../consts/colors';

const spawnBoxes = (scene) => {
  if (scene.isPaused) return;

  const setY = -50;
  const strokeThickness = 3;
  const fontSize = Math.max(12, GAME_WIDTH / 50);

  const x1 = Phaser.Math.Between(80, 350);
  const x2 = Phaser.Math.Between(450, 720);
  const leftIsPower = Phaser.Math.Between(0, 1) === 0;

  const powerX = leftIsPower ? x1 : x2;
  const scoreX = leftIsPower ? x2 : x1;

  // --- Power Box ---
  const powerBox = scene.add.graphics();
  powerBox.fillStyle(purple_color);
  powerBox.fillRoundedRect(-30, -30, 60, 60, 12);
  powerBox.x = powerX;
  powerBox.y = setY;

  scene.physics.add.existing(powerBox);
  scene.powerBoxes.add(powerBox);

  const powerOp = Phaser.Math.RND.pick(["x", "/"]);
  let powerValue = powerOp === "x" ? powersOf2(Phaser.Math.Between(1, 11)) : Phaser.Math.Between(2, 4);
  powerBox.operation = powerOp;
  powerBox.value = powerValue;

  const powerText = scene.add.text(powerX, setY, `${powerOp}${powerValue}`, {
    fontSize: `${fontSize}px`,
    fill: "#fff",
    fontWeight: "bold",
    stroke: black_color,
    strokeThickness: strokeThickness,
  }).setOrigin(0.5);

  powerBox.textObj = powerText;
  powerBox.body.setVelocityY(120);

  // --- Score Box ---
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

  const scoreText = scene.add.text(scoreX, setY, `${scoreOp}${scoreValue}`, {
    fontSize: `${fontSize}px`,
    fill: "#fff",
    fontWeight: "bold",
    stroke: black_color,
    strokeThickness: strokeThickness,
  }).setOrigin(0.5);
  scoreBox.textObj = scoreText;
  scoreBox.body.setVelocityY(120);
}

export default spawnBoxes;
