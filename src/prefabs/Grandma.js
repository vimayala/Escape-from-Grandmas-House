class Grandma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame, direction) // call Sprite parent class
        scene.add.existing(this)                      // add grandson to existing scene
        scene.physics.add.existing(this)              // add physics body to scene

        // this.body.setSize(this.width / 2, this.height / 2)

        // this.body.setSize(this.width / 3, this.height / 1.5)
        // this.body.setOffset(this.width/2, this.height/5.25)
        this.body.setCircle(this.width / 4)
        this.body.setOffset(this.width/5, this.height/4)
        // this.setImmovable()


        this.body.setCollideWorldBounds(true)
        this.direction = direction 
        this.changeDirection = false




        this.velocity = 0.5    // in pixels
        // this.dashCooldown = 300    // in ms
        // this.hurtTimer = 250       // in ms

        scene.grandmaFSM = new StateMachine('chasing', {
            chasing: new ChasingState(),
            shot: new ShotState(),
            kissing: new KissingState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM


    }

    update () {
        // this.x -= this.moveSpeed        // move spaceship left
        // if(this.x <= 0 - this.width) {
        //     this.x = game.config.width
        // }
    }

    reset() {
        // this.x = game.config.width
    }

    
}

class ChasingState extends State {
    enter(scene, grandma) {
        console.log(`Current Direction ChasingState: ${grandma.direction}`)

        // grandma.anims.play(`chasing-left`)
        grandma.anims.play(`chasing-${grandma.direction}`)
    }

    execute(scene, grandma) {
        // const { KEYS } = scene

        // console.log('chasing state!')
        // console.log(grandma.direction)

        let directionFactor = 1
        if(grandma.direction === 'right'){
            directionFactor *= -1
        }


        // move back and forth until borders hit
        if(grandma.x >= 300 && grandma.x <= 670){
            // console.log(grandma.x)
            grandma.x -= grandma.velocity * directionFactor
        }
        else{
            // console.log('else')
            // console.log(`else: ${grandma.x}`)

            // make else change anim and make her
            if(grandma.x > 670){
                grandma.direction = 'left'
                // grandma.flipX = false
                // grandma.anims.play(`chasing-${grandma.direction}`)
                
            }
            else{
                grandma.direction = 'right'
                // grandma.flipX = true
                directionFactor *= -1
            }
            grandma.anims.play(`chasing-${grandma.direction}`)

            // directionFactor *= -1
            grandma.x -= grandma.velocity * directionFactor

        }
        // if(grandma.x < 280){
        //     grandma.x = 280
        //     grandma.flipX = true
        //     grandma.x -= grandma.velocity * directionFactor

        // }

        // if grandma's x hits 0, change direction
        // if x < 0, keep it moving
        // if hits 





        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }
}

class ShotState extends State {
    enter(scene, grandma) {
        console.log(`Current Direction ShotState: ${grandma.direction}`)

        let directionFactor = 1
        // if(grandma.x > 680 || grandma.x < 285){
        //     directionFactor = 0
        // }

        // if(grandma.changeDirection == true){
        //     directionFactor *= -1
        //     grandma.changeDirection = false
        // }

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

            scene.time.addEvent({ delay: 525, callback: () => {
                this.stateMachine.transition('chasing')
                
            }, callbackScope: this})
        } 
        else {
            // this.jumpAnim(scene, grandma, 4, 0, 5 * directionFactor, 0)
            // this.jumpAnim(scene, grandma, 5, 175, 4 * directionFactor, 0)
            // this.jumpAnim(scene, grandma, 6, 300, 3 * directionFactor, 0)
            // this.jumpAnim(scene, grandma, 7, 400, 2 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 8, 0, 5 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 9, 175, 4 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 10, 300, 3 * directionFactor, 0)
            this.jumpAnim(scene, grandma, 11, 400, 2 * directionFactor, 0)

            // grandma.anims.play(`shot-${grandma.direction}`)

            scene.time.addEvent({ delay: 525, callback: () => {
                this.stateMachine.transition('chasing')
                
            }, callbackScope: this})
        }
    }

    // execute(scene, grandma) {
    // }

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

class KissingState extends State {
    enter(scene, grandma) {
        grandma.anims.play(`kissing-${grandson.direction}`)
        // grandma.anims.play("kissing")
    }

    execute(scene, grandson) {
        // const { KEYS } = scene
        // grandma.x -= 5
        // move back and forth until borders hit

        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }
}