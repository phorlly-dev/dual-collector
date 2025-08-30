import Bases from ".";
import Colors from "../consts/colors";
import States from "./state";

const Effects = {
    power: ({ scene, x, y, operation, value, oldPower }) => {
        Bases.particle({ scene, x, y, options: { tint: 0x9b59b6 } });

        const changeText = operation === "x" ? `Power x${value}!` : `Power ÷${value}`;
        const resultText = `${oldPower} → ${scene.power}`;

        States.textPopup({ scene, x, y, changeText, resultText, color: Colors.warning });
        Bases.flashScreen({ scene: scene, color: 0x9b59b6, alpha: 0.3 });
    },
    score: ({ scene, x, y, operation, value, oldScore }) => {
        Bases.particle({ scene, x, y });

        const changeText = operation === "+" ? `Score +${value}!` : `Score -${value}`;
        const resultText = `${oldScore} → ${scene.score}`;

        States.textPopup({ scene, x, y, changeText, resultText, color: Colors.success });
        Bases.flashScreen({ scene: scene, color: 0xe67e22, alpha: 0.2 });
    },
    bomb: (scene, bomb) => {
        Bases.particle({
            scene,
            x: bomb.x,
            y: bomb.y,
            options: {
                speed: { min: 100, max: 200 },
                scale: { start: 0.5, end: 0 },
                quantity: 20,
                tint: 0xff0000,
            },
        });

        // Flash screen red
        Bases.flashScreen({ scene: scene, color: 0xff0000, alpha: 0.4 });

        // Cleanup bomb
        if (bomb.textObj) bomb.textObj.destroy();
        bomb.destroy();
    },
};

export default Effects;
