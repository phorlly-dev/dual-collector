import Bases from ".";
import Objects from "./object";

const Helpers = {
    textBoxes(scene) {
        Objects.boxes(scene.powerBoxes);
        Objects.boxes(scene.scoreBoxes);
        Objects.boxes(scene.bombBoxes);
    },
    setPower(power) {
        return (Bases.getById("power").textContent = power);
    },
    setScore(score) {
        return (Bases.getById("score").textContent = score);
    },
    event({ scene, keys, callback, once = true }) {
        // allow both array or string with "|"
        const events = Array.isArray(keys) ? keys : keys.split("|");

        return events.forEach((key) => {
            const isKeyboard = key.startsWith("keydown-") || key.startsWith("keyup-");
            const { input } = scene;
            const { keyboard } = scene.input;
            if (isKeyboard) {
                return once ? keyboard.once(key, callback) : keyboard.on(key, callback);
            } else {
                return once ? input.once(key, callback) : input.on(key, callback);
            }
        });
    },
    hide({ id = "", element = null }) {
        return element ? element.classList.add("hidden") : Bases.getById(id).classList.add("hidden");
    },
    show({ id = "", element = null }) {
        return element ? element.classList.remove("hidden") : Bases.getById(id).classList.remove("hidden");
    },
    playSound(scene, key) {
        if (scene.sound.locked) {
            scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => scene.sound.play(key));
        } else {
            return scene.sound.play(key);
        }
    },
    playIfNotPlaying(sound) {
        if (sound && !sound.isPlaying) {
            return sound.play();
        }
    },
    stopIfPlaying(sound) {
        if (sound && sound.isPlaying) {
            return sound.stop();
        }
    },
};

export default Helpers;
