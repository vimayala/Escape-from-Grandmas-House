class Grandma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        // Add grandma to the scene with physics
        super(scene, x, y, texture, frame, direction) 
        scene.add.existing(this)                     
        scene.physics.add.existing(this)             

        
        // Edit grandma's collision body
        this.body.setSize(this.width / 2, this.height / 1.75)
        this.body.setOffset(this.width / 4, this.height / 3.5)
        this.body.setImmovable()

        // Change grandma to collide with world bounds set in play
        this.body.setCollideWorldBounds(true)

        // Adjust custom grandma properties
        this.direction = direction 
        this.changeDirection = false
        this.velocity = 0.5    // in pixels
        // this.hurtTimer = 250       // in ms

        // Add grandma's state machine and begin with chasing
        scene.grandmaFSM = new StateMachine('chasing', {
            chasing: new ChasingState(),
            shot: new ShotState(),
            kissing: new KissingState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM


    }

    // // Grandma update (left out because state machine updates in play)
    // update () {
    // }
    
}

// Grandma's Chasing State
class ChasingState extends State {
    // Play the chasing animation decided by direction
    enter(scene, grandma) {
        grandma.anims.play(`chasing-${grandma.direction}`)
    }

    // Change the direction being moved when grandma needs to flip to face other direction
    // If she hits the bounds, then the animation is flipped
    // Else she walks forward normally
    execute(scene, grandma) {

        let directionFactor = 1
        if(grandma.direction === 'right'){
            directionFactor *= -1
        }

        if(grandma.x >= 260 && grandma.x <= 720){
            grandma.x -= grandma.velocity * directionFactor
        }
        else{
            if(grandma.x > 720){
                grandma.direction = 'left'
                
            }
            else{
                grandma.direction = 'right'
            }
            grandma.anims.play(`chasing-${grandma.direction}`)
            grandma.x -= grandma.velocity * directionFactor

        }
    }
}

// Grandma's Shot State
class ShotState extends State {
    enter(scene, grandma) {
        // If flag raised to change direction, change grandma's direction
        let directionFactor = 1
        if(grandma.changeDirection == true){
            grandma.changeDirection = false
            if(grandma.direction === 'right'){
                grandma.direction = 'left'
            }
            else{
                grandma.direction = 'right'
            }
        }

        scene.sound.play('ouch', {volume: 0.2, rate: 1.425})

        // Play animation frame by frame and change x factor with direction factor
        if(grandma.direction === 'left'){
            this.jumpAnim(scene, grandma, 4, 0, 5 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 5, 175, 4 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 6, 300, 3 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 7, 400, 2 * directionFactor, 0)

            // grandma.anims.play(`shot-${grandma.direction}`)

            // if(grandma.changeDirection == true){
            //     if(grandma.direction === 'right'){
            //         grandma.direction = 'left'
            //     }
            //     else{
            //         grandma.direction = 'right'
            //     }
            // }

        } 
        else {

            directionFactor *= -1
            this.jumpAnim(scene, grandma, 8, 0, 5 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 9, 175, 4 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 10, 300, 3 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 11, 400, 2 * directionFactor, 0)

        }
    }

    /* State changes even if held down >:( */

    // When animation played, change to chasing state
    execute(scene, grandma) {

        scene.time.addEvent({ delay: 525, callback: () => {

            const { KEYS } = scene
            // if(KEYS.SHIFT.isUp){
            //     console.log('key up')
                this.stateMachine.transition('chasing')
            // }

            
            
        }, callbackScope: this})
        
    }

    // Function to delay animation calls for custom playing jump animation with direction
    jumpAnim(scene, grandma, frame, delay, x, y){
        // To move in a direction, use positive vs negative as follows
        // (- , -) for ↖        (+, -) for ↗
        // (-, +) for  ↙        (+, +) for ↘

        // from RexRainbow Phaser 3 notes
        scene.time.addEvent({
            delay: delay,                // ms
            callback: () => {grandma.setFrame(frame), grandma.x += x; grandma.y += y},
            args: [],
            loop: false,
            repeat: 0,
            startAt: 0,
            timeScale: 1,
            paused: false
        });
    }
}

// Grandma Kissing State
class KissingState extends State {
    enter(scene, grandma) {
        grandma.velocity = 0
        grandma.anims.play(`kissing-${grandma.direction}`)
        /* Play kissing sound */
    }

    execute(scene, grandson) {
    }
}