class Grandma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame, direction) // call Sprite parent class
        scene.add.existing(this)                      // add grandson to existing scene
        scene.physics.add.existing(this)              // add physics body to scene

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        this.direction = direction 


        this.play('chasing')



        this.velocity = 10    // in pixels
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
        // grandma.anims.play(`chasing-${grandson.direction}`)
        grandma.anims.play("chasing")
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
        // grandma.anims.play(`shot-${grandson.direction}`)
        grandma.anims.play("shot")
    }

    execute(scene, grandma) {
        // const { KEYS } = scene
        
        // grandma.x -= 5

        // move back and forth until borders hit

        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }
}

class KissingState extends State {
    enter(scene, grandma) {
        // grandma.anims.play(`kissing-${grandson.direction}`)
        grandma.anims.play("kissing")
    }

    execute(scene, grandson) {
        // const { KEYS } = scene
        // grandma.x -= 5
        // move back and forth until borders hit

        // if grandma's hand (maybe change hit box) touches grandson, change to kissing state
            // change grandson to struggle state either here or in play...
    }
}