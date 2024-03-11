class Controls extends Phaser.Scene {
    constructor() {
        super('controlsScene')
    }

    create() {
        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
        this.ControlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'blocko',`Controls`, 72).setOrigin(0.5)

        // this.finalScore 

        this.controlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.05 , 'blocko',`[S] to return to menu`, 36).setOrigin(0.5)
        this.livingRoomText = this.add.bitmapText(game.config.width / 3.5, game.config.height / 3.5 , 'blocko',`Living Room`, 36).setOrigin(0.5)
        this.streetText = this.add.bitmapText(game.config.width / 1.475, game.config.height / 3.5 , 'blocko',`Street`, 36).setOrigin(0.5)

        // this.load.image('livingRoom', './assets/EscapeLivingRoom.png')

        this.add.image(width / 3.5, height / 2, 'livingroom').setScale(0.15)
        this.streetImage =  this.add.image(width / 1.475, height / 2 + 21, 'street1').setScale(0.305)

        this.streetImage.setCrop(630, 0, 1200, 863)

        this.add.image(width / 1.5 + 10, height / 2, 'gameframe').setScale(0.3015)


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

        this.livingRoomEx = this.add.text(game.config.width / 3.5, game.config.height / 1.375 ,`Avoid grandma's kisses by shooting her\nGet 50,000 points to move to next level`, 24).setOrigin(0.5)
        this.livingRoomInstr = this.add.text(game.config.width / 3.5, game.config.height / 1.2 ,`[LEFT] to jump left\n[RIGHT] to jump right\n[SHIFT] to shoot\n[SPACE] Unlocked after shooting\n grandma more than 3 times\nHold [SPACE] to jump past grandma`, 24).setOrigin(0.5)
        this.streetEx = this.add.text(game.config.width / 1.6125, game.config.height / 1.375 ,`Avoid grandma and her love\nGet across the street to win`, 24).setOrigin(0.5)
        this.streetInstr = this.add.text(game.config.width / 1.5, game.config.height / 1.2 ,`[UP] to move up\n[DOWN] to jump right\n[SHIFT] to shoot\n[SPACE] Unlocked after shooting grandma\nmore than 3 times\nHold [SPACE] to jump past grandma`, 24).setOrigin(0.5)

    }

    update() {
        const { KEYS } = this

        if(KEYS.S.isDown) {
            this.scene.start('menuScene')
        }
    }
}