import {
  applyDevice,
  isMobile,
} from '../../main';
import {
  GAME_HEIGHT,
  GAME_MENU,
  GAME_START,
  GAME_WIDTH,
  LOAD_ASSETS,
  PRESS_START,
  TAP_START,
  toggleUI,
} from '../consts';
import { setText } from '../utils';

class MainMenu extends Phaser.Scene {
    constructor() {
        super(GAME_MENU);
    }

    create() {
        toggleUI(false);
        applyDevice();
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, LOAD_ASSETS.KEY.LOGO);

        this.label = setText({
            scene: this,
            y: 100,
            text: PRESS_START,
            strokeThickness: 16,
            font: "Lucida Console",
        });

        this.input.once("pointerdown", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });

        this.input.keyboard.once("keydown-SPACE", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });
    }

    update() {
        this.label.setText(isMobile() ? TAP_START : PRESS_START);
    }
}

export default MainMenu;
