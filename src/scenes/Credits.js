class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)
        this.ControlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'blocko',`Controls`, 72).setOrigin(0.5)

        // this.finalScore 

        this.controlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'blocko',`Controls`, 36).setOrigin(0.5)
        this.livingRoomText = this.add.bitmapText(game.config.width / 4, game.config.height / 6 , 'blocko',`Living Room`, 36).setOrigin(0.5)

        // this.load.image('livingRoom', './assets/EscapeLivingRoom.png')

        this.add.image(width / 3.5, height / 2, 'livingroom').setScale(0.15)
        this.streetImage =  this.add.image(width / 1.5, height / 2 + 21, 'street1').setScale(0.305)

        this.streetImage.setCrop(650, 0, 1236, 863)

        this.grandson = this.add.sprite(game.config.width / 2,  height / 1.6 + 40, 'grandson').setScale(0.4)
        this.grandson.play('jumping-left')
        this.grandma = new Grandma(this, width / 1.4, height / 1.6 + 20, "grandma", 0, 'left').setScale(0.4)
        this.grandma.play('chasing-left')
        this.hearts = this.add.sprite(game.config.width / 2,  height / 2, 'heart').setScale(0.1)
        this.hearts.play('hearts')

        this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)


        let config = {            
            fontFamily: 'Courier',
        }

        this.livingRoomInstr = this.add.text(game.config.width / 3.5, game.config.height / 1.3 ,`[<] to jump left\n[>] to jump right\n[SHIFT] to shoot\n[SPACE] Unlocked after shooting grandma\nmore than 3 times\nHold [SPACE] to jump past grandma`, 24).setOrigin(0.5)

    }

    update() {
    }
}
