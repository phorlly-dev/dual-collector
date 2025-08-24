import {
  exponentFromValue,
  GAME_HEIGHT,
  GAME_OVER,
  GAME_START,
  GAME_WIDTH,
  LOAD_ASSETS,
  setPower,
  setScore,
  toggleUI,
} from '../consts';
import {
  primary_color,
  success_color,
  white_color,
} from '../consts/colors';
import {
  boxTextPositions,
  setText,
} from '../utils';
import spawnBoxes from '../utils/box-factory';
import {
  createControls,
  updateActions,
} from '../utils/controls';
import {
  createPowerEffect,
  createScoreEffect,
} from '../utils/effects';
import createPlayerAnimations from '../utils/player-anims';

class Game extends Phaser.Scene {
    constructor() {
        super(GAME_START);
    }

    init() {
        this.player = null;
        this.power = 100;
        this.score = 0;
        this.isPaused = false;

        // Track state
        this.isLeft = false;
        this.isRight = false;
        this.isJump = false;

        //show UI power and score
        toggleUI(true);
    }

    create() {
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND).alpha = 0.7;

        this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT, LOAD_ASSETS.KEY.PLAYER).setBounce(0.2).setScale(1.8);
        this.player.body.setCollideWorldBounds(true);

        createPlayerAnimations(this);

        this.powerBoxes = this.physics.add.group();
        this.scoreBoxes = this.physics.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.as = this.input.keyboard.addKeys("A,S");

        this.spawnTimer = this.time.addEvent({ delay: 2500, callback: () => spawnBoxes(this), loop: true });

        this.physics.add.overlap(this.player, this.powerBoxes, this.collectPowerBox, null, this);
        this.physics.add.overlap(this.player, this.scoreBoxes, this.collectScoreBox, null, this);

        this.pauseText = setText({ scene: this, y: -100, size: 48, text: "PAUSED", color: white_color, stroke: primary_color }).setVisible(false);
        this.pauseInstructions = setText({ scene: this, text: "Click button ▶ play to resume", color: primary_color, stroke: success_color }).setVisible(false);

        this.walkSound = this.sound.add(LOAD_ASSETS.KEY.WALK, {
            loop: true,   // important: looping enabled
            volume: 0.5,  // adjust as needed
        });

        const isMobile = this.sys.game.device.input.touch;
        createControls(this, isMobile);
    }

    update() {
        if (this.isPaused) return;

        // --- Player movement---
        updateActions(this);

        // --- Update box text positions + cleanup ---
        boxTextPositions(this);

        // --- Game over check ---
        if (this.power <= 0) {
            this.sound.play(LOAD_ASSETS.KEY.END);
            this.scene.start(GAME_OVER, {
                score: this.score,
                ui: false,
                controls: false,
            });

            this.restartGame();
        }
    }

    // ... keep update, collectPowerBox, collectScoreBox (but now they call imported effects)
    collectPowerBox(player, powerBox) {
        if (powerBox.operation === "x") {
            this.power += exponentFromValue(powerBox.value) * 10;
            this.sound.play(LOAD_ASSETS.KEY.HP);
        }
        else if (powerBox.operation === "/") {
            this.power = Math.floor(this.power / powerBox.value);
            this.sound.play(LOAD_ASSETS.KEY.HL);
        }

        createPowerEffect(this, powerBox.x, powerBox.y, powerBox.operation, powerBox.value, this.power);
        this.sound.play(LOAD_ASSETS.KEY.LD);
        setPower(this.power);

        if (powerBox.textObj) powerBox.textObj.destroy();
        powerBox.destroy();
    }

    collectScoreBox(player, scoreBox) {
        if (scoreBox.operation === "+") {
            this.score += scoreBox.value;
            this.sound.play(LOAD_ASSETS.KEY.HP);
        }
        else if (scoreBox.operation === "-") {
            this.score = Math.max(0, this.score - scoreBox.value);
            this.sound.play(LOAD_ASSETS.KEY.HL);
        }

        createScoreEffect(this, scoreBox.x, scoreBox.y, scoreBox.operation, scoreBox.value, this.score);
        this.sound.play(LOAD_ASSETS.KEY.LD);
        setScore(this.score);

        if (scoreBox.textObj) scoreBox.textObj.destroy();
        scoreBox.destroy();
    }

    restartGame() {
        this.power = 100;
        this.score = 0;
        this.isPaused = false;
        setPower(this.power);
        setScore(this.score);
    }
}

export default Game;
