const GAME_WIDTH = 850;
const GAME_HEIGHT = 600;
const GAME_MENU = "game-menu";
const GAME_OVER = "game-over";
const GAME_BOOT = "game-boot";
const GAME_START = "game-start";
const GAME_PRELOAD = "game-preload";

const TAP_START = "Click to Start Game";
const TAP_RESTART = "Click to Restart Game";
const PRESS_START = "Click or Press SPACE to Start Game";
const PRESS_RESTART = "Click or Press SPACE to Restart Game";

const LOAD_ASSETS = {
    KEY: {
        BACKGROUND: "background",
        LOGO: "logo",
        PLAYER: "player",
        HP: "hp",
        LD: "ld",
        HL: "hl",
        END: "end",
        CL: "cl",
        ON: "on",
        WALK: "walk",
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        PLAY: "play",
        PAUSE: "pause",
    },
    PATH: {
        //images
        BACKGROUND: "assets/images/bg.png",
        LOGO: "assets/images/logo.png",
        PLAYER: "assets/images/player.png",
        LEFT: "assets/images/left.png",
        RIGHT: "assets/images/right.png",
        UP: "assets/images/up.png",
        PLAY: "assets/images/play.png",
        PAUSE: "assets/images/pause.png",

        ///audios
        HP: "assets/audios/hp.mp3",
        LD: "assets/audios/ld.mp3",
        HL: "assets/audios/hl.wav",
        END: "assets/audios/end.wav",
        CL: "assets/audios/cl.ogg",
        ON: "assets/audios/on.ogg",
        ON: "assets/audios/on.ogg",
        WALK: "assets/audios/walk.ogg",

    },
};

const toggleControls = ({ isVisible, isMobile = false }) => {
    getById("controls-desktop").style.display = isVisible ? "block" : "none";
    getById("controls-mobile").style.display = isMobile ? "block" : "none";
}

const toggleUI = (isVisible) => getById("ui").style.display = isVisible ? "block" : "none";

const setPower = (power) => getById("power").textContent = power;

const setScore = (score) => getById("score").textContent = score;

const powersOf2 = (val) => Math.pow(2, val);

const exponentFromValue = (val) => {
    const exp = Math.log2(val);

    return Number.isInteger(exp) ? exp : val;
}

const getById = (id) => document.getElementById(id);

export {
  exponentFromValue,
  GAME_BOOT,
  GAME_HEIGHT,
  GAME_MENU,
  GAME_OVER,
  GAME_PRELOAD,
  GAME_START,
  GAME_WIDTH,
  getById,
  LOAD_ASSETS,
  powersOf2,
  PRESS_RESTART,
  PRESS_START,
  setPower,
  setScore,
  TAP_RESTART,
  TAP_START,
  toggleControls,
  toggleUI,
};
