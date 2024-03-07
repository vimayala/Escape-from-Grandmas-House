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
            if(grandson.x > 280){
                this.jumpAnim(scene, grandson, 4, 0, -25, -30)
                this.jumpAnim(scene, grandson, 5, 70, -15, -40)
                this.jumpAnim(scene, grandson, 6, 150, -10, -20)
                // var endX = grandson.x
                this.jumpAnim(scene, grandson, 5, 230, -15, 30)
                this.jumpAnim(scene, grandson, 4, 300, -10, 40)
                this.jumpAnim(scene, grandson, 1, 370, -5, 20)
            }
        } 
        else {
            if(grandson.x < 680){
                this.jumpAnim(scene, grandson, 7, 0, 25, -20)
                this.jumpAnim(scene, grandson, 8, 70, 15, -10)
                this.jumpAnim(scene, grandson, 9, 150, 10, -10)
                this.jumpAnim(scene, grandson, 8, 230, 15, 10)
                this.jumpAnim(scene, grandson, 7, 30, 10, 10)
                this.jumpAnim(scene, grandson, 0, 370, 5, 20)
            }
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
            callback: () => {grandson.setFrame(frame), grandson.x += x; grandson.y += y},
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

        grandson.anims.play(`grabGun-${grandson.direction}`)
        grandson.anims.play(`holdGun-${grandson.direction}`)
        // grandson.anims.play(`shootGun-${grandson.direction}`)
        // grandson.anims.play(`shootGun-${grandson.direction}`)

        grandson.anims.play(`shootGun-before-${grandson.direction}`).once('animationcomplete', () => {
            // Uses frame number so only executed once            
            if(grandson.frame.name === 22 || grandson.frame.name === 28){

                // if left, use one dart spawn eq else use other
                // ideally, you would use dart sprite size
                let factor = 0
                if(grandson.direction === 'left'){
                    factor = -48
                }
                else{
                    factor = 48
                }

                scene.dartCreate(grandson, factor, 10)  
                
                // maybe wait 3 seconds before shooting another?? bc issues caused by numerous darts shooting          


            }
            grandson.anims.play(`shootGun-after-${grandson.direction}`)
        })

    }

    execute(scene, grandson) {
        const { KEYS } = scene
        // console.log(grandson.frame.name)

        // if(KEYS.LEFT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
        if(KEYS.LEFT.isDown && (grandson.frame.name === 23 || grandson.frame.name === 29 || grandson.frame.name === 0 || grandson.frame.name === 1)) {

            grandson.direction = 'left'
            // this.jump = true
            // this.doJump(scene, grandson)
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown  && (grandson.frame.name === 23 || grandson.frame.name === 29  || grandson.frame.name === 0 || grandson.frame.name === 1)) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.SHIFT.isDown  && (grandson.frame.name === 23 || grandson.frame.name === 29  || grandson.frame.name === 0 || grandson.frame.name === 1)) {
            this.stateMachine.transition('shoot')
            return
        }
    }

}

