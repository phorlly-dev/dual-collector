import Bases from ".";
import Instances from "../consts";
import Colors from "../consts/colors";
import Objects from "./object";

const Helpers = {
    togglePause: (scene) => {
        scene.isPaused = !scene.isPaused;

        if (scene.isPaused) {
            // Pause the game
            scene.physics.pause();
            scene.spawnTimer.paused = true;
            scene.pauseText.setVisible(true);
            scene.pauseInstructions.setVisible(true);
            scene.sound.play(Instances.audio.key.click);

            Helpers.show({ element: scene.playBtn });
            Helpers.hide({ element: scene.pauseBtn });
        } else {
            // Resume the game
            scene.physics.resume();
            scene.spawnTimer.paused = false;
            scene.pauseText.setVisible(false);
            scene.pauseInstructions.setVisible(false);
            scene.sound.play(Instances.audio.key.start);

            Helpers.hide({ element: scene.playBtn });
            Helpers.show({ element: scene.pauseBtn });
        }
    },
    textBoxes: (scene) => {
        Objects.boxes(scene.powerBoxes);
        Objects.boxes(scene.scoreBoxes);
        Objects.boxes(scene.bombBoxes);
    },
    textPopup: ({ scene, x, y, changeText, resultText, color }) => {
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
    setPower: (power) => (Bases.getById("power").textContent = power),
    setScore: (score) => (Bases.getById("score").textContent = score),
    event: ({ scene, keys, callback, once = true }) => {
        // allow both array or string with "|"
        const events = Array.isArray(keys) ? keys : keys.split("|");

        events.forEach((key) => {
            const isKeyboard = key.startsWith("keydown-") || key.startsWith("keyup-");
            const { input } = scene;
            const { keyboard } = scene.input;
            if (isKeyboard) {
                once ? keyboard.once(key, callback) : keyboard.on(key, callback);
            } else {
                once ? input.once(key, callback) : input.on(key, callback);
            }
        });
    },
    hide: ({ id = "", element = null }) => {
        return element ? element.classList.add("hidden") : Bases.getById(id).classList.add("hidden");
    },
    show: ({ id = "", element = null }) => {
        return element ? element.classList.remove("hidden") : Bases.getById(id).classList.remove("hidden");
    },
    playSound: (scene, key) => {
        if (scene.sound.locked) {
            scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                scene.sound.play(key);
            });
        } else {
            scene.sound.play(key);
        }
    },
    playIfNotPlaying: (sound) => {
        if (sound && !sound.isPlaying) {
            sound.play();
        }
    },
    stopIfPlaying: (sound) => {
        if (sound && sound.isPlaying) {
            sound.stop();
        }
    },
};

export default Helpers;
