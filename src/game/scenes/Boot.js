import { GAME_BOOT, GAME_PRELOAD, LOAD_ASSETS } from "../consts";

class Boot extends Phaser.Scene {
    constructor() {
        super(GAME_BOOT);
    }

    preload() {
        this.load.image(LOAD_ASSETS.KEY.BACKGROUND, LOAD_ASSETS.VALUE.BACKGROUND);
    }

    create() {
        this.scene.start(GAME_PRELOAD);
    }
}

export default Boot;
