const Instances = {
    game: {
        width: 800,
        height: 600,
        menu: "game-menu",
        over: "game-over",
        boot: "game-boot",
        start: "game-start",
        preload: "game-preload",

        tapStart: "Tap the screen to begin.",
        tapRestart: "Tap the screen to restart.",
        pressStart: "Press SPACE or click on the screen to begin.",
        pressRestart: "Press SPACE or click on the screen to restart.",
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
            bg: "images/bg.png",
            logo: "images/logo.png",
            player: "images/player.png",
            bomb: "images/bomb.png",
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
            playing: "playing",
        },
        value: {
            power: "audios/hp.mp3",
            effect: "audios/ld.mp3",
            cut: "audios/hl.wav",
            end: "audios/end.wav",
            click: "audios/cl.ogg",
            start: "audios/on.ogg",
            walk: "audios/walk.ogg",
            bomb: "audios/bx.wav",
            playing: "audios/playing.mp3",
        },
    },
};

export default Instances;
