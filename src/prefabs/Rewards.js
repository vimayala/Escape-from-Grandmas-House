// taken from my Beyond the Pond Fruit.js
// structure taken from Prof Nathan Altice's Paddle Parkour, reimplemented to suit my game and needs
class Reward extends Phaser.GameObjects.Sprite {
    constructor(scene, image, speed) {

        var x = Phaser.Math.RND.between(game.config.width / 1.25, game.config.width);
        var y = Phaser.Math.RND.between(275, height / 1.525);

        super(scene, x, y, image, speed)
        scene.add.existing(this)
        this.image = image
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system

        this.newReward = true
        this.speed = speed
    }

    // Move across screen while still in range
    // Add another reward if this reward's x is past width / 1.5
    update () {
        this.x -= this.speed
        if(this.newReward && this.x < game.config.width / 1.5) {
            this.parentScene.rewardCount += 1 
            this.parentScene.addReward()
            this.newReward = false

        }
        if(this.x < -this.width) {
            this.destroy()
            this.parentScene.rewardCount -= 1

        }
    }

    reset() {
        this.x = game.config.width
    }
}