import { width } from "../consts";
import { bomb, power, score } from "./object";

const spawnBoxes = (scene) => {
    if (scene.isPaused) return;

    const y = -50;
    const strokeThickness = 12;
    const fontSize = Math.max(12, width / 40);

    // Define 3 fixed lanes
    const lanes = [150, 400, 650];

    // Shuffle them so order is random
    Phaser.Utils.Array.Shuffle(lanes);

    // --- Power & Score Box ---
    power({ scene, x: lanes[0], fontSize, strokeThickness, y });
    score({ scene, x: lanes[1], fontSize, strokeThickness, y });

    // --- Bomb (20% chance) ---
    if (Phaser.Math.Between(0, 4) === 0) bomb({ scene, x: lanes[2], y });
};

export default spawnBoxes;
