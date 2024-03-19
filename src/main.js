// Victoria Ayala
// Escape from Grandma's House

// Your game uses at least five of Phaser's major components, which may include: 
// physics systems (Play.js and Street.js are prime examples w/ Grandma + Kid collision and Grandma + Dart collision),
// particle effects (Play.js on Kid + Grandma collision), 
// text objects (Every scene), 
// the animation manager (Menu.js), 
// the tween manager (Nearly every scene to indicate buttons w flashing + GameOver grandson jumping animation made with tweens + playerScore increments with tween in Play.js and Street.js), 
// timers (not sure if this counts but various delay calls like in Street,js)

// Not sure of any specific polish, creativity, technical prowess, and/or originality, but I did make the assets work together as well as making extra art assets to
// give the game more polish
// I also used various mechanics to  make 2 types of levels instead of just a shooter and make it feel more minigame like and arcade like
// I also didn't use any pointer/mouse control to maintain the arcade feeling since the game would have used buttons and joysticks
// I think everything ties well together for the arcade genre (art, fonts, style, sounds, and music) and I got a handful of compliments for this during the playtest :')

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
    scene : [ Keys, Menu, PlayControls, StreetControls, Play, Street, Controls, GameOver, Credits ]
}

let game = new Phaser.Game(config)
let keyLEFT, keyRIGHT, keySPACE, cursors, music, actionMusic
let winner = false
let playing = false
gameOverFlag = true


let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

var playerScore = 0
var oldScore = 0
var factor = 1

const obstacleTypes = ['lip', 'heart']

let { height, width } = game.config