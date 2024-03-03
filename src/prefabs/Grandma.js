class Grandma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
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