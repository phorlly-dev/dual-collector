const Instances = {
    game: {
        width: 800,
        height: 600,
        menu: "game-menu",
        over: "game-over",
        boot: "game-boot",
        start: "game-start",
        preload: "game-preload",

        tapStart: "Click on screen to start",
        tapRestart: "Click on screen to restart",
        pressStart: "Click on screen or Press SPACE to start",
        pressRestart: "Click on screen or Press SPACE to restart",
    },
    control: {
        left: "left-btn",
        right: "right-btn",
        up: "up-btn",
        play: "play-btn",
        pause: "pause-btn",
        desktop: "desktop-btn",
        mobile: "mobile-btn",
        on: "on-btn",
        off: "off-btn",
        card: "controls-card",
        ui: "ui",
    },
    image: {
        key: {
            bg: "background",
            logo: "logo",
            player: "player",
            bomb: "bomb",
        },
        value: {
            bg: "assets/images/bg.png",
            logo: "assets/images/logo.png",
            player: "assets/images/player.png",
            bomb: "assets/images/bomb.png",
        },
    },
    audio: {
        key: {
            power: "power",
            effect: "effect",
            cut: "cut",
            end: "end",
            click: "click",
            start: "start",
            walk: "walk",
            bomb: "bomb",
        },
        value: {
            power: "assets/audios/hp.mp3",
            effect: "assets/audios/ld.mp3",
            cut: "assets/audios/hl.wav",
            end: "assets/audios/end.wav",
            click: "assets/audios/cl.ogg",
            start: "assets/audios/on.ogg",
            walk: "assets/audios/walk.ogg",
            bomb: "assets/audios/bx.wav",
        },
    },
};

export default Instances;
