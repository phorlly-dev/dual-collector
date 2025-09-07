import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";
import Helpers from "../utils/helper";

const { width, height, menu, tapStart, pressStart, start } = Instances.game;
class Menu extends Phaser.Scene {
    constructor() {
        super(menu);
    }

    create() {
        const { key } = Instances.image;

        // background
        const bg = this.add.image(width / 2, height / 2, key.bg).setAlpha(0.8);

        // logo
        const logo = this.add.image(width / 2, height / 2 - 100, key.logo);

        // label
        this.label = Bases.text({
            scene: this,
            y: 100,
            text: "",
            style: {
                color: Colors.secondary.css,
                stroke: Colors.primary.css,
                strokeThickness: 4,
                fontSize: "24px", // ✅ fixed typo
                fontFamily: "Lucida Console",
            },
        });

        // unlock audio + start game on first input
        Helpers.event({
            scene: this,
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                // ✅ unlock audio context (important for mobile)
                if (this.sound.context.state === "suspended") {
                    this.sound.context.resume();
                }

                bg.destroy();
                logo.destroy();
                this.label.destroy();

                // stop menu and start game
                this.scene.stop(menu);
                this.scene.start(start);

                // play start sound (now safe after tap)
                Helpers.playSound(this, Instances.audio.key.start);
            },
        });
    }

    update() {
        this.label.setText(Bases.isMobile() ? tapStart : pressStart);
    }
}

export default Menu;
