class Grandson extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame, direction) // call Sprite parent class
        scene.add.existing(this)           // add grandson to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 4, this.height / 1.5)
        this.body.setOffset(this.width/2.85, this.height/5.25)
        this.body.setCollideWorldBounds(true)
        this.direction = direction 



        // this.velocity = 100    // in pixels
        // this.dashCooldown = 300    // in ms
        // this.hurtTimer = 250       // in ms

        this.play('scared')


        scene.grandsonFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            // grab: new GrabGunState(),
            shoot: new ShootGunState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM

    }

    // update () {

    // }

    // reset() {
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
        if(KEYS.SHIFT.isDown && scene.gunCount > 0) {
            this.stateMachine.transition('shoot')
            return
        }
        
    }
}

class JumpState extends State {
    enter(scene, grandson) {
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
    }

    execute(scene, grandson) {
        const { KEYS } = scene


        // jump if pressing left or right
        if(KEYS.LEFT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
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

class ShootGunState extends State {
    enter(scene, grandson) {
        this.stateFlag = false
        grandson.anims.play(`grabGun-${grandson.direction}`)
        grandson.anims.play(`holdGun-${grandson.direction}`)
        // grandson.anims.play(`shootGun-${grandson.direction}`)
        // grandson.anims.play(`shootGun-${grandson.direction}`)

        grandson.anims.play(`shootGun-before-${grandson.direction}`).once('animationcomplete', () => {
            this.stateFlag = true
            // if(grandson.frame.name === 22 || grandson.frame.name === 28){


                // if left, use one dart spawn eq else use other

                /*  Move to prefab */
                


                this.dart = scene.add.sprite(grandson.x/2, grandson.y / 2, 'dart').setScale(0.075)
                let direction = 1
                if(grandson.direction === 'left'){
                    direction *= -1
                    this.dart.flipX = true
                }
                this.dart.x = grandson.y - grandson.width / 2 * direction
                this.dart.y = grandson.x - grandson.height / 2

                // this.dartMovement(this.dart, direction)



            // this.dart = new Dart(grandson.x/2, grandson.y / 2, 'dart', 0, grandson.direction)


                // make dart moving function ? or prefab ?

            // }
            grandson.anims.play(`shootGun-after-${grandson.direction}`)
        })




        /*  animate dart */ 
    }

    execute(scene, grandson) {
        const { KEYS } = scene


        // // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey
        // const FKey = scene.keys.FKey

        // jump if pressing left or right

        // if(KEYS.LEFT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
        if(KEYS.LEFT.isDown && this.stateFlag == true) {

            grandson.direction = 'left'
            // this.jump = true
            // this.doJump(scene, grandson)
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown && this.stateFlag == true) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }

        // grab gun if shift clicked and enough guns
        if(KEYS.SHIFT.isDown && scene.gunCount > 0) {
            this.stateMachine.transition('shoot')
            return
        }
    }

}

