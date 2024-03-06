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


        this.body.setCollideWorldBounds(true)
        this.direction = direction 


        this.play('chasing')



        this.velocity = 0.5    // in pixels
        // this.dashCooldown = 300    // in ms
        // this.hurtTimer = 250       // in ms

        scene.grandmaFSM = new StateMachine('shot', {
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
        grandma.anims.play(`chasing-${grandma.direction}`)
    }

    execute(scene, grandma) {
        // const { KEYS } = scene
        grandma.x -= grandma.velocity
        // move back and forth until borders hit

        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }
}

class ShotState extends State {
    enter(scene, grandma) {

        if(grandma.direction === 'left'){
            this.jumpAnim(scene, grandma, 4, 0, 5, 0)
            this.jumpAnim(scene, grandma, 5, 175, 4, 0)
            this.jumpAnim(scene, grandma, 6, 300, 3, 0)
            this.jumpAnim(scene, grandma, 7, 400, 2, 0)

            scene.time.addEvent({ delay: 525, callback: () => {
                this.stateMachine.transition('chasing')
    
            }, callbackScope: this})
        } 
        else {
            this.jumpAnim(scene, grandma, 7, 0, 25, -20)
            this.jumpAnim(scene, grandma, 8, 60, 15, -10)
            this.jumpAnim(scene, grandma, 9, 120, 10, -10)
            this.jumpAnim(scene, grandma, 8, 180, 15, 10)
            this.jumpAnim(scene, grandma, 7, 240, 10, 10)
            this.jumpAnim(scene, grandma, 0, 300, 5, 20)
        }
        // grandma.anims.play(`shot-${grandma.direction}`)



        // grandma.anims.play("shot")
    }

    execute(scene, grandma) {
        // go back to chasing after shot animation plays
        
        // if(grandma.frame.name === 7 || grandma.frame.name === 11){

        //     this.stateMachine.transition('chasing')
        // }


        // const { KEYS } = scene
        
        // grandma.x -= 5

        // move back and forth until borders hit

        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }

    jumpAnim(scene, grandma, frame, delay, x, y){
        // To move in a direction, use positive vs negative as follows
        // (- , -) for ↖        (+, -) for ↗
        // (-, +) for  ↙        (+, +) for ↘

        // from RexRainbow Phaser 3 notes
        scene.time.addEvent({
            delay: delay,                // ms
            callback: () => {console.log(`frame: ${frame}`); grandma.setFrame(frame), grandma.x += x; grandma.y += y},
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