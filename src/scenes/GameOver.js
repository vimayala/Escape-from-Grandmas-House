// Include tweens for text or sprites
// Grandma and Grandson chasing animation loop
// Print message depending on score
// Allow to try again
class GameOver extends Phaser.Scene {
        constructor() {
            super('gameOverScene')
        }

        create() {
            this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
            this.reachedText = this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'blocko',`You have reached`, 72).setOrigin(0.5)

            // this.finalScore 
            this.tryAgainText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.125 , 'blocko',`T R Y  A G A I N`, 72).setOrigin(0.5)
            this.restartText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.05 , 'blocko',  'Press [Shift] to restart', 36).setOrigin(0.5)
            this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.8)
            this.grandson.play('jumping-left')
            this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.8)
            this.grandma.play('chasing-left')
            this.hearts = this.add.sprite(game.config.width / 2,  height / 2, 'heart').setScale(0.1)
            this.hearts.play('hearts')
            this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)
        }
    
        update() {

        }
    }