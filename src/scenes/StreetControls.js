class StreetControls extends Phaser.Scene {
    constructor() {
        super('streetControlScene')
    }

    create() {
        // Play action music if not already playing
        if(!actionMusic.isPlaying){
            actionMusic.play({volume: 0.7, loop: true})
        }

        this.KEYS = this.scene.get('sceneKeys').KEYS
        
        this.PLAYER_VELOCITY = 100

        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
        this.ControlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 9 , 'blocko',`Controls`, 72).setOrigin(0.5)
        this.streetText = this.add.bitmapText(game.config.width / 2, game.config.height / 6.25 , 'blocko',`Street`, 32).setOrigin(0.5)

        this.kid = new Grandson(this, width / 2, height / 1.725, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.kid.play('jumping-right')

        this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)

        let config = {            
            fontFamily: 'Courier',
        }

        this.livingRoomEx = this.add.bitmapText(game.config.width / 2, game.config.height / 4.125 ,'purplePixel', `Get across the street\nAvoid grandma's kisses and love\nCollect stars to move forward and gain points`, 24, 1).setOrigin(0.5)

        // Show controls and buttons
        this.add.image(game.config.width / 2, game.config.height / 2.525, 'up').setScale(0.125)
        this.add.bitmapText(game.config.width / 2, game.config.height / 3.25 , 'whitePixel', `Move Up`, 38, 1).setOrigin(0.5)

        this.add.image(game.config.width / 2, game.config.height / 1.2875, 'down').setScale(0.125)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.2 , 'whitePixel', `Move Down`, 38, 1).setOrigin(0.5)

        this.playButton = this.add.image(game.config.width / 2.125, game.config.height / 1.0575, 'button').setScale(0.08)
        this.playLetter = this.add.bitmapText(game.config.width / 2.125, game.config.height / 1.07575 , 'whitePixel',`ENTER`, 40).setOrigin(0.5)
        this.playText = this.add.bitmapText(game.config.width / 1.75, game.config.height / 1.05 , 'pinkblocko',`Play`, 36).setOrigin(0.5)

        this.tweenFlash = this.tweens.chain({
            loop: -1,
            tweens: [
                {
                    targets: [this.playButton, this.playLetter, this.playText],
                    duration: 225,
                    alpha: 0,
                    ease: 'Stepped'
                },
                {
                    targets: [this.playButton, this.playLetter, this.playText],
                    duration: 225,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.playButton, this.playLetter, this.playText],
                    duration: 200,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.playButton, this.playLetter, this.playText],
                    duration: 200,
                    alpha: 0,
                    ease: 'Stepped',
                }
            ]
        })

    }

    update() {
        const { KEYS } = this

        // Allow for interactive control screen by listening for input and updating kid's y direction
        let playerVector = new Phaser.Math.Vector2(0, 0)
        if(KEYS.UP.isDown){    
            if(this.kid.y >= 225){
                playerVector.y = -1
            }
        }
        if(KEYS.DOWN.isDown){
            if(this.kid.y <= 590){
                playerVector.y = 1
            }
        }
        playerVector.normalize()
        this.kid.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        // Progress to street scene when ENTER clicked
        if(KEYS.ENTER.isDown) {
            this.scene.start('streetScene')
        }
    }

}