import {
  GAME_HEIGHT,
  GAME_WIDTH,
  LOAD_ASSETS,
} from '../consts';
import { togglePause } from './';

const createControls = (scene, isMobile) => {
    scene.leftBtn = scene.add.image(40, GAME_HEIGHT - 80, LOAD_ASSETS.KEY.LEFT)
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.8) // transparent feel
        .setScale(.1)
        .setVisible(isMobile);

    scene.rightBtn = scene.add.image(120, GAME_HEIGHT - 80, LOAD_ASSETS.KEY.RIGHT)
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.8)
        .setScale(.1)
        .setVisible(isMobile);

    scene.jumpBtn = scene.add.image(GAME_WIDTH - 100, GAME_HEIGHT - 80, LOAD_ASSETS.KEY.UP)
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.8)
        .setScale(.1)
        .setVisible(isMobile);

    scene.pauseBtn = scene.add.image(GAME_WIDTH - 40, GAME_HEIGHT - 80, LOAD_ASSETS.KEY.PAUSE)
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.8)
        .setScale(.1);

    scene.playBtn = scene.add.image(GAME_WIDTH - 40, GAME_HEIGHT - 80, LOAD_ASSETS.KEY.PLAY)
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.8)
        .setScale(.1)
        .setVisible(false); // start hidden

    // Events
    scene.leftBtn.on("pointerdown", () => scene.isLeft = true, scene);
    scene.leftBtn.on("pointerup", () => scene.isLeft = false, scene);
    scene.leftBtn.on("pointerout", () => scene.isLeft = false, scene);

    scene.rightBtn.on("pointerdown", () => scene.isRight = true, scene);
    scene.rightBtn.on("pointerup", () => scene.isRight = false, scene);
    scene.rightBtn.on("pointerout", () => scene.isRight = false, scene);

    scene.jumpBtn.on("pointerdown", () => scene.isJump = true, scene);
    scene.jumpBtn.on("pointerup", () => scene.isJump = false, scene);
    scene.jumpBtn.on("pointerout", () => scene.isJump = false, scene);

    scene.pauseBtn.on("pointerdown", () => togglePause(scene), scene);
    scene.playBtn.on("pointerdown", () => togglePause(scene), scene);
}

const updateActions = (scene) => {
    // Left movement
    if (scene.cursors.left.isDown || scene.as.A.isDown || scene.isLeft) {
        scene.player.setVelocityX(-160);
        scene.player.anims.play("left", true);
        if (!scene.walkSound.isPlaying) scene.walkSound.play();
    }

    // Right movement
    else if (scene.cursors.right.isDown || scene.as.S.isDown || scene.isRight) {
        scene.player.setVelocityX(160);
        scene.player.anims.play("right", true);
        if (!scene.walkSound.isPlaying) scene.walkSound.play();
    }

    // Idle
    else {
        scene.player.setVelocityX(0);
        scene.player.anims.play("turn");
        if (scene.walkSound.isPlaying) scene.walkSound.stop();
    }

    // Jump
    if (scene.cursors.space.isDown || scene.isJump) scene.player.setVelocityY(-330);
    else scene.player.setVelocityY(GAME_HEIGHT);// gravity fallback

}

export { createControls, updateActions };