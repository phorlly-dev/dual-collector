import Instances from "../consts";
import Colors from "../consts/colors.js";
import spawnBoxes from "../utils/box-factory";
import Controls from "../utils/control.js";
import Effects from "../utils/effect.js";
import Helpers from "../utils/helper.js";
import Bases from "../utils";
import Objects from "../utils/object.js";
import States from "../utils/state.js";

class Game extends Phaser.Scene {
    constructor() {
        super(Instances.game.start);
    }

    init() {
        this.power = 100;
        this.score = 0;
        this.isPaused = false;
    }

    create() {
        Helpers.show({ id: Instances.control.ui });
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).alpha = 0.3;
        this.sound.play(Instances.audio.key.playing, { loop: true, volume: 0.5 });

        this.player = Objects.player(this);
        Objects.animations(this);

        this.powerBoxes = this.physics.add.group();
        this.scoreBoxes = this.physics.add.group();
        this.bombBoxes = this.physics.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.as = this.input.keyboard.addKeys("A,S");

        this.spawnTimer = this.time.addEvent({
            delay: 2500,
            callback: () => spawnBoxes(this),
            loop: true,
        });

        // overlap detection
        this.physics.add.overlap(this.player, this.powerBoxes, this.collectPowerBox, null, this);
        this.physics.add.overlap(this.player, this.scoreBoxes, this.collectScoreBox, null, this);
        this.physics.add.overlap(this.player, this.bombBoxes, this.hitBomb, null, this);

        const isMobile = this.sys.game.device.input.touch;
        Controls.toggleControls(isMobile);
        States.ui(this);
        Controls.buttons(this);

        this.walk = this.sound.add(Instances.audio.key.walk, { loop: true, volume: 0.8 });
    }

    update() {
        if (this.isPaused) return;

        // --- Player movement---
        Controls.actions(this);

        // --- Update box text positions + cleanup ---
        Helpers.textBoxes(this);

        // --- Game over check ---
        if (this.power <= 0) {
            this.time.delayedCall(800, () => {
                Helpers.playSound(this, Instances.audio.key.end);
                this.scene.start(Instances.game.over, {
                    score: this.score,
                    ui: Instances.control.ui,
                    control: Instances.control.card,
                });

                this.restartGame();
            });
        }
    }

    // ... keep update, collectPowerBox, collectScoreBox (but now they call imported effects)
    collectPowerBox(player, powerBox) {
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

    collectScoreBox(player, scoreBox) {
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

    hitBomb(player, bomb) {
        // Power instantly goes to 0
        this.power = 0;
        Helpers.setPower(this.power);

        Effects.bomb(this, bomb);
        Helpers.playSound(this, Instances.audio.key.bomb);
    }

    restartGame() {
        this.power = 100;
        this.score = 0;
        this.isPaused = false;
        Helpers.setPower(this.power);
        Helpers.setScore(this.score);
    }
}

export default Game;
