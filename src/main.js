import { toggleControls } from "./game/consts";
import StartGame from "./game/scenes/Start";

const applyDevice = () => toggleControls({ isVisible: !isMobile(), isMobile: isMobile() });

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});

const isMobile = () =>  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

export { applyDevice, isMobile };
