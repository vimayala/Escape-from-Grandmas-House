class Street extends Phaser.Scene {
    constructor() {
        super('streetScene')
    }

    init() {
        // Add any constants
        this.PLAYER_VELOCITY = 100
        this.OBSTACLE_SPEED = 2
        this.GRANDMA_VELOCITY = 50
        this.obstacleSpawnDelay = 2500
        this.rewardSpawnDelay = 2500
        this.factor = 1
        this.rewardCount = 0
        this.obstacleCount = 0
        this.addNewReward = true
        this.addNewObstacle= true

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

        this.kid.setDepth(1)
        this.grandma.setDepth(1)


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

        this.rewardGroup = this.physics.add.group({
            runChildUpdate: true
        })



        this.time.delayedCall(this.obstacleSpawnDelay, () => { 
            this.addReward()
            this.addObstacle() 
        })

        this.scoreDisplay = this.add.bitmapText(game.config.width / 1.4, borderUISize + borderPadding * 2 + 5 , 'blockFont', Math.round(playerScore), 72).setOrigin(0.5)
        this.gameFrame = this.add.image(width / 2 + 0.5, height / 2, 'gameframe').setScale(0.8)
        this.gameFrame.setDepth(2)
        // const topLayer = this.add.layer()
        // topLayer.add([gameFrame])
        this.physics.add.collider(this.kid, this.grandma, this.handleKidCollision, null, this, this.grandma)
        this.physics.add.collider(this.kid, this.obstacleGroup, this.handleObstacleCollision, null, this, this.obstacleGroup)
        this.physics.add.collider(this.kid, this.rewardGroup, this.handleRewardCollision, null, this, this.rewardGroup)


        // Taken from phaserjs GitHub Counter Tween Example
        this.updateTween = this.tweens.addCounter({
            from: oldScore,
            to: playerScore,
            duration: 1000,
            ease: 'linear',
            onUpdate: tween =>
            {
                const value = Math.round(tween.getValue())
                this.scoreDisplay.setText(`${value}`)
            }
        })
    }

    update() {

        this.street.tilePositionX += 4

        // // get local KEYS reference
        const { KEYS } = this

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
        
        if(this.kid.x > 678){
            this.scene.start('gameOverScene')
        }
        playerScore += 1
        // might not tween
        // if(this.rewardCount <= 1 && this.addNewReward){
        //     this.addReward()
        //     this.addNewReward = false
        //     this.time.delayedCall(4500, () => { 
        //         this.addNewReward = true
        //     })
        // }
        // if(this.obstacleCount <= 1 && this.addNewObstacle){
        //     this.addObstacle()
        //     this.addNewObstacle = false
        //     this.time.delayedCall(4500, () => { 
        //         this.addNewObstacle = true
        //     })
        // }

    }


    addObstacle() {
        var index = Phaser.Math.RND.between(0, 1);
        var obstaclePicked = obstacleTypes[index]
        let obstacle = new Obstacle(this, obstaclePicked, this.OBSTACLE_SPEED)

        if(obstaclePicked == 'heart'){
            obstacle.setScale(0.1)
            obstacle.body.setCircle(obstacle.width / 2)

            obstacle.play('hearts')
        }
        else{
            obstacle.setScale(0.15)
            obstacle.body.setCircle(obstacle.width / 2)

            obstacle.play('lips')
        }
        obstacle.body.setImmovable()
        this.obstacleGroup.add(obstacle)
    }


    addReward() {
        let reward = new Reward(this, 'star', this.OBSTACLE_SPEED)
        reward.setScale(0.1)
        reward.play('stars')
        reward.body.setImmovable()
        this.rewardGroup.add(reward)
    }

    /*  Add collider for grandson and grandma, when colliding, play animation and find offset OR change hit boxes so no math ? */


    handleObstacleCollision(kid, obstacle){
        this.sound.play('hurt')
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
    }

    handleRewardCollision(kid, reward){
        this.sound.play('reward', {volume: 0.45})
        // kid.setTint(0xf05a4f)

        playerScore += 1000

        reward.destroy()
        this.rewardCount -= 1


        this.grandma.y = this.kid.y

        // console.log(`Saved Y: ${kid.y}`)

        // this.savedY = kid.y


        // let grandmaVector = new Phaser.Math.Vector2(0, 0)
        // grandmaVector.y = kid.y
        // grandmaVector.normalize()
        // this.grandma.setVelocity(0, this.GRANDMA_VELOCITY)


        kid.x += 50

        if (this.updateTween.isPlaying()){
            //  The tween is already running, so we'll update the end value with resetting it
            this.updateTween.updateTo('value', playerScore)
        }
        else {
            //  The tween has finished, so create a new one
            this.updateTween = this.tweens.addCounter({
                from: oldScore,
                to: playerScore,
                duration: 1000,
                ease: 'linear',
                onUpdate: tween =>
                {
                    const value = Math.round(tween.getValue())
                    this.scoreDisplay.setText(`${value}`)
                }
            })
        }

    }

    handleKidCollision(grandson, grandma){
        if(this.collisionFlag == false){
            this.collisionFlag = true
            this.scene.start('gameOverScene')
        }
    }

}