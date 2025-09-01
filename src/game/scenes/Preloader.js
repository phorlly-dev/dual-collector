import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";

class Preloader extends Phaser.Scene {
    constructor() {
        super(Instances.game.preload);
    }

    preload() {
        // background
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).alpha = 0.8;

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(Instances.game.width / 2 - 230, Instances.game.height / 2 - 14, 460, 28, 8);

        // Progress bar setup
        const progressBar = this.add.graphics();
        const progressText = this.add
            .text(Instances.game.width / 2, Instances.game.height / 2 + 40, "Loading: 0%", {
                fontSize: "20px",
                fill: "#fff",
            })
            .setOrigin(0.5);

        let realProgress = 0; // Phaser loader progress (0 → 1)
        let displayProgress = 0; // Smoothed value for animation

        // Listen for real loading progress
        this.load.on("progress", (value) => {
            realProgress = value;
        });

        // Smooth update each frame
        this.events.on("update", () => {
            // Approach real progress gradually
            displayProgress += (realProgress - displayProgress) * 0.05;

            // Draw bar
            progressBar.clear();
            progressBar.fillStyle(Colors.orange, 1);
            progressBar.fillRoundedRect(
                Instances.game.width / 2 - 230,
                Instances.game.height / 2 - 14,
                460 * displayProgress,
                28,
                8
            );

            progressText.setText("Loading: " + Math.floor(displayProgress * 100) + "%");
        });

        // // progress bar (filled rounded rect)
        // const progressBar = this.add.graphics();

        // // text
        // const progressText = Bases.text({
        //     scene: this,
        //     y: 50,
        //     text: "Loading: 0%",
        //     style: {
        //         fontSize: "20px",
        //         fill: Colors.secondary,
        //     },
        // });

        // this.fakeProgress = 0;
        // this.speed = 1500;

        // // listen for loader progress
        // this.load.on("progress", (value) => {
        //     // tweened smooth progress
        //     this.tweens.add({
        //         targets: this,
        //         // fakeProgress: progress,
        //         duration: this.speed,
        //         ease: "Linear",
        //         onUpdate: () => {
        //             progressBar.clear();
        //             progressBar.fillStyle(Colors.orange, 1);
        //             progressBar.fillRoundedRect(
        //                 Instances.game.width / 2 - 230,
        //                 Instances.game.height / 2 - 14,
        //                 460 * value,
        //                 28,
        //                 8
        //             );
        //             progressText.setText(`Loading: ${Math.floor(value * 100)}%`);
        //         },
        //     });
        // });

        // load assets here
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
            this.time.delayedCall(500, () => {
                this.scene.start(Instances.game.menu);
            });
        });

        this.load.start();
    }
}

export default Preloader;
