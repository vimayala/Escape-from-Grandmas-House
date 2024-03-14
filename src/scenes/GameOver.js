// Include tweens for text or sprites
// Grandma and Grandson chasing animation loop
// Print message depending on score
// Allow to try again
class GameOver extends Phaser.Scene {
        constructor() {
            super('gameOverScene')
        }

        create() {

            // this.physics.world.setBounds(0, 0, game.config.width, game.config.height)

            this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
            this.reachedText = this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'blocko',`You have reached`, 72).setOrigin(0.5)
            this.finalScoreText = this.add.bitmapText(game.config.width / 2, game.config.height / 2 , 'blocko', Math.round(playerScore), 128).setOrigin(0.5)

            // this.finalScore 
            this.tryAgainText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.125 , 'blocko',`T R Y  A G A I N`, 72).setOrigin(0.5)
            /* Haven't implemented restart */
            // this.restartText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.05 , 'blocko',  'Press [Shift] to restart', 36).setOrigin(0.5)
            this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.8)
            this.grandson.setFrame(4)
            this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.8)
            this.grandma.play('chasing-left')
            this.grandma.body.setSize(0.0005)
            this.hearts = this.add.sprite(game.config.width / 1.5,  height / 2, 'heart').setScale(0.1)
            this.hearts.play('hearts')
            this.add.image(width / 2 + 0.5, height / 2, 'gameframe').setScale(0.8)

            
            let grandsonTweenChain = this.tweens.chain({
                targets: this.grandson,
                loop: 0,
                paused: false,
                ease: 'Sine.easeInOut',                
                tweens:[
                    {
                        // onStart: () => {
                        //     funkypear.setAngle(0)
                        // },
                        x: this.grandson.x - 30,
                        y: this.grandson.y - 32,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 60,
                        y: this.grandson.y - 72,
                        duration: 75 * factor,
                        // ease: 'Bounce.easeOut',

                        onComplete: () => {
                            this.grandson.setFrame(6)
                        }
                    },
                    {
                        x: this.grandson.x - 90,
                        // y: this.grandson.y + 10,
                        duration: 75 * factor,
                        // ease: 'Bounce.easeOut',
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 120,
                        // y: this.grandson.y + 15,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 150,
                        y: this.grandson.y,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(1)
                        }
                    },

                    {
                        // onStart: () => {
                        //     funkypear.setAngle(0)
                        // },
                        x: this.grandson.x - 160,
                        y: this.grandson.y - 32,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 190,
                        y: this.grandson.y - 32,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 220,
                        y: this.grandson.y - 72,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(6)
                        }
                    },
                    {
                        x: this.grandson.x - 250,
                        // y: this.grandson.y + 10,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 280,
                        // y: this.grandson.y + 15,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 290,
                        y: this.grandson.y,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(1)
                        }
                    },

                    {
                        // onStart: () => {
                        //     funkypear.setAngle(0)
                        // },
                        x: this.grandson.x - 300,
                        y: this.grandson.y - 32,
                                                ease: 'Bounce.easeOut',

                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 330,
                        y: this.grandson.y - 32,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 360,
                        y: this.grandson.y - 72,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(6)
                        }
                    },
                    {
                        x: this.grandson.x - 390,
                        // y: this.grandson.y + 10,
                        duration: 75 * factor,
                        // ease: 'Bounce.easeOut',
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },
                    {
                        x: this.grandson.x - 420,
                        // y: this.grandson.y + 15,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 450,
                        y: this.grandson.y,
                        duration: 75 * factor,
                        ease: 'Bounce.easeOut',
                        onComplete: () => {
                            this.grandson.setFrame(1)
                        }
                    },
                    {
                        // onStart: () => {
                        //     funkypear.setAngle(0)
                        // },
                        x: this.grandson.x - 460,
                        y: this.grandson.y - 32,
                                                ease: 'Bounce.easeOut',

                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(4)
                        }
                    },
                    {
                        x: this.grandson.x - 490,
                        y: this.grandson.y - 32,
                        duration: 75 * factor,
                        onComplete: () => {
                            this.grandson.setFrame(5)
                        }
                    },

                ]
            })
        }
    
        update() {
            this.grandma.x -= 4

        }
    }