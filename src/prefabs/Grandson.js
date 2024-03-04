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
        
        /* Temporary: Print direction when entering jump state */
        console.log(grandson.direction)

        // To simulate jump, play frame by frame with delayed called
        if(grandson.direction === 'left'){
            this.jumpAnim(scene, grandson, 4, 0, -25, -20)
            this.jumpAnim(scene, grandson, 5, 60, -15, -10)
            this.jumpAnim(scene, grandson, 6, 120, -10, -10)
            // var endX = grandson.x
            this.jumpAnim(scene, grandson, 5, 180, -15, 10)
            this.jumpAnim(scene, grandson, 4, 240, -10, 10)
            this.jumpAnim(scene, grandson, 1, 300, -5, 20)
        } 
        else {
            this.jumpAnim(scene, grandson, 7, 0, 25, -20)
            this.jumpAnim(scene, grandson, 8, 60, 15, -10)
            this.jumpAnim(scene, grandson, 9, 120, 10, -10)
            this.jumpAnim(scene, grandson, 8, 180, 15, 10)
            this.jumpAnim(scene, grandson, 7, 240, 10, 10)
            this.jumpAnim(scene, grandson, 0, 300, 5, 20)
        }
        this.jump = false

    }

    execute(scene, grandson) {

        const { KEYS } = scene


        // // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // jump if pressing left or right

        if(KEYS.LEFT.isDown && this.jump === true) {
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            this.jump = true
            return
        }

        if(KEYS.RIGHT.isDown && this.jump === true) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            this.jump = true
            return
        }

        // grab gun if shift clicked and enough guns
        if(KEYS.SHIFT.isDown && scene.gunCount > 0) {
            this.stateMachine.transition('shoot')
            return
        }
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
        grandson.anims.play(`holdGun-${grandson.direction}`)
    }

    execute(scene, grandson) {

        const { KEYS } = scene


        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // shoot if pressing shift
        if(KEYS.SHOOT.isDown){
            this.stateMachine.transition('shoot')
            return
        }

    }
}

class ShootGunState extends State {
    enter(scene, grandson) {
        // play frame by frame ?

        console.log(grandson.direction)
        grandson.anims.play(`grabGun-${grandson.direction}`)
        grandson.anims.play(`holdGun-${grandson.direction}`)

        grandson.anims.play(`shootGun-${grandson.direction}`)
    }

    execute(scene, grandson) {
        const { KEYS } = scene



    }
}

