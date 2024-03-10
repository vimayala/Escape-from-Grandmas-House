class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // Initializing Variables
        this.shootCount = 0
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
        this.playerScore = 0
        this.scoreDisplay = this.add.bitmapText(game.config.width / 1.4, borderUISize + borderPadding * 2 + 5 , 'blockFont',`0`, 72).setOrigin(0.5)

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
        this.playerScore += 1000
        this.scoreDisplay.text = this.playerScore

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
    }

    // If grandma and grandson collide, end the game
    // If grandson shoots 3 or more times, he can pass through 
    handleKidCollision(grandson, grandma){
        //         grandson.x -= 50

        // if(this.collisionFlag == false && this.grandsonFSM.state != 'superJump'){
        //     grandson.y -= 40
        //     this.collisionFlag = true
        //     this.grandsonFSM.transition('kissed')
        //     this.grandmaFSM.transition('kissing')
        // }

        console.log('DEATH')

    }

}