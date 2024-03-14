// Victoria Ayala
// Escape from Grandma's House


// +5 Your game uses at least five of Phaser's major components, which may include: 
// physics systems, 
// cameras, 
// particle effects, 
// text objects, 
// the animation manager, 
// the tween manager, 
// timers, 
// tilemaps, 
// pipeline FX, etc.



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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene : [ Keys, Menu, Play, Street, Controls, GameOver, Credits ]
}

let game = new Phaser.Game(config)
let keyLEFT, keyRIGHT, keySPACE, cursors


let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

var playerScore = 0
var oldScore = 0
var factor = 1

const obstacleTypes = ['lip', 'heart']

let { height, width } = game.config