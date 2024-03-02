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

        this.load.spritesheet("grandma", "./assets/grandma.png", {
            frameWidth: 400,
            frameHeight: 400,
            startFrame: 0,
            endFrame: 2
        })
        this.load.spritesheet("grandson", "./assets/grandson.png", {
            frameWidth: 300,
            frameHeight: 400,
            startFrame: 0,
            endFrame: 2
        })

    }

    create() {
        this.anims.create({
            key: 'trash-stinky',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('trash-stinks', {
                start: 0,
                end: 3
            })
        })

        this.anims.create({
            key: 'walking',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('duck-walk', {
                start: 0,
                end: 11
            })
        })

        this.anims.create({
            key: 'idle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('duck-idle', {
                start: 0,
                end: 8
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

        this.clouds = this.add.tileSprite(0, 0, 14400, 9600, 'clouds').setOrigin(0,0).setScale(0.05)
        this.box = this.add.image(game.config.width/2, game.config.height/2 + borderPadding + borderUISize, 'blue').setScale(0.65, 0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 15, 'Beyond the Pond', menuConfig).setOrigin(0.5)

        menuConfig.fontSize = '18px'
        menuConfig.color = '#000000'
        menuConfig.backgroundColor = '#FFFFFF00'

        var height = game.config.height/2 - borderUISize - borderPadding

        this.begin = this.add.image(game.config.width/2, height + 65, 'frog-button').setScale(0.1)
        this.controls = this.add.image(game.config.width/2, height + 126, 'button').setScale(0.1)
        this.credits = this.add.image(game.config.width/2, height + 175, 'button').setScale(0.1)

        this.begin.setInteractive({
            useHandCursor: true
        })
        this.controls.setInteractive({
            useHandCursor: true
        })
        this.credits.setInteractive({
            useHandCursor: true
        })

        this.add.text(game.config.width/2, height + 75, 'Play', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, height + 126, 'Controls', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, height + 175, 'Credits', menuConfig).setOrigin(0.5)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        
        this.mySong = this.sound.add('waiting', {loop: true, volume: 0.8})
        this.mySong.play()

        this.begin.on('pointerdown', () => {
            this.mySong.stop()
            this.sound.play('click')
            this.scene.start('playScene') 
        })
        this.controls.on('pointerdown', () => {
            this.mySong.stop()
            this.sound.play('click')
            this.scene.start('controlScene') 
        })
        this.credits.on('pointerdown', () => {
            // play sfx
            this.mySong.stop()
            this.sound.play('click')
            this.scene.start('creditsScene') 
        })
    }

    update() {
        this.clouds.tilePositionX += 4
    }
}