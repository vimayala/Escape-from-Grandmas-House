class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // Initializing Variables
        this.shootCount = 0
        this.allowSuperJump = false
        this.bonus = 1
        this.mode = 'easy'
    }

    create() {

        // Set custom world bounds to for living room floor
        this.physics.world.setBounds(125, 0, 700, game.config.height)

        // Get keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // Add living room background
        this.livingRoom = this.add.tileSprite(0, 0, 2472, 1746, 'livingroom').setOrigin(0,0).setScale(0.4)

        // Add Grandma and Grandson from prefabs
        this.kid = new Grandson(this, width / 2.25, height / 1.525 + 20, "grandson", 0, 'right')
        this.kid.setScale(0.8)
        this.grandma = new Grandma(this, width / 1.55, height / 1.6 + 20, "grandma", 0, 'left')
        this.grandma.setScale(0.8)

        // Create a dart group to run updates for each prefab item created
        this.dartGroup = this.physics.add.group({
            runChildUpdate: true
        })

        // Add physics colliders between
            // Grandma and grandson (kid)
            // Grandma and dart
        // Add collider flag so animations play
        this.collisionFlag = false

        this.physics.add.collider(this.kid, this.grandma, this.handleKidCollision, null, this, this.grandma)
        this.physics.add.collider(this.grandma, this.dartGroup, this.dartGrandmaCollision, null, this, this.dartGroup)

        // Add player score
        playerScore = 0
        this.scoreDisplay = this.add.bitmapText(game.config.width / 1.4, borderUISize + borderPadding * 2 + 5 , 'blockFont',`0`, 72).setOrigin(0.5)

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
        // get local KEYS reference
        const { KEYS } = this

        // Update state machines
        this.grandsonFSM.step()
        this.grandmaFSM.step()

        // 

        /* Temporary: Start street scene */
        if(KEYS.S.isDown){
            this.scene.start('streetScene')
        }

    }

    // Taken from phaserjs GitHub Counter Tween Example
    updateScore() {
        oldScore = playerScore
        playerScore += 1000 + (500 * this.bonus)

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

    dartCreate(grandson, factor, speed){
        // Create a new dart and add it to the group
        let dart = new Dart(this, grandson.x + factor, grandson.y + 30 , 'dart', 0, grandson.direction, speed)
        this.dartGroup.add(dart)
    }

    // Grandma reacts to dart
    // If behind, push foward
    // Else push back
    // Destroy the dart 
    dartGrandmaCollision(grandma, dart){
        this.sound.play('toy-gun1')
        // this.updateTween.updateTo('value', playerScore)
        // this.scoreDisplay.text = playerScore


        this.updateScore()
    

        if(grandma.direction == dart.direction){
           if(grandma.direction === 'left'){
            this.grandma.changeDirection = true
            this.grandmaFSM.transition('shot')
           }
           else{
            this.grandma.changeDirection = true
            this.grandmaFSM.transition('shot')
           }
        }
        else{

            this.grandmaFSM.transition('shot')
        }

        dart.destroy()
        this.shootCount += 1
        if(this.shootCount >= 3 && this.allowSuperJump == false){
            this.sound.play('powerup', {volume: 0.25})
            this.kid.setTint(0x33c446)
            this.time.addEvent({ delay: 175, callback: () => {
                this.kid.clearTint()
                this.time.addEvent({ delay: 100, callback: () => {this.kid.setTint(0x233c446)}, callbackScope: this});
                this.time.addEvent({ delay: 125, callback: () => {this.kid.clearTint()}, callbackScope: this})
    
            }, callbackScope: this})

            this.allowSuperJump = true
            this.bonus *= 1.5
        }
        if(playerScore > 50000){
            this.scene.start('streetScene')
        }
        this.velocityBump()
    }

    // If grandma and grandson collide, end the game
    // If grandson shoots 3 or more times, he can pass through 
    handleKidCollision(grandson, grandma){
        if(this.collisionFlag == false && this.grandsonFSM.state != 'superJump'){
            if(grandma.x < grandson.x){
                grandma.direction = 'right'
            }
            else{
                grandma.direction = 'left'
            }
            grandson.y -= 40
            this.collisionFlag = true
            grandma.anims.play(`kissing-${grandma.direction}`)
            this.grandmaFSM.transition('kissing')
            this.grandsonFSM.transition('kissed')
            console.log(`Grandma Anim: ${grandma.frame.name}`)
        }
    }

    velocityBump(){
        if(playerScore != this.last_score){
            if(playerScore > 6250 && this.grandma.velocity <= 0.5){
                this.last_score = playerScore
                this.grandma.velocity *= 1.25
                console.log(`Increased velocity 1: ${this.grandma.velocity}`)
            }
            else if (playerScore >= 17500 && this.mode == 'easy'){
                this.mode = 'middle'
                this.grandma.velocity *= 1.25
                console.log(`Increased velocity 2: ${this.grandma.velocity}`)
            }
            else if(this.mode != 'end' && playerScore > 34500){
                this.grandma.velocity *= 1.05
                this.mode = 'end'
                console.log(`Increased velocity 3: ${this.grandma.velocity}`)
            }
        }
    }

}