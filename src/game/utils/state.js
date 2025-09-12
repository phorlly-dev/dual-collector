import { text } from ".";
import { audio } from "../consts";
import { primary, success, white } from "../consts/colors";
import { hide, playSound, show } from "./helper";

const States = {
    ui(scene) {
        scene.pauseText = text({
            scene,
            y: -80,
            text: "PAUSED",
            style: {
                fontSize: 48,
                color: white.css,
                stroke: primary.css,
                strokeThickness: 8,
            },
            isVisible: false,
        });
        scene.pauseInstructions = text({
            scene,
            text: "Click button ▶ play to resume",
            style: {
                color: primary.css,
                stroke: success.css,
                fontSize: 24,
                strokeThickness: 8,
            },
            isVisible: false,
        });
    },
    getSoundKey(operation) {
        switch (operation) {
            case "x":
                return audio.key.power;
            case "/":
                return audio.key.cut;
            case "+":
                return audio.key.power;
            case "-":
                return audio.key.cut;
            default:
                return audio.key.effect;
        }
    },
    togglePause(scene) {
        scene.isPaused = !scene.isPaused;

        if (scene.isPaused) {
            scene.physics.pause();
            scene.spawnTimer.paused = true;
            scene.pauseText.setVisible(true);
            scene.pauseInstructions.setVisible(true);

            show({ element: scene.playBtn });
            hide({ element: scene.pauseBtn });
            playSound(scene, audio.key.click);
        } else {
            scene.physics.resume();
            scene.spawnTimer.paused = false;
            scene.pauseText.setVisible(false);
            scene.pauseInstructions.setVisible(false);

            hide({ element: scene.playBtn });
            show({ element: scene.pauseBtn });
            playSound(scene, audio.key.start);
        }
    },
    textPopup({ scene, x, y, changeText, resultText, color }) {
        const popup = scene.add
            .text(x, y - 30, changeText, {
                fontSize: "20px",
                fill: color,
                fontWeight: "bold",
                stroke: white.css,
                strokeThickness: 2,
            })
            .setOrigin(0.5);

        const result = scene.add
            .text(x, y - 10, resultText, {
                fontSize: "14px",
                fill: white.css,
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
    isTouchOrTablet(scene) {
        const ua = navigator.userAgent.toLowerCase();

        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

        const isTabletUA = /ipad|android(?!.*mobile)|tablet/.test(ua);

        const isSmallScreen = window.innerWidth <= 1280; // treat tablets as touch devices

        const android = scene.sys.game.device.os.android;
        const iOS = scene.sys.game.device.os.iOS;
        const iPad = scene.sys.game.device.os.iPad;
        const iPhone = scene.sys.game.device.os.iPhone;

        return hasTouch && (isTabletUA || isSmallScreen) && (android || iOS || iPad || iPhone);
    },
};

export const { ui: textPause, getSoundKey, togglePause, textPopup, isTouchOrTablet } = States;
