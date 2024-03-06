class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // Add any constants

        // Initializing Variables
        this.gunCount = 3
    }

    create() {
        // Get keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS


        // // keys defined
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // cursors = this.input.keyboard.createCursorKeys()

        // Add living room background
        this.livingRoom = this.add.tileSprite(0, 0, 2472, 1746, 'livingroom').setOrigin(0,0).setScale(0.4)
        


        // Add Grandma and Grandson from prefabs
        this.kid = new Grandson(this, width / 2, height / 1.525, 'grandson', 0, 'right')
        this.kid.setScale(0.8)
        /* Make from grandma prefab */
        this.grandma = new Grandma(this, width / 1.65, height / 1.65, "grandma", 0, 'left')
        this.grandma.setScale(0.8)
        this.grandma.play('kissing')


    /*  Fix Score */

        // Score
        playerScore = 0
        // this.add.bitmapText(game.config.width / 2, borderUISize + borderPadding * 2 - 50, 'blockFont', 'Score: ', 72)
        this.add.bitmapText(game.config.width / 1.175, borderUISize + borderPadding * 2 + 5 , 'blockFont',`190789`, 72, 'right').setOrigin(0.5)

    }

    update() {

        // get local KEYS reference
        const { KEYS } = this

        // this.kid.update()
        this.grandsonFSM.step()

        // let playerVector = new Phaser.Math.Vector2(0, 0)
        // if(this.p1duck.y >= 135){
        //     if(cursors.up.isDown){
        //         playerVector.y = -1
        //     }
        // }
        // if(this.p1duck.y <= 400){
        //     if(cursors.down.isDown){
        //         playerVector.y = 1
        //     }
        // }
        // playerVector.normalize()
        // this.p1duck.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    }

}