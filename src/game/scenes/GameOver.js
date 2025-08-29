import Instances from "../consts";
import Colors from "../consts/colors";
import Bases from "../utils";
import Helpers from "../utils/helper";

class GameOver extends Phaser.Scene {
    constructor() {
        super(Instances.game.over);
    }

    create(data) {
        if (data.ui && data.control) {
            Helpers.hide({ id: data.control });
            Helpers.hide({ id: data.ui });
        }

        this.cameras.main.setBackgroundColor(Colors.secondary);

        const fontSize = Instances.game.width / 10;
        Bases.text({
            scene: this,
            y: -120,
            text: "GAME OVER!",
            style: {
                fontFamily: "Arial Black",
                fontSize: fontSize,
                stroke: Colors.primary,
                color: Colors.error,
            },
        });
        Bases.text({
            scene: this,
            y: -12,
            text: `Final Score: ${data.score}`,
            style: {
                fontFamily: "Arial",
                fontSize: fontSize / 2,
                strokeThickness: 10,
            },
        });
        this.label = Bases.text({
            scene: this,
            y: 100,
            text: "",
            style: {
                fontFamily: "Lucida Console",
                fontSize: fontSize / 3,
                color: Colors.primary,
                strokeThickness: 8,
            },
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
        this.label.setText(Bases.isMobile() ? Instances.game.tapRestart : Instances.game.pressRestart);
    }
}

export default GameOver;
