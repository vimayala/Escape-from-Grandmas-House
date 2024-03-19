class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)

        this.add.bitmapText(game.config.width / 2, game.config.height / 8 , 'pinkblocko',`Escape from Grandma's House Credits`, 52).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 5 , 'darkBlueBlocko',`Game Adaptation from The Simpsons`, 36).setOrigin(0.5)

        this.add.bitmapText(game.config.width / 2, game.config.height / 4 , 'whitePixel', 'Visual assets created on Resprite', 56).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 3.25, 'whitePixel', 'Sound Effects and Music from', 56).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2.75 , 'whitePixel', '- Envato Elements', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2.45 , 'whitePixel', '- Orange Free Sounds', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2.2125 , 'whitePixel', '- Zapsplat', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2.025 , 'whitePixel', '- Pixabay', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.87 , 'whitePixel', '- Uppbeat', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.75 , 'whitePixel', '- Soundsnap', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.65, 'whitePixel', '- Mixkit', 48).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.5375, 'whitePixel', 'Fonts from DaFont', 56).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.4, 'whitePixel', 'Code credits provided in files', 52).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.3, 'whitePixel', 'including from Nathan Altice and Phaser Examples', 52).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 1.2, 'whitePixel', 'Thank you Yasveck Duran Ramirez for being my test monkey :P', 50).setOrigin(0.5)

        this.menuButton = this.add.image(game.config.width / 2.15, game.config.height / 1.0575, 'smallButton').setScale(0.1)
        this.menuLetter = this.add.bitmapText(game.config.width / 2.15, game.config.height / 1.07575 , 'whitePixel',`M`, 40).setOrigin(0.5)
        this.menuText = this.add.bitmapText(game.config.width / 1.85, game.config.height / 1.05 , 'pinkblocko',`Menu`, 36).setOrigin(0.5)

        this.heartsTopLeft = this.add.sprite(game.config.width / 5, game.config.height / 5.3, 'heart').setOrigin(0.5).setScale(0.125)
        this.heartsTopRight = this.add.sprite(game.config.width / 1.25, game.config.height / 5.3, 'heart').setOrigin(0.5).setScale(0.125)
        this.heartsTopLeft.play('hearts')
        this.heartsTopRight.play({key: 'hearts', startFrame: 1})

        // Assets created on Resprite
        // Sound FX from
        //      Envato Elements
        //      Orange Free Sounds
        //      Zapslapt
        //      Pixabay
        //      Uppbeat
        //      Soundsnap
        //      Mixkit
        // Fonts from Dafont
        // Code credits provided in files including Nathan Altice, < state machine >, Phaser 3 examples

        this.add.image(0, 0, 'gameframe').setOrigin(0).setScale(0.8)

        // Tween flashes buttons like arcade games and matches music tempo
        this.tweenFlash = this.tweens.chain({
            loop: -1,
            tweens: [
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText],
                    duration: 225,
                    alpha: 0,
                    ease: 'Stepped'
                },
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText],
                    duration: 225,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText],
                    duration: 200,
                    alpha: 1,
                    ease: 'Stepped'
                },
                {
                    targets: [this.menuButton, this.menuLetter, this.menuText],
                    duration: 200,
                    alpha: 0,
                    ease: 'Stepped',
                }
            ]
        })


    }

    update() {
        const { KEYS } = this

        if(KEYS.M.isDown) {
            this.scene.start('menuScene')
        }

    }
}