class Street extends Phaser.Scene {
    constructor() {
        super('streetScene')
    }

    init() {
        // Add any constants
        this.PLAYER_VELOCITY = 75
        this.OBSTACLE_SPEED = 2
        this.GRANDMA_VELOCITY = 50
        this.obstacleSpawnDelay = 2500

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

        this.physics.world.setBounds(50, 0, 700, game.config.height)


        this.street = this.add.tileSprite(0, 0, 9888, 1746, 'street1').setOrigin(0,0).setScale(0.8)
        this.street.y -= 100

        // Add Grandma and Grandson from prefabs
        this.kid = new Grandson(this, width / 2.8, height / 1.525, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.grandma = new Grandma(this, width / 8, height / 1.65, "grandma", 0, 'right')
        this.grandma.setScale(0.8)

        this.savedY = this.kid.y
        this.collisionFlag = false

        this.kid.flipX = true
        this.kid.play('scared').once('animationcomplete', () => {
            this.time.delayedCall(500, () => {
                this.kid.flipX = false
                this.kid.play('jumping-right')
            })
        })

        this.grandmaFSM.transition('chasing')

        this.obstacleGroup = this.physics.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(this.obstacleSpawnDelay, () => { 
            this.addBarrier() 
        })

        this.scoreDisplay = this.add.bitmapText(game.config.width / 1.4, borderUISize + borderPadding * 2 + 5 , 'blockFont', playerScore, 72).setOrigin(0.5)

        this.gameFrame = this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)
        this.gameFrame.setDepth(1)
        // const topLayer = this.add.layer()
        // topLayer.add([gameFrame])
        this.physics.add.collider(this.kid, this.grandma, this.handleKidCollision, null, this, this.grandma)
        this.physics.add.collider(this.kid, this.obstacleGroup, this.handleObstacleCollision, null, this, this.obstacleGroup)

        // create new timer
            // restart/destroy timer in obstacle collision
    }

    update() {

        this.street.tilePositionX += 4

        // // get local KEYS reference
        const { KEYS } = this


        

        // this.grandsonFSM.step()
        // this.grandmaFSM.step()

        let playerVector = new Phaser.Math.Vector2(0, 0)
        if(KEYS.UP.isDown){    
            if(this.kid.y >= 225){
                playerVector.y = -1
            }
        }
        if(KEYS.DOWN.isDown){
            if(this.kid.y <= 590){
                playerVector.y = 1
            }
        }
        playerVector.normalize()
        this.kid.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        // if(this.grandma.y == this.savedY){
        //     this.grandma.setVelocity(0)
        // }
        // else{
        //     console.log(`grandma y: ${this.grandma.y}, saved y: ${this.savedY}`)

        // }
        

    }


    addBarrier() {
        var index = Phaser.Math.RND.between(0, 2);
        // var obstaclePicked = obstacleTypes[index]
        var obstaclePicked = 'heart'

        let obstacle = new Obstacle(this, obstaclePicked, this.OBSTACLE_SPEED)

        if(obstaclePicked == 'heart'){
            obstacle.setScale(0.07)
            obstacle.play('hearts')
        }
        // else if(trashPicked == 'can') {
        //     trash.setScale(0.017)
        //     trash.body.setSize(trash.width / 1.75, trash.height / 2 - 200)
        //     trash.body.setOffset(350, 750)
        // }
        // else{
        //     trash.body.setSize(920, 600)
        //     trash.body.setOffset(trash.width / 15, trash.height / 3 + 30)
        //     trash.setScale(0.06)
        //     trash.setOrigin(0)
        //     trash.play('trash-stinky')
        // }
        obstacle.body.setImmovable()
        this.obstacleGroup.add(obstacle)
    }

    /*  Add collider for grandson and grandma, when colliding, play animation and find offset OR change hit boxes so no math ? */


    handleObstacleCollision(kid, obstacle){
        this.sound.play('damage')
        kid.setTint(0xf05a4f)
        this.time.addEvent({ delay: 175, callback: () => {
            kid.clearTint()
            this.time.addEvent({ delay: 100, callback: () => {this.kid.setTint(0xf05a4f)}, callbackScope: this});
            this.time.addEvent({ delay: 125, callback: () => {this.kid.clearTint()}, callbackScope: this})

        }, callbackScope: this})
        obstacle.destroy()


        this.grandma.y = this.kid.y

        // console.log(`Saved Y: ${kid.y}`)

        // this.savedY = kid.y


        // let grandmaVector = new Phaser.Math.Vector2(0, 0)
        // grandmaVector.y = kid.y
        // grandmaVector.normalize()
        // this.grandma.setVelocity(0, this.GRANDMA_VELOCITY)


        kid.x -= 50
        this.PLAYER_VELOCITY = 100
    }

    handleKidCollision(grandson, grandma){
        console.log('collided')
        if(this.collisionFlag == false){
            this.collisionFlag = true
            // this.grandsonFSM.transition('kissed')
            // this.grandmaFSM.transition('kissing')
            this.scene.start('gameOverScene')
            // console.log('DEATH GRRRR RAGH')
        }
    }

}