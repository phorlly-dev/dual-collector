import * as Phaser from "phaser";

import Boot from "./scenes/Boot";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import Menu from "./scenes/Menu";
import Preloader from "./scenes/Preloader";
import Instances from "./consts";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: Instances.game.width,
    height: Instances.game.height,
    backgroundColor: "#34495e",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    render: {
        antialias: false,
        pixelArt: true,
    },
    scene: [Boot, Preloader, Menu, Game, GameOver],
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
