import Bases from ".";
import Instances from "../consts";
import Helpers from "./helper";
import Objects from "./object";
import States from "./state";

const { left, right, up, play, pause, on, off, card } = Instances.control;
const Controllers = {
    buttons(scene) {
        // clear old listeners before binding new
        const elements = [
            Bases.getById(left),
            Bases.getById(right),
            Bases.getById(up),
            Bases.getById(play),
            Bases.getById(pause),
            Bases.getById(on),
            Bases.getById(off),
        ];

        elements.forEach((el) => {
            el.replaceWith(el.cloneNode(true)); // 🔑 remove old listeners
        });

        // Re-fetch after cloning
        scene.leftBtn = Bases.getById(left);
        scene.rightBtn = Bases.getById(right);
        scene.jumpBtn = Bases.getById(up);
        scene.playBtn = Bases.getById(play);
        scene.pauseBtn = Bases.getById(pause);
        scene.onBtn = Bases.getById(on);
        scene.offBtn = Bases.getById(off);

        // Rebind fresh listeners
        Objects.bindButtons({
            scene,
            elements: [scene.leftBtn, scene.rightBtn, scene.jumpBtn],
            keys: ["isLeft", "isRight", "isJump"],
        });

        Objects.bindToggleButtons({
            scene,
            elements: [scene.pauseBtn, scene.playBtn],
            callback: States.togglePause,
        });
    },
    actions(scene) {
        // Left movement
        if (scene.cursors.left.isDown || scene.as.A.isDown || scene.isLeft) Bases.moveLeft(scene);
        // Right movement
        else if (scene.cursors.right.isDown || scene.as.S.isDown || scene.isRight) Bases.moveRight(scene);
        // Idle
        else Bases.stop(scene);

        // Jump
        scene.cursors.space.isDown || scene.isJump ? Bases.jump(scene) : Bases.fallback(scene);
    },
    toggleMute(scene) {
        // Start with muted = false
        scene.sound.mute = false;

        scene.onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            Helpers.hide({ element: scene.onBtn });
            Helpers.show({ element: scene.offBtn });
        });

        scene.offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            Helpers.show({ element: scene.onBtn });
            Helpers.hide({ element: scene.offBtn });
        });
    },
    toggleControls(isMobile) {
        const controls = Bases.getById(card);
        if (isMobile) {
            Helpers.show({ element: controls });
        } else {
            Helpers.hide({ element: controls });
        }
    },
};

export default Controllers;
