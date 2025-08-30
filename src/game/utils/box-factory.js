import Instances from "../consts";
import Objects from "./object";

const spawnBoxes = (scene) => {
    if (scene.isPaused) return;

    const setY = -50;
    const strokeThickness = 12;
    const fontSize = Math.max(12, Instances.game.width / 46);

    // Define 3 fixed lanes
    const lanes = [150, 400, 650];

    // Shuffle them so order is random
    Phaser.Utils.Array.Shuffle(lanes);

    // --- Power & Score Box ---
    Objects.power({ scene, x: lanes[0], fontSize, strokeThickness, y: setY });
    Objects.score({ scene, x: lanes[1], fontSize, strokeThickness, y: setY });

    // --- Bomb (20% chance) ---
    if (Phaser.Math.Between(0, 4) === 0) Objects.bomb({ scene, x: lanes[2], y: setY });
};

export default spawnBoxes;
