import { getById } from ".";
import { boxes } from "./object";

const Helpers = {
    textBoxes(scene) {
        boxes(scene.powerBoxes);
        boxes(scene.scoreBoxes);
        boxes(scene.bombBoxes);
    },
    setPower(power) {
        getById("power").textContent = power;
    },
    setScore(score) {
        getById("score").textContent = score;
    },
    event({ scene, keys, callback, once = true }) {
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
    hide({ id = "", element = null }) {
        element ? element.classList.add("hidden") : getById(id).classList.add("hidden");
    },
    show({ id = "", element = null }) {
        element ? element.classList.remove("hidden") : getById(id).classList.remove("hidden");
    },
    hidden(ids = []) {
        ids.forEach((id) => getById(id).classList.add("hidden"));
    },
    playSound(scene, key) {
        if (scene.sound.locked) {
            scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => scene.sound.play(key));
        } else {
            scene.sound.play(key);
        }
    },
    playIfNotPlaying(sound) {
        if (sound && !sound.isPlaying) {
            sound.play();
        }
    },
    stopIfPlaying(sound) {
        if (sound && sound.isPlaying) {
            sound.stop();
        }
    },
};

export const { textBoxes, setPower, setScore, event, hide, show, hidden, playSound, playIfNotPlaying, stopIfPlaying } =
    Helpers;
