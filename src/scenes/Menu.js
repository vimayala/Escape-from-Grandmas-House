class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {

        // Get keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        if(!music.isPlaying && gameOverFlag){
            playing = true
            music.play({loop: true, volume: 0.9})
        }
        // else{
        //     this.time.addEvent({ delay: 2500, callback: () => music.play({loop: true, volume: 0.9}), callbackScope: this});

        // }

        // Menu Animations
        this.anims.create({
            key: 'startup',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('menu', {
                start: 0,
                end: 5
            })
        })

        this.anims.create({
            key: 'menuSet',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('menu', {
                start: 6,
                end: 33
            })
        })

        this.anims.create({
            key: 'menu',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('menu', {
                start: 34,
                end: 36
            })
        })

        this.menu = this.add.sprite(width / 2, height / 2, 'menu').setScale(0.8)

        // Grandma Animations
        this.anims.create({
            key: 'chasing-left',
            frameRate: 3.5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 0,
                end: 1
            })
        })

        this.anims.create({
            key: 'chasing-right',
            frameRate: 3.5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 2,
                end: 3
            })
        })

        this.anims.create({
            key: 'shot-left',
            frameRate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 4,
                end: 7
            })
        })

        this.anims.create({
            key: 'shot-right',
            frameRate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 8,
                end: 11
            })
        })

        this.anims.create({
            key: 'kissing-left',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 12,
                end: 14
            })
        })

        this.anims.create({
            key: 'kissing-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 15,
                end: 17
            })
        })

        // Grandson Animations
        this.anims.create({
            key: 'idle-right',
            frameRate: 4.5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 0,
                end: 0
            })
        })

        this.anims.create({
            key: 'idle-left',
            frameRate: 4.5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'scared',
            frameRate: 4.5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 2,
                end: 3
            })
        })
    
        this.anims.create({
            key: 'jumping-left',
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [4, 5, 6, 5, 4]
            })
        })

        this.anims.create({
            key: 'jumping-right',
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [7, 8, 9, 8, 7]

            })
        })

        this.anims.create({
            key: 'mothballs',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 10,
                end: 10
            })
        })

        this.anims.create({
            key: 'kissed-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 12,
                end: 14
            })
        })

        this.anims.create({
            key: 'kissed-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 15,
                end: 17
            })
        })

        this.anims.create({
            key: 'grabGun-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: 'holdGun-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 20,
                end: 21
            })
        })

        this.anims.create({
            key: 'shootGun-before-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 22,
                end: 22
            })
        })
        
        this.anims.create({
            key: 'shootGun-after-right',
            frameRate: 4,
            repeat: 0,
            // frames: this.anims.generateFrameNumbers('grandson', {
            //     start: 23,
            //     end: 23
            // })
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [23, 23]
            })
        })

        this.anims.create({
            key: 'grabGun-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 24,
                end: 25
            })
        })

        this.anims.create({
            key: 'holdGun-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 26,
                end: 27
            })
        })

        this.anims.create({
            key: 'shootGun-before-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 28,
                end: 28
            })
        })

        this.anims.create({
            key: 'shootGun-after-left',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [29, 29]
            })
        })

        this.anims.create({
            key: 'hearts',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heart', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'skulls',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('skull', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'lips',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('lip', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'stars',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('star', {
                start: 0,
                end: 5
            })
        })

        let menuConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '48px', 
            backgroundColor: '#B1D5EF99', 
            color: '#FFFFFF',
            align: 'right', padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.gameFrame = this.add.image(width / 2 + 0.5, height / 2, 'gameframe').setScale(0.8)
        this.gameFrame.setDepth(2)

        this.spaceButton = this.add.image(game.config.width / 2.75, game.config.height / 1.125, 'button').setScale(0.1).setOrigin(0.5)
        this.spaceText = this.add.bitmapText(game.config.width / 2.75, game.config.height / 1.15 , 'whitePixel',`SPACE`, 48).setOrigin(0.5)
        this.controlText = this.add.bitmapText(game.config.width / 2, game.config.height / 1.112 , 'pinkblocko',`        to Continue`, 48).setOrigin(0.5)


        this.cButton = this.add.image(game.config.width / 2.75, game.config.height / 1.055, 'smallButton').setScale(0.1).setOrigin(0.5)
        this.cText = this.add.bitmapText(game.config.width / 2.75, game.config.height / 1.075 , 'whitePixel',`C`, 48).setOrigin(0.5)
        this.creditText = this.add.bitmapText(game.config.width / 1.925, game.config.height / 1.047 , 'pinkblocko',`        to view credits`, 36).setOrigin(0.5)


        this.menu.play("startup").once('animationcomplete', () => {

            this.playMenu()

        })

        this.tweenFlash = this.tweens.chain({
            loop: -1,
            tweens: [
                {
                    targets: [this.spaceButton, this.spaceText, this.controlText, this.cButton, this.cText, this.creditText],
                    duration: 225,
                    alpha: 0,
                    ease: 'Stepped'
                },
                {
                    targets: [this.spaceButton, this.spaceText, this.controlText, this.cButton, this.cText, this.creditText],
                    duration: 225,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.spaceButton, this.spaceText, this.controlText, this.cButton, this.cText, this.creditText],
                    duration: 200,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.spaceButton, this.spaceText, this.controlText, this.cButton, this.cText, this.creditText],
                    duration: 200,
                    alpha: 0,
                    ease: 'Stepped',
                }
            ]
        })

    }

    update() {
        const { KEYS } = this
        if(!music.isPlaying && gameOverFlag){
            playing = true
            music.play({loop: true, volume: 0.9})
        }
        if(KEYS.SPACE.isDown) {
            this.scene.start('playControlScene')
            // this.scene.start('gameOverScene')
        }

        // Credits if C is clicked
        if(KEYS.C.isDown) {
            this.scene.start('creditsScene')
        }

        // Controls if shift is clicked
        // Hidden, more for playtesting and debug/grader convenience
        if(KEYS.SHIFT.isDown) {
            this.scene.start('controlsScene')
        }

    }

    playMenu(){
        this.menu.play("menuSet").once('animationcomplete', () => {
            this.menu.play("menu").once('animationcomplete', () => {
                this.menu.play("menu").once('animationcomplete', () => {
                    this.playMenu()
                    })
                })
            })
    }

}