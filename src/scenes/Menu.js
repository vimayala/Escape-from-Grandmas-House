class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.audio('collect', './assets/zapsplat_multimedia_game_sound_collect_treasure_coin_001_40559.mp3')
        this.load.audio('ping', './assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_002_49762.mp3')
        this.load.audio('click', './assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_001_49806.mp3')
        this.load.audio('game-over', './assets/zapsplat_multimedia_game_sound_error_lose_thud_negative_001_74526.mp3')

        this.load.image('livingroom', './assets/EscapeLivingRoom.png')
        this.load.image('button', './assets/button.png')              // buttons
        this.load.image('up', './assets/up.png')                  
        this.load.image('down', './assets/down.png')

        this.load.spritesheet('lives', './assets/lives.png', {
            frameWidth: 960,
            frameHeight: 320,
            startFrame: 0,
            endFrame: 2
        })

        this.load.spritesheet('menu', "./assets/menu.png",{
            frameWidth: 1236,
            frameHeight: 873,
            startFrame: 0,
            endFrame: 36
        })

        this.load.spritesheet("grandma", "./assets/grandma.png", {
            frameWidth: 400,
            frameHeight: 400,
            startFrame: 0,
            endFrame: 7
        })
        this.load.spritesheet("grandson", "./assets/grandson.png", {
            frameWidth: 200,
            frameHeight: 250,
            startFrame: 0,
            endFrame: 23
        })

    }

    create() {
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
            key: 'chasing',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'shot',
            frameRate: 2,
            // repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 2,
                end: 5
            })
        })
        this.anims.create({
            key: 'kissing',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandma', {
                start: 6,
                end: 8
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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 2,
                end: 3
            })
        })
    
        this.anims.create({
            key: 'running-left',
            frameRate: 15,
            repeat: 0,
            // frames: this.anims.generateFrameNumbers('grandson', {
            //     start: 4,
            //     end: 6
            // })
            frames: this.anims.generateFrameNumbers('grandson', {
                frames: [4, 5, 6, 6, 6, 5, 4]
            })
        })

        this.anims.create({
            key: 'running-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 7,
                end: 9
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
            key: 'grabGun-left',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: 'holdGun-left',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 20,
                end: 21
            })
        })

        this.anims.create({
            key: 'shootGun-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 22,
                end: 23
            })
        })
        
        this.anims.create({
            key: 'grabGun-right',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 24,
                end: 25
            })
        })

        this.anims.create({
            key: 'holdGun-right',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 26,
                end: 27
            })
        })

        this.anims.create({
            key: 'shootGun-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('grandson', {
                start: 28,
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

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        

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
        if(keySPACE.isDown) {
            this.scene.start('playScene')
        }

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