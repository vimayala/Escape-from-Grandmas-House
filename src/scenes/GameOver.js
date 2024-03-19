// Include tweens for text or sprites
// Grandma and Grandson chasing animation loop
// Print message depending on score
// Allow to try again
class GameOver extends Phaser.Scene {
        constructor() {
            super('gameOverScene')
        }

        create() {    
            // Adding Base Images and Text to Game Over                    
            this.sound.get('scaryMusic').stop()
            this.sound.get('actionMusic').stop()

            gameOverFlag = false

            this.KEYS = this.scene.get('sceneKeys').KEYS

            this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
            this.reachedText = this.add.bitmapText(game.config.width / 2, game.config.height / 9 , 'darkBlueBlocko',`You have reached`, 52).setOrigin(0.5)
            this.heartsTopLeft = this.add.image(game.config.width / 3.75, game.config.height / 9.75, 'heart').setOrigin(0.5).setScale(0.1)
            this.heartsTopRight = this.add.image(game.config.width / 1.375, game.config.height / 9.75, 'heart').setOrigin(0.5).setScale(0.1)
            this.grandchildType = this.add.bitmapText(game.config.width / 2, game.config.height / 2.5 , 'purplePixel',`UNGRATEFUL GRANDCHILD`, 42).setOrigin(0.5)

            this.finalScoreText = this.add.bitmapText(game.config.width / 2, game.config.height / 3.5 , 'blocko', Math.round(playerScore), 128).setOrigin(0.5)

            this.tryAgainText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.125 , 'darkBlueBlocko',`T R Y  A G A I N`, 72).setOrigin(0.5)

            this.menuButton = this.add.image(game.config.width / 2.7, game.config.height / 1.0575, 'smallButton').setScale(0.1)
            this.menuLetter = this.add.bitmapText(game.config.width / 2.695, game.config.height / 1.07575 , 'whitePixel',`M`, 40).setOrigin(0.5)
            this.menuText = this.add.bitmapText(game.config.width / 2.25, game.config.height / 1.05 , 'pinkblocko',`Menu`, 36).setOrigin(0.5)
    
            this.spaceButton = this.add.image(game.config.width / 1.85, game.config.height / 1.0575, 'button').setScale(0.08)
            this.spaceText = this.add.bitmapText(game.config.width / 1.85, game.config.height / 1.07575 , 'whitePixel',`SPACE`, 40).setOrigin(0.5)
            this.restartText = this.add.bitmapText(game.config.width / 1.5875, game.config.height / 1.05 , 'pinkblocko',`Play`, 36).setOrigin(0.5)
 
            this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.8)

            // If the player lost, implement different end messages, sounds, and animations
            if(!winner){
                var gameOverSFX = this.sound.add('death1')
                gameOverSFX.once('complete', () => {
                    gameOverFlag = true
                })
                gameOverSFX.play()
                this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.8)
                this.grandson.setFrame(4)

                if(playerScore >= 50000){
                    this.grandchildType.text = 'TROUBLED GRANDCHILD'
                    var gameOverSFX = this.sound.add('death2')
                    gameOverSFX.once('completed', () => {
                        gameOverFlag = true
                    })
                    gameOverSFX.play()
                }
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
            // If they won, play the winner sound and animate differently
            else{
                var winnerSFX = this.sound.add('winner')
                winnerSFX.once('complete', () => {
                    gameOverFlag = true
                })
                winnerSFX.play()
                this.grandma.x = width / 1.75
                // this.grandson.x = width / 3

                this.dartGroup = this.physics.add.group({
                    runChildUpdate: true
                })
                this.physics.add.collider(this.grandma, this.dartGroup, this.dartGrandmaCollision, null, this, this.dartGroup)


                this.grandson = this.add.sprite(game.config.width / 3,  height / 1.6 + 40, 'grandson').setScale(0.8)
                this.grandson.play('holdGun-right').once('animationcomplete', () => {
                    this.grandson.play('shootGun-before-right').once('animationcomplete', () => {
                        this.grandson.play('shootGun-after-right')
                        let dart = new Dart(this, this.grandson.x + 48, this.grandson.y + 30 , 'dart', 0, 'right', 10)
                        this.dartGroup.add(dart)
                    })

                })
                this.grandchildType.text = 'DEVIOUS GRANDCHILD'
                this.tryAgainText.text = 'P L A Y  A G A I N?'
                this.heartsBottomLeft = this.add.image(game.config.width / 5.575, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
                this.heartsBottomRight = this.add.image(game.config.width / 1.225, game.config.height / 1.145, 'heart').setOrigin(0.5).setScale(0.14)
    
            }
            // Grandson tween to run away if player lost
            if(!winner){
                let grandsonTweenChain = this.tweens.chain({
                    targets: this.grandson,
                    loop: 0,
                    paused: false,
                    ease: 'Sine.easeInOut',                
                    tweens:[
                        {
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
                            duration: 75 * factor,
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
            }
            playerScore = 0

            // Add arcade-like game frame
            this.add.image(width / 2 + 0.5, height / 2, 'gameframe').setScale(0.8)

            // Tween to flash buttons on and off
            this.tweenFlash = this.tweens.chain({
                loop: -1,
                tweens: [
                    {
                        targets: [this.finalScoreText, this.restartText, this.spaceButton, this.spaceText, this.menuButton, this.menuLetter, this.menuText],
                        duration: 900,
                        alpha: 1,
                        ease: 'Stepped'
                    },
                    {
                        targets: [this.finalScoreText, this.restartText, this.spaceButton, this.spaceText, this.menuButton, this.menuLetter, this.menuText],
                        duration: 500,
                        alpha: 0,
                        ease: 'Stepped'
                    }
                ]
            })

        }
    
        update() {

            const { KEYS } = this

            // Animates images if they exist in the scene
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
            if(KEYS.M.isDown) {
                this.scene.start('menuScene')
            }
        }
    
        // Allows for dart collision in winner screen, simplified from Play.js
        dartGrandmaCollision(grandma, dart){
            this.sound.play('toy-gun1')
            this.grandma.play('shot-left').once('animationcomplete', () => {
                this.grandma.setFrame(0)
            })
            dart.destroy()
            
        }
    }