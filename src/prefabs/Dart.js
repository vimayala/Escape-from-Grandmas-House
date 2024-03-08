// structure taken from Prof Nathan Altice's Paddle Parkour, reimplemented to suit my game and needs
class Dart extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, speed) {
        super(scene, x, y, texture, frame, direction)
        scene.add.existing(this)
        // this.texture = 'dart'
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setScale(0.075)

        this.body.setImmovable()


        this.speed = speed
        this.direction = direction
        this.directionFactor = 1
        
        if(direction === 'left'){
            this.directionFactor *= -1
            this.flipX = true
        }

    }

    update () {
        this.x += this.speed * this.directionFactor
        if(this.x > 920 || this.x < 100) {
            this.destroy()
        }
    }

    // reset() {
    //     this.x = game.config.width
    // }
}