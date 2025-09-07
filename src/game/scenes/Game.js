import Instances from "../consts";
import spawnBoxes from "../utils/box-factory";
import Controllers from "../utils/controller";
import Effects from "../utils/effect";
import Helpers from "../utils/helper";
import Bases from "../utils";
import Objects from "../utils/object";
import States from "../utils/state";

const { start, over, width, height } = Instances.game;
const { card, ui } = Instances.control;
const { key: audioKey } = Instances.audio;
class Game extends Phaser.Scene {
    constructor() {
        super(start);

        // Declare scene-level variables
        this.player = null;
        this.powerBoxes = null;
        this.scoreBoxes = null;
        this.bombBoxes = null;
        this.cursors = null;
        this.as = null;
        this.spawnTimer = null;
        this.walk = null;
        this.pauseText = null;
        this.pauseInstructions = null;

        this.power = 100;
        this.score = 0;
        this.isPaused = false;
        this.isLeft = false;
        this.isRight = false;
        this.isJump = false;

        // Declare button refs
        this.leftBtn = null;
        this.rightBtn = null;
        this.jumpBtn = null;
        this.playBtn = null;
        this.pauseBtn = null;
        this.onBtn = null;
        this.offBtn = null;
    }

    create() {
        // --- UI & background ---
        Helpers.show({ id: ui });
        this.add.image(width / 2, height / 2, Instances.image.key.bg).setAlpha(0.2);

        // --- Rebind DOM buttons ---
        Controllers.buttons(this);

        // --- Reset game state ---
        this.restartGame();

        // --- Player, animations, UI ---
        this.player = Objects.player(this);
        Objects.animations(this);
        States.ui(this);

        // --- Physics groups ---
        this.powerBoxes = this.physics.add.group();
        this.scoreBoxes = this.physics.add.group();
        this.bombBoxes = this.physics.add.group();

        // --- Controls ---
        this.cursors = this.input.keyboard.createCursorKeys();
        this.as = this.input.keyboard.addKeys("A,S");

        Controllers.toggleControls(States.isTouchOrTablet(this));

        // --- Spawn boxes timer ---
        this.spawnTimer = this.time.addEvent({
            delay: 2500,
            callback: () => spawnBoxes(this),
            loop: true,
        });

        // --- Overlap handlers ---
        this.registerOverlap(this.player, this.powerBoxes, this.collectPowerBox);
        this.registerOverlap(this.player, this.scoreBoxes, this.collectScoreBox);
        this.registerOverlap(this.player, this.bombBoxes, this.hitBomb);

        // --- Sounds ---
        this.walk = this.sound.add(audioKey.walk, { loop: true, volume: 0.8 });
        this.sound.play(audioKey.playing, { loop: true, volume: 0.5 });
        Controllers.toggleMute(this.game.scene.keys[start]);
    }

    update() {
        if (this.isPaused) return;

        // --- Player movement ---
        Controllers.actions(this);

        // --- Update box text positions + cleanup ---
        Helpers.textBoxes(this);

        // --- Game over check ---
        if (this.power <= 0 && !this.isPaused) {
            this.isPaused = true; // prevent multiple triggers
            this.time.delayedCall(800, () => {
                this.scene.start(over, {
                    score: this.score,
                    ui: ui,
                    control: card,
                });
                Helpers.playSound(this, audioKey.end);
            });
        }
    }

    // --- Overlap helper ---
    registerOverlap(player, group, callback) {
        this.physics.add.overlap(player, group, callback, null, this);
    }

    // --- Collectors ---
    collectPowerBox(_player, powerBox) {
        if (powerBox.operation === "x") {
            this.power += Bases.exponentFromValue(powerBox.value) * 10;
        } else if (powerBox.operation === "/") {
            this.power = Math.floor(this.power / powerBox.value);
        }

        Effects.power({
            scene: this,
            x: powerBox.x,
            y: powerBox.y,
            operation: powerBox.operation,
            value: powerBox.value,
            oldPower: this.power,
        });

        Helpers.setPower(this.power);
        Helpers.playSound(this, States.getSoundKey(powerBox.operation));

        if (powerBox.textObj) powerBox.textObj.destroy();
        powerBox.destroy();
    }

    collectScoreBox(_player, scoreBox) {
        if (scoreBox.operation === "+") {
            this.score += scoreBox.value;
        } else if (scoreBox.operation === "-") {
            this.score = Math.max(0, this.score - scoreBox.value);
        }

        Effects.score({
            scene: this,
            x: scoreBox.x,
            y: scoreBox.y,
            operation: scoreBox.operation,
            value: scoreBox.value,
            oldScore: this.score,
        });

        Helpers.setScore(this.score);
        Helpers.playSound(this, States.getSoundKey(scoreBox.operation));

        if (scoreBox.textObj) scoreBox.textObj.destroy();
        scoreBox.destroy();
    }

    hitBomb(player, _bomb) {
        Effects.bomb(this, player);

        this.power = Math.max(0, this.power - 50);
        Helpers.setPower(this.power);
    }

    // --- Restart/reset state ---
    restartGame() {
        this.power = 100;
        this.score = 0;
        this.isPaused = false;

        Helpers.setPower(this.power);
        Helpers.setScore(this.score);

        // Reset UI buttons if they exist
        if (this.pauseBtn) Helpers.show({ element: this.pauseBtn });
        if (this.playBtn) Helpers.hide({ element: this.playBtn });
        if (this.onBtn) Helpers.show({ element: this.onBtn });
        if (this.offBtn) Helpers.hide({ element: this.offBtn });
    }
}

export default Game;
