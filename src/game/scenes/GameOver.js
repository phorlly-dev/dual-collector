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
            Helpers.hidden([data.ui, data.control]);
        }

        const bg = this.cameras.main.setBackgroundColor(Colors.success.css);

        const fontSize = Instances.game.width / 10;
        const title = Bases.text({
            scene: this,
            y: -120,
            text: "GAME OVER!",
            style: {
                fontFamily: "Arial Black",
                fontSize: fontSize,
                stroke: Colors.primary.css,
                color: Colors.error.css,
                strokeThickness: 10,
            },
        });
        const score = Bases.text({
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
                color: Colors.primary.css,
                stroke: Colors.secondary.css,
                strokeThickness: 8,
            },
        });

        Helpers.event({
            scene: this,
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                // destroy texts
                bg.destroy();
                title.destroy();
                score.destroy();
                this.label.destroy();

                // stop GameOver scene
                this.scene.stop();

                // stop and reset Game scene
                this.scene.stop(Instances.game.start);

                // start fresh with unpaused state
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
