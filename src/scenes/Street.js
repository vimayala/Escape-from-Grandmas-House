class Street extends Phaser.Scene {
    constructor() {
        super('streetScene')
    }

    init() {
        // Add any constants
        this.PLAYER_VELOCITY = 50
        this.obstacleSpawnDelay = 2500
        this.OBSTACLE_SPEED = 2

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

        /* Add arcade game frame on top */ 


        // Add Grandma and Grandson from prefabs
        this.kid = new Grandson(this, width / 2.25, height / 1.525, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.grandma = new Grandma(this, width / 8, height / 1.65, "grandma", 0, 'right')
        this.grandma.setScale(0.8)


        this.kid.flipX = true
        this.kid.play('scared').once('animationcomplete', () => {
            this.time.delayedCall(3000, () => { 
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

        // this.layer = this.add.layer()

        this.gameFrame = this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)
        this.gameFrame.setDepth(1)
        // const topLayer = this.add.layer()
        // topLayer.add([gameFrame])

        this.physics.add.collider(this.kid, this.obstacleGroup, this.handleObstacleCollision, null, this, this.obstacleGroup)

    }

    update() {

        this.street.tilePositionX += 4

        // // get local KEYS reference
        const { KEYS } = this


        

        // this.grandsonFSM.step()
        // this.grandmaFSM.step()

        let playerVector = new Phaser.Math.Vector2(0, 0)
        if(KEYS.UP.isDown){    
            if(this.kid.y >= 200){
                playerVector.y = -1
            }
        }
        if(KEYS.DOWN.isDown){
            if(this.kid.y <= 600){
                playerVector.y = 1
            }
        }
        playerVector.normalize()
        this.kid.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        

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


    handleObstacleCollision(kid, trash){
        kid.setTint(0xf05a4f)
        this.time.addEvent({ delay: 175, callback: () => {
            kid.clearTint()
            this.time.addEvent({ delay: 100, callback: () => {this.kid.setTint(0xf05a4f)}, callbackScope: this});
            this.time.addEvent({ delay: 125, callback: () => {this.kid.clearTint()}, callbackScope: this})

        }, callbackScope: this})
        trash.destroy()
        // this.sound.play('ping')

        // this.p1duck.trashCount += 1

        // if(this.p1duck.trashCount >=3) {
        //     this.scene.start('gameOverScene') 
        //     this.mySong.stop()
        // }
        // else{
        //     this.lives.setFrame(this.p1duck.trashCount)
        // }
        this.PLAYER_VELOCITY = 100
    }

}