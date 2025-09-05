import Bases from ".";
import Instances from "../consts";
import Helpers from "./helper";
import Objects from "./object";
import States from "./state";

const Controls = {
    buttons(scene) {
        //Element state
        scene.leftBtn = Bases.getById(Instances.control.left);
        scene.rightBtn = Bases.getById(Instances.control.right);
        scene.jumpBtn = Bases.getById(Instances.control.up);
        scene.playBtn = Bases.getById(Instances.control.play);
        scene.pauseBtn = Bases.getById(Instances.control.pause);

        // Events
        Objects.bindButtons({
            scene,
            elements: [scene.leftBtn, scene.rightBtn, scene.jumpBtn],
            keys: ["isLeft", "isRight", "isJump"],
        });

        Objects.bindToggleButtons({
            scene,
            elements: [scene.pauseBtn, scene.playBtn],
            callback: (scene) => States.togglePause(scene),
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
        // In your scene create/init
        const onBtn = Bases.getById(Instances.control.on);
        const offBtn = Bases.getById(Instances.control.off);

        // Start with muted = false
        scene.sound.mute = false;

        onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            Helpers.hide({ element: onBtn });
            Helpers.show({ element: offBtn });
        });

        offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            Helpers.show({ element: onBtn });
            Helpers.hide({ element: offBtn });
        });
    },
    toggleControls(isMobile) {
        const controls = Bases.getById(Instances.control.card);
        if (isMobile) {
            Helpers.show({ element: controls });
        } else {
            Helpers.hide({ element: controls });
        }
    },
};

export default Controls;
