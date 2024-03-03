// Victoria Ayala
// Escape from Grandma's House

let config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,     // for tinting
    width: 1236/1.25,
    height: 873/1.25,
    zoom: 2,
    backgroundColor: '0x000000',
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene : [ Keys, Menu, Play, Controls, GameOver, Credits ]
}

let game = new Phaser.Game(config)
let keyLEFT, keyRIGHT, keySPACE, cursors


let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

var playerScore = 0

let { height, width } = game.config