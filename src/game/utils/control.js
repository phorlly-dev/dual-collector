import Bases from ".";
import Instances from "../consts";
import Helpers from "./helper";
import Objects from "./object";

const Controls = {
    buttons: (scene) => {
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

        Objects.bindToggleButtons({ scene, elements: [scene.pauseBtn, scene.playBtn], callback: Helpers.togglePause });
    },
    actions: (scene) => {
        // Left movement
        if (scene.cursors.left.isDown || scene.as.A.isDown || scene.isLeft) {
            scene.player.setVelocityX(-160);
            scene.player.anims.play("left", true);
            Helpers.playIfNotPlaying(scene.walk);
        }

        // Right movement
        else if (scene.cursors.right.isDown || scene.as.S.isDown || scene.isRight) {
            scene.player.setVelocityX(160);
            scene.player.anims.play("right", true);
            Helpers.playIfNotPlaying(scene.walk);
        }

        // Idle
        else {
            scene.player.setVelocityX(0);
            scene.player.anims.play("turn");
            Helpers.stopIfPlaying(scene.walk);
        }

        // Jump
        if (scene.cursors.space.isDown || scene.isJump) scene.player.setVelocityY(-330);
        else scene.player.setVelocityY(Instances.game.height); // gravity fallback
    },
    toggleMute: (scene) => {
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
    toggleControls: (isMobile) => {
        const controls = Bases.getById(Instances.control.card);
        if (isMobile) {
            Helpers.show({ element: controls });
        } else {
            Helpers.hide({ element: controls });
        }
    },
};

export default Controls;
