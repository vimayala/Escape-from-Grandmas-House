class PlayControls extends Phaser.Scene {
    constructor() {
        super('playControlScene')
    }

    create() {
        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
        this.ControlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 9 , 'blocko',`Controls`, 72).setOrigin(0.5)

        // this.finalScore 

        this.controlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.05 , 'blocko',`[S] to return to menu`, 36).setOrigin(0.5)
        this.livingRoomText = this.add.bitmapText(game.config.width / 2, game.config.height / 4 , 'blocko',`Living Room`, 36).setOrigin(0.5)

        // this.load.image('livingRoom', './assets/EscapeLivingRoom.png')

        // this.add.image(width / 2, height / 2, 'livingroom').setScale(0.17)

        this.kid = new Grandson(this, width / 2, height / 2, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.kid.play('idle-left')

        // this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.4)
        // this.grandson.play('jumping-left')
        // this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.4)
        // this.grandma.play('chasing-left')
        // this.hearts = this.add.sprite(game.config.width / 2,  height / 2, 'heart').setScale(0.1)
        // this.hearts.play('hearts')

        this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)

        let config = {            
            fontFamily: 'Courier',
        }

        this.livingRoomEx = this.add.text(game.config.width / 2, game.config.height / 3.75 ,`Goals: Avoid grandma's kisses by shooting her\nGet 50,000 points to move to next level`, {fontSize: '36', fontFamily: 'American Typewriter'}).setOrigin(0.5)
        // this.livingRoomInstr = this.add.text(game.config.width / 2, game.config.height / 1.2 ,`[LEFT] to jump left\n[RIGHT] to jump right\n[SHIFT] to shoot\n[SPACE] Unlocked after shooting\n grandma more than 3 times\nHold [SPACE] to jump past grandma`, 24).setOrigin(0.5)


        this.add.image(game.config.width / 2, game.config.height / 3, 'button').setScale(0.1)
        this.livingRoomEx = this.add.text(game.config.width / 2, game.config.height / 3 ,`SHIFT`, {color: '#000000'}).setOrigin(0.5)

        this.add.image(game.config.width / 2, game.config.height / 1.45, 'button').setScale(0.1)
        this.add.text(game.config.width / 2, game.config.height / 1.45 ,`SPACE`, {color: '#000000'}).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 1.25 ,`Unlocked after shooting\n grandma more than 3 times\nHold [SPACE] to jump past grandma`).setOrigin(0.5)


        this.dartGroup = this.physics.add.group({
            runChildUpdate: true
        })


    }

    update() {
        const { KEYS } = this

        this.grandsonFSM.step()

        if(KEYS.S.isDown) {
            this.scene.start('menuScene')
        }
    }

    dartCreate(grandson, factor, speed){
        let dart = new Dart(this, grandson.x + factor, grandson.y + 30 , 'dart', 0, grandson.direction, speed)
        this.dartGroup.add(dart)
    }

}