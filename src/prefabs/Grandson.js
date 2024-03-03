class Grandson extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame, direction) // call Sprite parent class
        scene.add.existing(this)           // add grandson to existing scene
        scene.physics.add.existing(this)   // add physics body to scene


        // this.isFiring = false
        // this.moveSpeed = 2
        // this.sfxShot = scene.sound.add('sfx-shot')
        // this.timeFlag = false


        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        this.play('scared')


        this.direction = direction 

        // this.velocity = 100    // in pixels
        // this.dashCooldown = 300    // in ms
        // this.hurtTimer = 250       // in ms

        scene.grandsonFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            grab: new GrabGunState(),
            shoot: new ShootGunState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM

    }

    update () {
        // if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
        //     // this.play("running-left").once('animationcomplete', () => {
        //     //     this.play("idle-left")
        //     //     // this.checkDirection(this.direction, 'left')
        //     //     this.direction = 'left'
        //     //  })
        //     // this.x -= 5
        //     jumpLeft()
        // }

        // else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        //     // make jump, up, jump down by 
        //     this.play("running-right").once('animationcomplete', () => {
        //         this.play("idle-right")
        //         // this.checkDirection(this.direction, 'right')
        //         this.direction = 'right'
        //      })
            
        //     this.x += 5
        // }

        // if(this.anims.currentAnim.key === 'running-left'){
        //     this.y -= 3
        // }

    }

    // reset() {
    //     this.isFiring = false
    //     this.y = game.config.height - borderUISize - borderPadding
    // }

    // checkDirection(oldDirection, newDirection){
    //     if(oldDirection != newDirection){
    //         this.flipX = false
    //     }
    //     else {
    //         this.flipX = true
    //     }
    // }



}

class IdleState extends State {
    enter(scene, grandson) {
        grandson.setVelocity(0)
        grandson.anims.play(`idle-${grandson.direction}`)
    }

    execute(scene, grandson) {
        const { KEYS } = scene

        // // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // jump if pressing left or right
        if(KEYS.LEFT.isDown) {
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            return
        }
        if(KEYS.RIGHT.isDown) {
            this.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }
        
    }
}

class JumpState extends State {
    enter(scene, grandson) {
        // play frame by frame ?
        console.log(grandson.direction)

        if(grandson.direction === 'left'){
            // grandson.setFrame(4)
            // grandson.x -= 50
            // grandson.setFrame(5)
            // grandson.y -= 50
            // grandson.setFrame(6)
            // grandson.setFrame(5)
            // grandson.setFrame(4)
            // // grandson.setFrame(0)

            // grandson.anims.play(`jumping-${grandson.direction}`)

            // var startX = grandson.x
            this.jumpAnim(scene, grandson, 4, 0, -25, -20)
            this.jumpAnim(scene, grandson, 5, 70, -15, -10)
            this.jumpAnim(scene, grandson, 6, 140, -10, -10)
            // var endX = grandson.x
            this.jumpAnim(scene, grandson, 5, 300, -15, 10)
            this.jumpAnim(scene, grandson, 4, 400, -10, 10)
            this.jumpAnim(scene, grandson, 1, 400, -5, 20)




        } 
        else {
            grandson.anims.play(`jumping-${grandson.direction}`)
        }
        // grandson.y += 50


    }

    execute(scene, grandson) {

        const { KEYS } = scene


        // // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // jump if pressing left or right
        // if(Phaser.Input.Keyboard.JustDown(LEFT) || Phaser.Input.Keyboard.JustDown(RIGHT)) {
        //     this.stateMachine.transition('jump')
        //     return
        // }
    }

    jumpAnim(scene, grandson, frame, delay, x, y){
        // To move in a direction, use positive vs negative as follows
        // (- , -) for ↖        (+, -) for ↗
        // (-, +) for  ↙        (+, +) for ↘

        // from RexRainbow Phaser 3 notes
        scene.time.addEvent({
            delay: delay,                // ms
            callback: () => {console.log(`frame: ${frame}`); grandson.setFrame(frame), grandson.x += x; grandson.y += y},
            args: [],
            loop: false,
            repeat: 0,
            startAt: 0,
            timeScale: 1,
            paused: false
        });
    }
}

class GrabGunState extends State {
    enter(scene, grandson) {
        // play frame by frame ?
        grandson.anims.play(`grabGun-${grandson.direction}`)
    }

    execute(scene, grandson) {

        const { KEYS } = scene


        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // shoot if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)){
            this.stateMachine.transition('shoot')
            return
        }

    }
}

class ShootGunState extends State {
    enter(scene, grandson) {
        // play frame by frame ?
        grandson.anims.play(`grabGun-${grandson.direction}`)
    }

    execute(scene, grandson) {
        const { KEYS } = scene



    }
}

