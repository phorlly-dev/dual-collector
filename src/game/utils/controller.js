import { fallback, getById, jump, moveLeft, moveRight, stop } from ".";
import { card, left, off, on, pause, play, right, up } from "../consts";
import { hide, show } from "./helper";
import { bindButtons, bindToggleButtons } from "./object";
import { togglePause } from "./state";

const Controllers = {
    buttons(scene) {
        // clear old listeners before binding new
        const elements = [
            getById(left),
            getById(right),
            getById(up),
            getById(play),
            getById(pause),
            getById(on),
            getById(off),
        ];

        elements.forEach((el) => {
            el.replaceWith(el.cloneNode(true)); // 🔑 remove old listeners
        });

        // Re-fetch after cloning
        scene.leftBtn = getById(left);
        scene.rightBtn = getById(right);
        scene.jumpBtn = getById(up);
        scene.playBtn = getById(play);
        scene.pauseBtn = getById(pause);
        scene.onBtn = getById(on);
        scene.offBtn = getById(off);

        // Rebind fresh listeners
        bindButtons({
            scene,
            elements: [scene.leftBtn, scene.rightBtn, scene.jumpBtn],
            keys: ["isLeft", "isRight", "isJump"],
        });

        bindToggleButtons({
            scene,
            elements: [scene.pauseBtn, scene.playBtn],
            callback: togglePause,
        });
    },
    actions(scene) {
        // Left movement
        if (scene.cursors.left.isDown || scene.as.A.isDown || scene.isLeft) moveLeft(scene);
        // Right movement
        else if (scene.cursors.right.isDown || scene.as.S.isDown || scene.isRight) moveRight(scene);
        // Idle
        else stop(scene);

        // Jump
        scene.cursors.space.isDown || scene.isJump ? jump(scene) : fallback(scene);
    },
    toggleMute(scene) {
        // Start with muted = false
        scene.sound.mute = false;

        scene.onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            hide({ element: scene.onBtn });
            show({ element: scene.offBtn });
        });

        scene.offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            show({ element: scene.onBtn });
            hide({ element: scene.offBtn });
        });
    },
    toggleControls(isMobile) {
        const controls = getById(card);
        if (isMobile) {
            show({ element: controls });
        } else {
            hide({ element: controls });
        }
    },
};

export const { buttons, actions, toggleMute, toggleControls } = Controllers;
