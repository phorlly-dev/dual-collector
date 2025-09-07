import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";

const { width, height, preload } = Instances.game;
class Preloader extends Phaser.Scene {
    constructor() {
        super(preload);

        // Declare properties
        this.fakeProgress = 0;
        this.targetProgress = 0;
        this.speed = 600;

        this.progressBar = null;
        this.progressText = null;
    }

    init() {
        // Reset values if scene restarts
        this.fakeProgress = 0;
        this.targetProgress = 0;
    }

    preload() {
        const { key: imgKey, value: imgValue } = Instances.image;
        const { key: soundKey, value: soundValue } = Instances.audio;

        // --- Background ---
        this.add.image(width / 2, height / 2, imgKey.bg).setAlpha(0.6);

        // --- Sizes ---
        const barWidth = 460;
        const barHeight = 28;
        const radius = 12;
        const x = width / 2 - barWidth / 2;
        const y = height / 2 - barHeight / 2; // center correctly

        // --- Progress outline ---
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(x, y, barWidth, barHeight, radius);

        // --- Progress bar + text ---
        this.progressBar = this.add.graphics();
        this.progressText = Bases.text({
            scene: this,
            y: 50,
            text: "Loading: 0%",
            style: {
                fontSize: "20px",
                fill: Colors.secondary.css,
                stroke: Colors.primary.css,
                strokeThickness: 4,
            },
        });

        // --- Smooth update per frame ---
        this.events.on("update", () => {
            this.fakeProgress = Phaser.Math.Linear(this.fakeProgress, this.targetProgress, 0.2);

            this.progressBar.clear();
            this.progressBar.fillStyle(Colors.orange.hex, 1);
            this.progressBar.fillRoundedRect(x, y, barWidth * this.fakeProgress, barHeight, radius);

            this.progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);

            if (this.targetProgress === 1 && this.fakeProgress > 0.995) {
                this.scene.start(Instances.game.menu);
            }
        });

        // --- Loader events ---
        this.load.on("progress", (p) => {
            this.targetProgress = p;
        });
        this.load.once("complete", () => {
            this.targetProgress = 1;
        });

        // --- Assets ---
        this.load.setPath("assets");
        this.load.image(imgKey.logo, imgValue.logo);
        this.load.image(imgKey.bomb, imgValue.bomb);
        this.load.spritesheet(imgKey.player, imgValue.player, {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.audio(soundKey.power, soundValue.power);
        this.load.audio(soundKey.effect, soundValue.effect);
        this.load.audio(soundKey.cut, soundValue.cut);
        this.load.audio(soundKey.end, soundValue.end);
        this.load.audio(soundKey.click, soundValue.click);
        this.load.audio(soundKey.start, soundValue.start);
        this.load.audio(soundKey.walk, soundValue.walk);
        this.load.audio(soundKey.bomb, soundValue.bomb);
        this.load.audio(soundKey.playing, soundValue.playing);
    }

    shutdown() {
        this.load.removeAllListeners();
        this.events.removeListener("update");
    }
}

export default Preloader;
