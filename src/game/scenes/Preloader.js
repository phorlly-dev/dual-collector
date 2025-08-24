import {
  GAME_HEIGHT,
  GAME_MENU,
  GAME_PRELOAD,
  GAME_WIDTH,
  LOAD_ASSETS,
} from '../consts';
import {
  orange_color,
  secondary_color,
} from '../consts/colors';

class Preloader extends Phaser.Scene {
    constructor() {
        super(GAME_PRELOAD);
    }

    preload() {
        // background
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND);

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(GAME_WIDTH / 2 - 230, GAME_HEIGHT / 2 - 14, 460, 28, 8);

        // progress bar (filled rounded rect)
        const progressBar = this.add.graphics();

        // text
        const progressText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, "Loading: 0%", {
            fontSize: "20px",
            fill: secondary_color,
        }).setOrigin(0.5);

        this.fakeProgress = 0;
        this.speed = 1500;

        // listen for loader progress
        this.load.on("progress", (progress) => {
            // tweened smooth progress
            this.tweens.add({
                targets: this,
                fakeProgress: progress,
                duration: this.speed,
                ease: "Linear",
                onUpdate: () => {
                    progressBar.clear();
                    progressBar.fillStyle(orange_color, 1);
                    progressBar.fillRoundedRect(
                        GAME_WIDTH / 2 - 230,
                        GAME_HEIGHT / 2 - 14,
                        460 * this.fakeProgress,
                        28,
                        8
                    );
                    progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);
                }
            });
        });

        // load assets here
        this.load.image(LOAD_ASSETS.KEY.LOGO, LOAD_ASSETS.PATH.LOGO);
        this.load.image(LOAD_ASSETS.KEY.LEFT, LOAD_ASSETS.PATH.LEFT);
        this.load.image(LOAD_ASSETS.KEY.RIGHT, LOAD_ASSETS.PATH.RIGHT);
        this.load.image(LOAD_ASSETS.KEY.UP, LOAD_ASSETS.PATH.UP);
        this.load.image(LOAD_ASSETS.KEY.PLAY, LOAD_ASSETS.PATH.PLAY);
        this.load.image(LOAD_ASSETS.KEY.PAUSE, LOAD_ASSETS.PATH.PAUSE);

        this.load.audio(LOAD_ASSETS.KEY.HP, LOAD_ASSETS.PATH.HP);
        this.load.audio(LOAD_ASSETS.KEY.LD, LOAD_ASSETS.PATH.LD);
        this.load.audio(LOAD_ASSETS.KEY.HL, LOAD_ASSETS.PATH.HL);
        this.load.audio(LOAD_ASSETS.KEY.END, LOAD_ASSETS.PATH.END);
        this.load.audio(LOAD_ASSETS.KEY.CL, LOAD_ASSETS.PATH.CL);
        this.load.audio(LOAD_ASSETS.KEY.ON, LOAD_ASSETS.PATH.ON);
        this.load.audio(LOAD_ASSETS.KEY.WALK, LOAD_ASSETS.PATH.WALK);

        this.load.spritesheet(LOAD_ASSETS.KEY.PLAYER, LOAD_ASSETS.PATH.PLAYER, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.time.delayedCall(this.speed, () => {
            this.scene.start(GAME_MENU);
        });
    }

}

export default Preloader;
