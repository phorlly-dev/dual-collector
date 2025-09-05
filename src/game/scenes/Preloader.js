import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";

class Preloader extends Phaser.Scene {
    constructor() {
        super(Instances.game.preload);
    }

    preload() {
        // background
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).setAlpha(0.6);

        // sizes
        const barWidth = 460;
        const barHeight = 28;
        const radius = 12;
        const barX = Instances.game.width / 2 - barWidth / 2;
        const barY = Instances.game.height / 2;

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(barX, barY, barWidth, barHeight, radius);

        // progress bar (filled rounded rect)
        const progressBar = this.add.graphics();

        // text
        const progressText = Bases.text({
            scene: this,
            y: 50,
            text: "Loading: 0%",
            style: {
                fontSize: "20px",
                fill: Colors.secondary,
            },
        });

        this.fakeProgress = 0;
        this.speed = 800;

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
                    progressBar.fillStyle(Colors.orange, 1);
                    progressBar.fillRoundedRect(barX, barY, barWidth * this.fakeProgress, barHeight, radius);
                    progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);
                },
            });
        });

        // load assets here
        this.load.setPath("assets");
        this.load.image(Instances.image.key.logo, Instances.image.value.logo);
        this.load.image(Instances.image.key.bomb, Instances.image.value.bomb);
        this.load.spritesheet(Instances.image.key.player, Instances.image.value.player, {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.audio(Instances.audio.key.power, Instances.audio.value.power);
        this.load.audio(Instances.audio.key.effect, Instances.audio.value.effect);
        this.load.audio(Instances.audio.key.cut, Instances.audio.value.cut);
        this.load.audio(Instances.audio.key.end, Instances.audio.value.end);
        this.load.audio(Instances.audio.key.click, Instances.audio.value.click);
        this.load.audio(Instances.audio.key.start, Instances.audio.value.start);
        this.load.audio(Instances.audio.key.walk, Instances.audio.value.walk);
        this.load.audio(Instances.audio.key.bomb, Instances.audio.value.bomb);
        this.load.audio(Instances.audio.key.playing, Instances.audio.value.playing);
    }

    create() {
        // When complete → ensure progress bar finishes
        this.load.once("complete", () => {
            this.time.delayedCall(this.speed, () => {
                this.scene.start(Instances.game.menu);
            });
        });

        this.load.start();
    }
}

export default Preloader;
