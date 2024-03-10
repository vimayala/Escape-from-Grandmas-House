class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // Initializing Variables
        this.shootCount = 0
        this.allowSuperJump = false
        this.bonus = 1
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
        this.grandma = new Grandma(this, width / 1.65, height / 1.6 + 20, "grandma", 0, 'left')
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



        /*  Fix Score Position */

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

        if(playerScore >= 50000){
            this.scene.start('streetScene')
        }
    }

    // Taken from phaserjs GitHub Counter Tween Example
    updateScore() {
        oldScore = playerScore
        playerScore += 1000 + (500 * this.bonus)

        if (this.updateTween.isPlaying())
        {
            //  The tween is already running, so we'll update the end value with resetting it
            this.updateTween.updateTo('value', playerScore)
        }
        else
        {
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
        if(this.shootCount >= 3){
            this.allowSuperJump = true
            this.bonus *= 1.5
        }
    }

    // If grandma and grandson collide, end the game
    // If grandson shoots 3 or more times, he can pass through 
    handleKidCollision(grandson, grandma){
        //         grandson.x -= 50

        if(this.collisionFlag == false && this.grandsonFSM.state != 'superJump'){
            grandson.y -= 40
            this.collisionFlag = true
            this.grandsonFSM.transition('kissed')
            this.grandmaFSM.transition('kissing')
        }

        console.log('DEATH')

    }

}