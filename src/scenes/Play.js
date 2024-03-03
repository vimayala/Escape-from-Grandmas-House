class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    // preload() {
    //     this.load.audio('collect', './assets/zapsplat_multimedia_game_sound_collect_treasure_coin_001_40559.mp3')
    //     this.load.audio('ping', './assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_002_49762.mp3')
    //     this.load.audio('click', './assets/zapsplat_multimedia_game_sound_childrens_collect_grab_single_norification_ping_soft_001_49806.mp3')
    //     this.load.audio('game-over', './assets/zapsplat_multimedia_game_sound_error_lose_thud_negative_001_74526.mp3')

    //     this.load.image('livingroom', './assets/EscapeLivingRoom.png')
    //     this.load.image('button', './assets/button.png')              // buttons
    //     this.load.image('up', './assets/up.png')                  
    //     this.load.image('down', './assets/down.png')

    //     this.load.spritesheet('lives', './assets/lives.png', {
    //         frameWidth: 960,
    //         frameHeight: 320,
    //         startFrame: 0,
    //         endFrame: 2
    //     })

    //     this.load.spritesheet("grandma", "./assets/grandma.png", {
    //         frameWidth: 400,
    //         frameHeight: 400,
    //         startFrame: 0,
    //         endFrame: 7
    //     })
    //     this.load.spritesheet("grandson", "./assets/grandson.png", {
    //         frameWidth: 300,
    //         frameHeight: 400,
    //         startFrame: 0,
    //         endFrame: 23
    //     })

    // }

    init() {
        // this.PLAYER_VELOCITY = 75
        // this.TRASH_SPEED = 2
        // this.SCROLL_SPEED = 1.75
        // this.difficulty = 0
        // this.last_score = 0
        // this.mode = 'easy'
        // this.obstacleSpawnDelay = 2500
    }

    create() {
        // borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)                                     
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)     
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)                                    
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  

        // images
        this.livingRoom = this.add.tileSprite(0, 0, 2472, 1746, 'livingroom').setOrigin(0,0).setScale(0.4)
        
        // this.p1duck = this.physics.add.sprite(150, game.config.height- borderUISize - borderPadding - 200, 'duck-walk').setOrigin(0.5, 0).setScale(1.4)
       
        // this.p1duck.setCircle(this.p1duck.width / 2.8).setOffset(this.p1duck.width / 6, this.p1duck.width / 20)

        // // Grandma Animations
        // this.anims.create({
        //     key: 'chasing',
        //     frameRate: 4,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandma', {
        //         start: 0,
        //         end: 1
        //     })
        // })
        // this.anims.create({
        //     key: 'shot',
        //     frameRate: 2,
        //     // repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandma', {
        //         start: 2,
        //         end: 5
        //     })
        // })
        // this.anims.create({
        //     key: 'kissing',
        //     frameRate: 4,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandma', {
        //         start: 6,
        //         end: 8
        //     })
        // })

        // // Grandson Animations
        // this.anims.create({
        //     key: 'scared',
        //     frameRate: 4.5,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 0,
        //         end: 2
        //     })
        // })
    
        // this.anims.create({
        //     key: 'jumping',
        //     frameRate: 6,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 3,
        //         end: 5
        //     })
        // })

        // this.anims.create({
        //     key: 'mothballs',
        //     frameRate: 6,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 6,
        //         end: 6
        //     })
        // })

        // this.anims.create({
        //     key: 'kissed',
        //     frameRate: 6,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 7,
        //         end: 9
        //     })
        // })

        // this.anims.create({
        //     key: 'grabGun',
        //     frameRate: 6,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 10,
        //         end: 11
        //     })
        // })

        // this.anims.create({
        //     key: 'holdGun',
        //     frameRate: 6,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 12,
        //         end: 13
        //     })
        // })

        // this.anims.create({
        //     key: 'shootGun',
        //     frameRate: 6,
        //     repeat: 0,
        //     frames: this.anims.generateFrameNumbers('grandson', {
        //         start: 14,
        //         end: 15
        //     })
        // })
        

        // keys defined
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        cursors = this.input.keyboard.createCursorKeys()

        // scoring
        playerScore = 0
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '24px', 
            backgroundColor: '#B1D5EFE0', 
            color: '#FFFFFF',
            align: 'left', padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 100
        }
        this.scoreDisplay = this.add.text(game.config.width - borderUISize, borderUISize + borderPadding * 2 - 50, 'Score: ', scoreConfig)
        scoreConfig.align = 'right'
        scoreConfig.fontSize = '30px'
        this.scoreLeft = this.add.text(borderUISize + borderPadding - 40 , borderUISize + borderPadding * 2 - 20, `${playerScore}`, scoreConfig)
        this.gameOver = false
        scoreConfig.fixedWidth = 0
    
        this.lives = this.add.sprite(155, borderUISize + borderPadding - 20, 'lives').setScale(0.1)


        this.kid = new Grandson(this, width / 2, height / 1.525, 'grandson', 0)
        this.kid.setScale(0.8)
        // this.kid = this.add.sprite(width / 2, height / 1.75, 'grandson').setScale(0.8)
        this.grandma = this.add.sprite(width / 1.65, height / 1.65, 'grandma').setScale(0.8)

        this.grandma.play('chasing')
        // this.kid.x += 45
        // this.kid.y-=30
        // this.kid.play('˛scared')


    }

    update() {
        this.kid.update()
        // let playerVector = new Phaser.Math.Vector2(0, 0)
        // if(this.p1duck.y >= 135){
        //     if(cursors.up.isDown){
        //         playerVector.y = -1
        //     }
        // }
        // if(this.p1duck.y <= 400){
        //     if(cursors.down.isDown){
        //         playerVector.y = 1
        //     }
        // }
        // playerVector.normalize()
        // this.p1duck.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    }

}