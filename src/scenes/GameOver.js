// Include tweens for text or sprites
// Grandma and Grandson chasing animation loop
// Print message depending on score
// Allow to try again
class GameOver extends Phaser.Scene {
        constructor() {
            super('gameOverScene')
        }

        create() {

            this.KEYS = this.scene.get('sceneKeys').KEYS

            // this.physics.world.setBounds(0, 0, game.config.width, game.config.height)

            this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
            this.reachedText = this.add.bitmapText(game.config.width / 2, game.config.height / 9 , 'darkBlueBlocko',`You have reached`, 52).setOrigin(0.5)
            this.heartsTopLeft = this.add.image(game.config.width / 3.75, game.config.height / 9.75, 'heart').setOrigin(0.5).setScale(0.1)
            this.heartsTopRight = this.add.image(game.config.width / 1.375, game.config.height / 9.75, 'heart').setOrigin(0.5).setScale(0.1)
            this.grandchildType = this.add.bitmapText(game.config.width / 2, game.config.height / 2.5 , 'purplePixel',`UNGRATEFUL GRANDCHILD`, 42).setOrigin(0.5)

            this.finalScoreText = this.add.bitmapText(game.config.width / 2, game.config.height / 3.5 , 'blocko', Math.round(playerScore), 128).setOrigin(0.5)


            this.tryAgainText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.125 , 'darkBlueBlocko',`T R Y  A G A I N`, 72).setOrigin(0.5)
            this.restartText = this.add.bitmapText(game.config.width / 2.325, game.config.height / 1.0575 , 'purplePixel',`RESTART WITH`, 24).setOrigin(0.5)
            this.spaceButton = this.add.image(game.config.width / 1.575, game.config.height / 1.05875, 'button').setScale(0.1).setOrigin(0.5)
            this.spaceText = this.add.bitmapText(game.config.width / 1.575, game.config.height / 1.07725 , 'whitePixel',`SPACE`, 48).setOrigin(0.5)

            /* Haven't implemented restart */
            // this.restartText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.05 , 'blocko',  'Press [Shift] to restart', 36).setOrigin(0.5)
            if(!winner){
                this.sound.play('death1')

                if(playerScore >= 50000){
                    this.grandchildType.text = 'TROUBLED GRANDCHILD'
                    this.sound.play('death2')
                }

                this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.8)
                this.grandson.setFrame(4)
                this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.8)
                this.grandma.play('chasing-left')
                this.grandma.body.setSize(0.0005)
                this.hearts1 = this.add.sprite(game.config.width / 1.3,  height / 2 - 15, 'heart').setScale(0.1)
                this.hearts2 = this.add.sprite(game.config.width / 1.45,  height / 2 - 30, 'heart').setScale(0.1)
                this.hearts3 = this.add.sprite(game.config.width / 1.65,  height / 2 - 15, 'heart').setScale(0.1)
                this.hearts1.play('hearts')
                this.hearts2.play({key: 'hearts', startFrame: 1})
                this.hearts3.play({key: 'hearts', startFrame: 2})
                this.heartsBottomLeft = this.add.image(game.config.width / 4.375, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
                this.heartsBottomRight = this.add.image(game.config.width / 1.3, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
    
            }
            else{
                this.sound.play('winner')
                this.grandchildType.text = 'DEVIOUS GRANDCHILD'
                this.tryAgainText.text = 'P L A Y  A G A I N?'
                this.heartsBottomLeft = this.add.image(game.config.width / 5.575, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
                this.heartsBottomRight = this.add.image(game.config.width / 1.225, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
    
            }
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
                            this.hearts1.play('skulls')
                            this.hearts2.play({key: 'skulls', startFrame: 1})
                            this.hearts3.play({key: 'skulls', startFrame: 2})
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
                            this.hearts1.play('hearts')
                            this.hearts2.play({key: 'hearts', startFrame: 1})
                            this.hearts3.play({key: 'hearts', startFrame: 2})
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
                            this.hearts1.play('skulls')
                            this.hearts2.play({key: 'skulls', startFrame: 1})
                            this.hearts3.play({key: 'skulls', startFrame: 2})
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

                            this.time.addEvent({ delay: (450 * factor), callback: () => {
                                this.hearts1.play('hearts')
                                this.hearts2.play({key: 'hearts', startFrame: 1})
                                this.hearts3.play({key: 'hearts', startFrame: 2})
                            }, callbackScope: this})
                        }
                    },

                ]
                })

            playerScore = 0

            this.add.image(width / 2 + 0.5, height / 2, 'gameframe').setScale(0.8)

            this.tweenFlash = this.tweens.chain({
                loop: -1,
                tweens: [
                    // {
                    //     targets: [this.finalScoreText, this.restartText],
                    //     duration: 300,
                    //     alpha: 0,
                    //     ease: 'Stepped'
                    // },
                    {
                        targets: [this.finalScoreText, this.restartText, this.spaceButton, this.spaceText],
                        duration: 900,
                        alpha: 1,
                        ease: 'Stepped'
                    },
                    {
                        targets:  [this.finalScoreText, this.restartText, this.spaceButton, this.spaceText],
                        duration: 500,
                        alpha: 0,
                        ease: 'Stepped'
                    }
                    // {
                    //     targets:  [this.finalScoreText, this.restartText],
                    //     duration: 300,
                    //     alpha: 0,
                    //     ease: 'Stepped',
                    // }
                ]
            })

        }
    
        update() {

            const { KEYS } = this
            if(!winner){
                this.grandma.x -= 4
                this.hearts1.x -= 4
                this.hearts2.x -= 4
                this.hearts3.x -= 4

                if(this.grandma.x <= 0){
                    this.grandma.destroy()
                }
            }
            if(KEYS.SPACE.isDown) {
                this.scene.start('playScene') 
            }
        }
    }