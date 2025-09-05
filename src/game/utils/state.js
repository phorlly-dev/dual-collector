import Bases from ".";
import Instances from "../consts";
import Colors from "../consts/colors";
import Helpers from "./helper";

const States = {
    ui(scene) {
        scene.pauseText = Bases.text({
            scene,
            y: -80,
            text: "PAUSED",
            style: {
                fontSize: 48,
                color: Colors.white,
                stroke: Colors.primary,
            },
            isVisible: false,
        });
        scene.pauseInstructions = Bases.text({
            scene,
            text: "Click button ▶ play to resume",
            style: {
                color: Colors.primary,
                stroke: Colors.success,
                fontSize: 24,
                strokeThickness: 8,
            },
            isVisible: false,
        });
    },
    getSoundKey(operation) {
        switch (operation) {
            case "x":
                return Instances.audio.key.power;
            case "/":
                return Instances.audio.key.cut;
            case "+":
                return Instances.audio.key.power;
            case "-":
                return Instances.audio.key.cut;
            default:
                return Instances.audio.key.effect;
        }
    },
    togglePause(scene) {
        scene.isPaused = !scene.isPaused;

        if (scene.isPaused) {
            // Pause the game
            scene.physics.pause();
            scene.spawnTimer.paused = true;
            scene.pauseText.setVisible(true);
            scene.pauseInstructions.setVisible(true);

            Helpers.show({ element: scene.playBtn });
            Helpers.hide({ element: scene.pauseBtn });
            Helpers.playSound(scene, Instances.audio.key.click);
        } else {
            // Resume the game
            scene.physics.resume();
            scene.spawnTimer.paused = false;
            scene.pauseText.setVisible(false);
            scene.pauseInstructions.setVisible(false);

            Helpers.hide({ element: scene.playBtn });
            Helpers.show({ element: scene.pauseBtn });
            Helpers.playSound(scene, Instances.audio.key.start);
        }
    },
    textPopup({ scene, x, y, changeText, resultText, color }) {
        const popup = scene.add
            .text(x, y - 30, changeText, {
                fontSize: "20px",
                fill: color,
                fontWeight: "bold",
                stroke: Colors.white,
                strokeThickness: 2,
            })
            .setOrigin(0.5);

        const result = scene.add
            .text(x, y - 10, resultText, {
                fontSize: "14px",
                fill: Colors.white,
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        scene.tweens.add({
            targets: [popup, result],
            y: y - 80,
            alpha: 0,
            duration: 1000,
            ease: "Power2",
            onComplete: () => {
                popup.destroy();
                result.destroy();
            },
        });
    },
};

export default States;
