import { desktop, mobile } from "./game/consts";
import StartGame from "./game/init";
import { isMobile } from "./game/utils";
import { hide, show } from "./game/utils/helper";

const applyDevice = () => {
    if (isMobile()) {
        hide({ id: desktop });
        show({ id: mobile });
    } else {
        show({ id: desktop });
        hide({ id: mobile });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});
