import { audio, height, image, menu, pres_start, start, tap_start, width } from "../consts";
import { primary, secondary } from "../consts/colors";
import { isMobile, text } from "../utils";
import { event, playSound } from "../utils/helper";

class Menu extends Phaser.Scene {
    constructor() {
        super(menu);
    }

    create() {
        const { key } = image;

        // background
        const bg = this.add.image(width / 2, height / 2, key.bg).setAlpha(0.8);

        // logo
        const logo = this.add.image(width / 2, height / 2 - 100, key.logo);

        // label
        this.label = text({
            scene: this,
            y: 100,
            text: "",
            style: {
                color: secondary.css,
                stroke: primary.css,
                strokeThickness: 4,
                fontSize: "24px", // ✅ fixed typo
                fontFamily: "Lucida Console",
            },
        });

        // unlock audio + start game on first input
        event({
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
                playSound(this, audio.key.start);
            },
        });
    }

    update() {
        this.label.setText(isMobile() ? tap_start : pres_start);
    }
}

export default Menu;
