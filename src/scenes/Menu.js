class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {

        // grab keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

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
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 4,
                end: 7
            })
        })

        this.anims.create({
            key: 'shot-right',
            frameRate: 2,
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
            repeat: 0,
            // frames: this.anims.generateFrameNumbers('grandson', {
            //     start: 4,
            //     end: 6
            // })
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [4, 5, 6, 5, 4, 0]
            })
        })

        this.anims.create({
            key: 'jumping-right',
            frameRate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [7, 8, 9, 8, 7, 1]

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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 12,
                end: 14
            })
        })

        this.anims.create({
            key: 'kissed-right',
            frameRate: 6,
            repeat: -1,
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
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 23,
                end: 23
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
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 29,
                end: 29
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


        // this.begin.setInteractive({
        //     useHandCursor: true
        // })
        // this.controls.setInteractive({
        //     useHandCursor: true
        // })
        // this.credits.setInteractive({
        //     useHandCursor: true
        // })

        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        

        // this.menu.play('startup')

        this.playMenu()
        this.menu.play("startup").once('animationcomplete', () => {
            this.playMenu()
        })


        // this.begin.on('pointerdown', () => {
        //     this.mySong.stop()
        //     this.sound.play('click')
        //     this.scene.start('playScene') 
        // })
        // this.controls.on('pointerdown', () => {
        //     this.mySong.stop()
        //     this.sound.play('click')
        //     this.scene.start('controlScene') 
        // })
        // this.credits.on('pointerdown', () => {
        //     // play sfx
        //     this.mySong.stop()
        //     this.sound.play('click')
        //     this.scene.start('creditsScene') 
        // })
    }

    update() {
        const { KEYS } = this

        if(KEYS.SPACE.isDown) {
            this.scene.start('playScene')
        }

        // Credits if shift is clicked
        // if(KEYS.SHIFT.isDown) {
        //     this.scene.start('playScene')
        // }

        // Controls if ... is clicked
        // if(KEYS.SHIFT.isDown) {
        //     this.scene.start('playScene')
        // }

        // if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
        //     this.scene.start("playScene")
        // }

    }

    playMenu(){
        // this.menu.play("startup").once('animationcomplete', () => {
            this.menu.play("menuSet").once('animationcomplete', () => {
                this.menu.play("menu").once('animationcomplete', () => {
                    this.menu.play("menu").once('animationcomplete', () => {
                        this.playMenu()
                     })
                 })
             })
        // })
    }

}