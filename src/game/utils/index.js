import { GAME_HEIGHT, GAME_WIDTH, LOAD_ASSETS } from "../consts";
import { black_color, white_color } from "../consts/colors";

const togglePause = (scene) => {
    scene.isPaused = !scene.isPaused;

    if (scene.isPaused) {
        // Pause the game
        scene.physics.pause();
        scene.spawnTimer.paused = true;
        scene.pauseText.setVisible(true);
        scene.pauseInstructions.setVisible(true);
        scene.sound.play(LOAD_ASSETS.KEY.CL);

        scene.pauseBtn.setVisible(false);
        scene.playBtn.setVisible(true);
    } else {
        // Resume the game
        scene.physics.resume();
        scene.spawnTimer.paused = false;
        scene.pauseText.setVisible(false);
        scene.pauseInstructions.setVisible(false);
        scene.sound.play(LOAD_ASSETS.KEY.ON);

        scene.pauseBtn.setVisible(true);
        scene.playBtn.setVisible(false);
    }
};

const boxTextPositions = (scene) => {
    scene.powerBoxes.children.entries.forEach((box) => {
        if (box.textObj) {
            box.textObj.x = box.x;
            box.textObj.y = box.y;
        }
        if (box.y > GAME_HEIGHT + 50) {
            if (box.textObj) box.textObj.destroy();
            box.destroy();
        }
    });

    scene.scoreBoxes.children.entries.forEach((box) => {
        if (box.textObj) {
            box.textObj.x = box.x;
            box.textObj.y = box.y;
        }
        if (box.y > GAME_HEIGHT + 50) {
            if (box.textObj) box.textObj.destroy();
            box.destroy();
        }
    });

    scene.bombBoxes.children.entries.forEach((bomb) => {
        if (bomb.textObj) {
            bomb.textObj.x = bomb.x;
            bomb.textObj.y = bomb.y;
        }
        if (bomb.y > GAME_HEIGHT + 50) {
            if (bomb.textObj) bomb.textObj.destroy();
            bomb.destroy();
        }
    });
};

const fontSize = Math.max(12, GAME_WIDTH / 50);
const setText = ({
    scene,
    y = 0,
    text,
    font = "Arial",
    size = fontSize,
    color = white_color,
    stroke = black_color,
    strokeThickness = 12,
}) =>
    scene.add
        .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + y, text, {
            fontFamily: font,
            fontSize: size,
            fill: color,
            stroke: stroke,
            strokeThickness: strokeThickness,
            align: "center",
        })
        .setOrigin(0.5);

export { boxTextPositions, setText, togglePause };
