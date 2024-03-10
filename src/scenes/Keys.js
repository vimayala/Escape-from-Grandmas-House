/*  Extracted from Nathan Altice's Burger Boss repo
    Keys is a persistent scene that allows keyboard input to be abstracted across all subsequent scenes.
    Code solution from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6  */

class Keys extends Phaser.Scene {
    constructor() {
        super('sceneKeys')
    }

    preload() {
        this.load.audio('toy-gun1', './assets/356906-FGF-GunShot-DryFire-FoamGun4-MediumChamber-SilentThud3-96k.wav')
        this.load.audio('toy-gun2', './assets/356914-FGF-GunShot-DryFire-FoamGun15-MediumChamber-SpringRecoil5-96k.wav')
        this.load.audio('ouch', './assets/470444-Mature_Female_Expressing_Pain_Ow_2_55.wav')
        this.load.audio('jump', './assets/542312-zapsplat-cartoon-spring-boing-jaw-harp-short-60817.wav')


        this.load.bitmapFont('blockFont', './assets/bigblocks.png', './assets/bigblocks.xml')
        this.load.bitmapFont('blocko', './assets/blocko.png', './assets/blocko.xml')
        this.load.bitmapFont('pinkBlocko', './assets/pinkblocko.png', './assets/pinkblocko.xml')


        this.load.image('livingroom', './assets/EscapeLivingRoom.png')
        this.load.image('gameframe', './assets/gameframe.png')
        this.load.image('purple', './assets/purple.png')
        this.load.image('street', './assets/street.png')
        this.load.image('button', './assets/button.png')              // buttons
        this.load.image('up', './assets/up.png')                  
        this.load.image('down', './assets/down.png')
        this.load.image('dart', './assets/dart.png')

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

        this.load.spritesheet("grandma", "./assets/granny.png", {
            frameWidth: 290,
            frameHeight: 350,
            startFrame: 0,
            endFrame: 17
        })
        this.load.spritesheet("grandson", "./assets/grandson.png", {
            frameWidth: 200,
            frameHeight: 250,
            startFrame: 0,
            endFrame: 29
        })

        this.load.spritesheet("heart", "./assets/hearts.png",{
            frameWidth: 480,
            frameHeight: 510,
            startFrame: 0,
            endFrame: 2
        })

    }

    create() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            JUMP:   KeyCodes.SPACE,
            LEFT:   KeyCodes.LEFT,
            RIGHT:  KeyCodes.RIGHT,
            SHIFT:  KeyCodes.SHIFT,
            SPACE: KeyCodes.SPACE,
            S: KeyCodes.S
        })
        
        // launch next scene so it will run concurrently with this one
        this.scene.launch('menuScene')
    }
}