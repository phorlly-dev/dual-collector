import Instances from "./game/consts";
import StartGame from "./game/scenes/Start";
import Bases from "./game/utils";
import Helpers from "./game/utils/helper";

const applyDevice = () => {
    if (Bases.isMobile()) {
        Helpers.hide({ id: Instances.control.desktop });
        Helpers.show({ id: Instances.control.mobile });
    } else {
        Helpers.show({ id: Instances.control.desktop });
        Helpers.hide({ id: Instances.control.mobile });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});
