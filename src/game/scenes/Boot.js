import Instances from "../consts";

const { boot, preload } = Instances.game;
const { key, value } = Instances.image;

class Boot extends Phaser.Scene {
    constructor() {
        super(boot);
    }

    preload() {
        this.load.setPath("assets");
        this.load.image(key.bg, value.bg);
    }

    create() {
        this.scene.start(preload);
    }
}

export default Boot;
