class Grandson extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        // Add grandson to scene with physics
        super(scene, x, y, texture, frame, direction)
        scene.add.existing(this)        
        scene.physics.add.existing(this)

        // Change collision box to be legs and up
        this.body.setSize(this.width / 4, this.height / 1.5)
        this.body.setOffset(this.width/2.85, this.height/5.25)

        // Adjust custom grandson properties
        this.body.setCollideWorldBounds(true)
        this.direction = direction 
        this.dartCooldown = true
        
        // Begin scene by playing scared animation
            /* Might need to change to a state */
        this.play('scared')

        // Add custom grandson state machine
        scene.grandsonFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            shoot: new ShootGunState(),
            kissed: new KissedState(),
            superJump: new SuperJumpState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM

    }
}

// Grandson Idle State
class IdleState extends State {
    // Play idle animation for his direction
    enter(scene, grandson) {
        grandson.anims.play(`idle-${grandson.direction}`)
    }

    // Allow transition to jump (left or right) or shooting
    execute(scene, grandson) {
        const { KEYS } = scene

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
        if(KEYS.SHIFT.isDown) {
            this.stateMachine.transition('shoot')
            return
        }
        /* Temp for testing */
        // if(KEYS.SPACE.isDown && scene.allowSuperJump == true && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
        //     this.stateMachine.transition('superJump')
        //     return
        // }
    }
}

// Grandson's Jump State
class JumpState extends State {
    // To simulate jump, play frame by frame with delayed called
    enter(scene, grandson) {


        if(grandson.direction === 'left'){
            if(grandson.x > 200){
                scene.sound.play('jump', {rate: 1.16})
                this.jumpAnim(scene, grandson, 4, 0, -25, -30)
                this.jumpAnim(scene, grandson, 5, 70, -15, -40)
                this.jumpAnim(scene, grandson, 6, 150, -10, -20)
                this.jumpAnim(scene, grandson, 5, 230, -15, 30)
                this.jumpAnim(scene, grandson, 4, 300, -10, 40)
                this.jumpAnim(scene, grandson, 1, 370, -5, 20)
            }
        } 
        else {
            if(grandson.x < 760){
                scene.sound.play('jump', {rate: 1.16})
                this.jumpAnim(scene, grandson, 7, 0, 25, -20)
                this.jumpAnim(scene, grandson, 8, 70, 15, -10)
                this.jumpAnim(scene, grandson, 9, 150, 10, -10)
                this.jumpAnim(scene, grandson, 8, 230, 15, 10)
                this.jumpAnim(scene, grandson, 7, 30, 10, 10)
                this.jumpAnim(scene, grandson, 0, 370, 5, 20)
            }
        }
    }

    // Allow transition back into jump once animation done or shoot state
    execute(scene, grandson) {
        const { KEYS } = scene
        // jump if pressing left or right
        if(KEYS.LEFT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1 || grandson.frame.name === 23 || grandson.frame.name === 29)) {
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1 || grandson.frame.name === 23 || grandson.frame.name === 29)) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.SHIFT.isDown &&  (grandson.frame.name === 0 || grandson.frame.name === 1)) {
            this.stateMachine.transition('shoot')
            return
        }

        if(KEYS.SPACE.isDown && scene.allowSuperJump == true && (grandson.frame.name === 0 || grandson.frame.name === 1)) {
            this.stateMachine.transition('superJump')
            return
        }
    }

    // Function to delay animation calls for custom playing jump animation with direction
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

class SuperJumpState extends State {
    // To simulate jump, play frame by frame with delayed called
    enter(scene, grandson) {
        scene.sound.play('jump', {rate: 1.16})

        if(grandson.direction === 'left'){
            if(grandson.x > 280){
                this.jumpAnim(scene, grandson, 4, 0, -55, -30)
                this.jumpAnim(scene, grandson, 5, 70, -45, -40)
                this.jumpAnim(scene, grandson, 6, 150, -40, -20)
                this.jumpAnim(scene, grandson, 5, 230, -45, 30)
                this.jumpAnim(scene, grandson, 4, 300, -40, 40)
                this.jumpAnim(scene, grandson, 1, 370, -25, 20) 
            }
        } 
        else {
            if(grandson.x < 680){
                this.jumpAnim(scene, grandson, 7, 0, 55, -30)
                this.jumpAnim(scene, grandson, 8, 70, 45, -40)
                this.jumpAnim(scene, grandson, 9, 150, 40, -20)
                this.jumpAnim(scene, grandson, 8, 230, 45, 30)
                this.jumpAnim(scene, grandson, 7, 300, 40, 40)
                this.jumpAnim(scene, grandson, 0, 370, 25, 20) 
            }
        }
    }

    // Allow transition back into jump once animation done or shoot state
    execute(scene, grandson) {
        scene.bonus = 1
        scene.shootCount = 0
        const { KEYS } = scene


        // jump if pressing left or right

        if(KEYS.LEFT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1 || grandson.frame.name === 23 || grandson.frame.name === 29)) {
            scene.allowSuperJump = false
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown && (grandson.frame.name === 0 || grandson.frame.name === 1 || grandson.frame.name === 23 || grandson.frame.name === 29)) {
            scene.allowSuperJump = false
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.SHIFT.isDown &&  (grandson.frame.name === 0 || grandson.frame.name === 1 || grandson.frame.name === 23 || grandson.frame.name === 29)) {
            scene.allowSuperJump = false
            this.stateMachine.transition('shoot')
            return
        }
    }

    // Function to delay animation calls for custom playing jump animation with direction
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

// Grandson's Shoot State
class ShootGunState extends State {
    // Play animations one after another
    // Once complete, create dart
    enter(scene, grandson) {

        /* play grab and hold if beginning ? */


        // grandson.anims.play(`grabGun-${grandson.direction}`).once('animationcomplete', () => {
            this.dartCooldown = true
            this.allowJump = false
            grandson.anims.play(`holdGun-${grandson.direction}`).once('animationcomplete', () => {
                grandson.anims.play(`shootGun-before-${grandson.direction}`).once('animationcomplete', () => {
                    // Uses frame number so only executed once            
                    if(grandson.frame.name === 22 || grandson.frame.name === 28){
        
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
                    grandson.anims.play(`shootGun-after-${grandson.direction}`).once('animationcomplete', () =>{
                        this.dartCooldown = false
                    })
                    this.allowJump = true
                })
            })
        // })
        
        

    }

    // Once dart launched, allow transition to another state
    execute(scene, grandson) {
        const { KEYS } = scene

        // If transitions cause issues, reimplement
            //   && (grandson.frame.name === 23 || grandson.frame.name === 29  || grandson.frame.name === 0 || grandson.frame.name === 1)
        if(KEYS.LEFT.isDown && this.dartCooldown === false) {
            grandson.direction = 'left'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.RIGHT.isDown && this.dartCooldown === false) {
            grandson.direction = 'right'
            this.stateMachine.transition('jump')
            return
        }

        if(KEYS.SHIFT.isDown && this.dartCooldown === false) {
            this.stateMachine.transition('shoot')
            return
        }

        if(KEYS.SPACE.isDown && scene.allowSuperJump == true) {
            this.stateMachine.transition('superJump')
            return
        }
    }

}
class KissedState extends State {
    enter(scene, grandson){
        // scene.grandmaFSM.transition('kissing')
        // swap directions
        scene.sound.play('grandmaKiss', {rate: 1.75, volume: 1})
        grandson.anims.play(`kissed-right`).once('animationcomplete', () => {
            scene.sound.play('grandmaKiss', {rate: 1.75, volume: 1})
            grandson.anims.play(`kissed-left`).once('animationcomplete', () => {
                scene.sound.play('grandmaKiss', {rate: 1.75, volume: 1})
                grandson.anims.play(`kissed-right`).once('animationcomplete', () => {
                    scene.sound.play('grandmaKiss', {rate: 1.75, volume: 1})
                    grandson.anims.play(`kissed-left`).once('animationcomplete', () => {
                        scene.scene.start('gameOverScene')
                    })
                })
            })
        })
    }
    execute(scene, grandson){

    }
}
