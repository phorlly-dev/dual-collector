import Instances from "../consts";

class Boot extends Phaser.Scene {
    constructor() {
        super(Instances.game.boot);
    }

    preload() {
        this.load.setPath("assets");
        this.load.image(Instances.image.key.bg, Instances.image.value.bg);
    }

    create() {
        this.scene.start(Instances.game.preload);
    }
}

export default Boot;
