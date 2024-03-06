// structure taken from Prof Nathan Altice's Paddle Parkour, reimplemented to suit my game and needs
class Dart extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame, direction)
        scene.add.existing(this)
        // this.texture = 'dart'
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.speed = speed
        this.directionFactor = 1
        
        if(direction === 'left'){
            this.directionFactor *= -1
            this.flipX = true               // check if it flips
        }





        // this.dart = scene.add.sprite(grandson.x/2, grandson.y / 2, 'dart').setScale(0.075)

        // this.dart.x = grandson.y - grandson.width / 2 * direction
        // this.dart.y = grandson.x - grandson.height / 2


    }

    update () {
        // this.x -= this.speed * this.directionFactor
        // if(this.x < -this.width || this.x < 0) {
        //     this.destroy()
        // }
    }

    // reset() {
    //     this.x = game.config.width
    // }
}