import * as Phaser from "phaser";

import Boot from "./Boot";
import Game from "./Game";
import GameOver from "./GameOver";
import Menu from "./Menu";
import Preloader from "./Preloader";
import Instances from "../consts";

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
            gravity: { y: 0 },
            debug: false,
        },
    },
    render: {
        pixelArt: false, // smooth scaling
        antialias: true, // prevent blurry text edges
    },
    scene: [Boot, Preloader, Menu, Game, GameOver],
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
