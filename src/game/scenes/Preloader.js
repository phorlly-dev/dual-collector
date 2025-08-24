import { GAME_HEIGHT, GAME_MENU, GAME_PRELOAD, GAME_WIDTH, LOAD_ASSETS } from "../consts";
import { orange_color, secondary_color } from "../consts/colors";

class Preloader extends Phaser.Scene {
    constructor() {
        super(GAME_PRELOAD);
    }

    preload() {
        // background
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND).alpha = 0.8;

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(GAME_WIDTH / 2 - 230, GAME_HEIGHT / 2 - 14, 460, 28, 8);

        // progress bar (filled rounded rect)
        const progressBar = this.add.graphics();

        // text
        const progressText = this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, "Loading: 0%", {
                fontSize: "20px",
                fill: secondary_color,
            })
            .setOrigin(0.5);

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
                },
            });
        });

        // load assets here
        this.load.image(LOAD_ASSETS.KEY.LOGO, LOAD_ASSETS.VALUE.LOGO);
        this.load.image(LOAD_ASSETS.KEY.LEFT, LOAD_ASSETS.VALUE.LEFT);
        this.load.image(LOAD_ASSETS.KEY.RIGHT, LOAD_ASSETS.VALUE.RIGHT);
        this.load.image(LOAD_ASSETS.KEY.UP, LOAD_ASSETS.VALUE.UP);
        this.load.image(LOAD_ASSETS.KEY.PLAY, LOAD_ASSETS.VALUE.PLAY);
        this.load.image(LOAD_ASSETS.KEY.PAUSE, LOAD_ASSETS.VALUE.PAUSE);
        this.load.image(LOAD_ASSETS.KEY.BOMB, LOAD_ASSETS.VALUE.BOMB);

        this.load.audio(LOAD_ASSETS.KEY.HP, LOAD_ASSETS.VALUE.HP);
        this.load.audio(LOAD_ASSETS.KEY.LD, LOAD_ASSETS.VALUE.LD);
        this.load.audio(LOAD_ASSETS.KEY.HL, LOAD_ASSETS.VALUE.HL);
        this.load.audio(LOAD_ASSETS.KEY.END, LOAD_ASSETS.VALUE.END);
        this.load.audio(LOAD_ASSETS.KEY.CL, LOAD_ASSETS.VALUE.CL);
        this.load.audio(LOAD_ASSETS.KEY.ON, LOAD_ASSETS.VALUE.ON);
        this.load.audio(LOAD_ASSETS.KEY.WALK, LOAD_ASSETS.VALUE.WALK);

        this.load.spritesheet(LOAD_ASSETS.KEY.PLAYER, LOAD_ASSETS.VALUE.PLAYER, {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.time.delayedCall(this.speed, () => {
            this.scene.start(GAME_MENU);
        });
    }
}

export default Preloader;
