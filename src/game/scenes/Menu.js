import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";
import Controls from "../utils/control";
import Helpers from "../utils/helper";

class Menu extends Phaser.Scene {
    constructor() {
        super(Instances.game.menu);
    }

    init() {
        Helpers.hide({ id: Instances.control.ui });
        Controls.toggleMute(this.game.scene.keys[Instances.game.start]);
    }

    create() {
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).alpha = 0.8;
        this.add.image(Instances.game.width / 2, Instances.game.height / 2 - 100, Instances.image.key.logo);

        this.label = Bases.text({
            scene: this,
            y: 100,
            text: "",
            style: { color: Colors.secondary, strokeThickness: 4, fontFamily: "Lucida Console" },
        });

        Helpers.event({
            scene: this,
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                this.scene.start(Instances.game.start);
                Helpers.playSound(this, Instances.audio.key.start);
            },
        });
    }

    update() {
        this.label.setText(Bases.isMobile() ? Instances.game.tapStart : Instances.game.pressStart);
    }
}

export default Menu;
