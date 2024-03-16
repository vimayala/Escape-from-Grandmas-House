class PlayControls extends Phaser.Scene {
    constructor() {
        super('playControlScene')
    }

    create() {
        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
        this.ControlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 9 , 'blocko',`Controls`, 72).setOrigin(0.5)
        this.livingRoomText = this.add.bitmapText(game.config.width / 2, game.config.height / 6.25 , 'blocko',`Living Room`, 32).setOrigin(0.5)
        this.shootCount = 0
        // this.finalScore 

        // this.load.image('livingRoom', './assets/EscapeLivingRoom.png')

        // this.add.image(width / 2, height / 2, 'livingroom').setScale(0.17)

        this.kid = new Grandson(this, width / 2, height / 1.75, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.kid.play('idle-left')

        // this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.4)
        // this.grandson.play('jumping-left')

        // this.grandma = new Grandma(this, width / 1.4, height / 2 + 20, "grandma", 0, 'left').setScale(0.8)
        // this.grandma.play('chasing-left')

        // this.hearts = this.add.sprite(game.config.width / 2,  height / 2, 'heart').setScale(0.1)
        // this.hearts.play('hearts')

        this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)

        let config = {            
            fontFamily: 'Courier',
        }


        // this.livingRoomInstr = this.add.text(game.config.width / 2, game.config.height / 1.2 ,`[LEFT] to jump left\n[RIGHT] to jump right\n[SHIFT] to shoot\n[SPACE] Unlocked after shooting\n grandma more than 3 times\nHold [SPACE] to jump past grandma`, 24).setOrigin(0.5)


        this.livingRoomEx = this.add.bitmapText(game.config.width / 2, game.config.height / 4.25 ,'purplePixel', `Goals: Avoid grandma's kisses by shooting her\nGet 50,000 points to move to next level`, 24, 1).setOrigin(0.5)



        this.add.image(game.config.width / 2, game.config.height / 2.75, 'button').setScale(0.1)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2.9 , 'whitePixel', `SHIFT`, 40).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 3.375 , 'whitePixel', `Shoot`, 38, 1).setOrigin(0.5)


        this.add.image(game.config.width / 2, game.config.height / 1.275, 'button').setScale(0.1)
        // this.add.text(game.config.width / 2, game.config.height / 1.45 ,`SPACE`, {color: '#000000'}).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.3025 , 'whitePixel', `SPACE`, 40).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.175 , 'whitePixel', `- Unlocked after shooting\ngrandma more than 3 times\n- Hold [ SPACE ] to jump past grandma`, 38, 1).setOrigin(0.5)

        // this.add.text(game.config.width / 2, game.config.height / 1.25 ,`Unlocked after shooting\n grandma more than 3 times\nHold [SPACE] to jump past grandma`).setOrigin(0.5)

        this.add.image(game.config.width / 1.5, game.config.height / 1.75, 'right').setScale(0.125)
        this.add.bitmapText(game.config.width / 1.295, game.config.height / 1.8 , 'whitePixel', `Jump Right`, 38, 1).setOrigin(0.5)


        this.add.image(game.config.width / 3, game.config.height / 1.75, 'left').setScale(0.125)
        this.add.bitmapText(game.config.width / 4.25, game.config.height / 1.8 , 'whitePixel', `Jump Left`, 38, 1).setOrigin(0.5)

        this.menuButton = this.add.image(game.config.width / 2.7, game.config.height / 1.0575, 'smallButton').setScale(0.1)
        this.menuLetter = this.add.bitmapText(game.config.width / 2.695, game.config.height / 1.07575 , 'whitePixel',`M`, 40).setOrigin(0.5)
        this.menuText = this.add.bitmapText(game.config.width / 2.25, game.config.height / 1.05 , 'pinkblocko',`Menu`, 36).setOrigin(0.5)

        this.playButton = this.add.image(game.config.width / 1.85, game.config.height / 1.0575, 'button').setScale(0.08)
        this.playLetter = this.add.bitmapText(game.config.width / 1.85, game.config.height / 1.07575 , 'whitePixel',`ENTER`, 40).setOrigin(0.5)
        this.playText = this.add.bitmapText(game.config.width / 1.5875, game.config.height / 1.05 , 'pinkblocko',`Play`, 36).setOrigin(0.5)


        this.dartGroup = this.physics.add.group({
            runChildUpdate: true
        })

        // this.physics.add.collider(this.grandma, this.dartGroup, this.dartGrandmaCollision, null, this, this.dartGroup)

        this.tweenFlash = this.tweens.chain({
            loop: -1,
            tweens: [
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText, this.playButton, this.playLetter, this.playText],
                    duration: 300,
                    alpha: 0,
                    ease: 'Stepped'
                },
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText, this.playButton, this.playLetter, this.playText],
                    duration: 300,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText, this.playButton, this.playLetter, this.playText],
                    duration: 300,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets:  [this.menuButton, this.menuLetter, this.menuText, this.playButton, this.playLetter, this.playText],
                    duration: 250,
                    alpha: 0,
                    ease: 'Stepped',
                }
            ]
        })

    }

    update() {
        const { KEYS } = this

        this.grandsonFSM.step()

        if(KEYS.M.isDown) {
            this.scene.start('menuScene')
        }
        if(KEYS.ENTER.isDown) {
            this.scene.start('playScene')
        }
    }

    dartCreate(grandson, factor, speed){
        let dart = new Dart(this, grandson.x + factor, grandson.y + 30 , 'dart', 0, grandson.direction, speed)
        this.dartGroup.add(dart)
    }

    // dartGrandmaCollision(grandma, dart){
    //     this.sound.play('toy-gun1') 

    //     if(grandma.direction == dart.direction){
    //        if(grandma.direction === 'left'){
    //         this.grandma.changeDirection = true
    //         this.grandmaFSM.transition('shot')
    //        }
    //        else{
    //         this.grandma.changeDirection = true
    //         this.grandmaFSM.transition('shot')
    //        }
    //     }
    //     else{

    //         this.grandmaFSM.transition('shot')
    //     }

    //     dart.destroy()
    //     this.shootCount += 1
    //     if(this.shootCount >= 3 && this.allowSuperJump == false){
    //         this.sound.play('powerup', {volume: 0.25})
    //         this.kid.setTint(0x33c446)
    //         this.time.addEvent({ delay: 175, callback: () => {
    //             this.kid.clearTint()
    //             this.time.addEvent({ delay: 100, callback: () => {this.kid.setTint(0x233c446)}, callbackScope: this});
    //             this.time.addEvent({ delay: 125, callback: () => {this.kid.clearTint()}, callbackScope: this})
    
    //         }, callbackScope: this})

    //         this.allowSuperJump = true
    //         this.bonus *= 1.5
    //     }
    // }

}