class Street extends Phaser.Scene {
    constructor() {
        super('streetScene')
    }

    init() {
        // Add any constants

    }

    create() {

        this.physics.world.setBounds(220, 0, 550, game.config.height)

        // Get keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS


        // // keys defined
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // cursors = this.input.keyboard.createCursorKeys()

        // Add street background
        this.street = this.add.tileSprite(0, 0, 9888, 1746, 'street').setOrigin(0,0).setScale(0.4)

        /* Add arcade game frame on top */ 


        // Add Grandma and Grandson from prefabs
        this.kid = new Grandson(this, width / 2.25, height / 1.525, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.grandma = new Grandma(this, width / 1.65, height / 1.65, "grandma", 0, 'left')
        this.grandma.setScale(0.8)


    }

    /*  Add collider for grandson and grandma, when colliding, play animation and find offset OR change hit boxes so no math ? */


    update() {

        this.street.tilePositionX += 4

        // // get local KEYS reference
        // const { KEYS } = this


        

        // this.grandsonFSM.step()
        // this.grandmaFSM.step()

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