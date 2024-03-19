/*  Extracted from Nathan Altice's Burger Boss repo
    Keys is a persistent scene that allows keyboard input to be abstracted across all subsequent scenes.
    Code solution from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6  */

class Keys extends Phaser.Scene {
    constructor() {
        super('sceneKeys')
    }

    preload() {
        // Preload audios, images, fonts, and spritesheets 
        this.load.audio('scaryMusic', './assets/blockman-kevin-macleod-main-version-01-58-8001.mp3')
        this.load.audio('scaryMusic2', './assets/blockman-kevin-macleod-main-version-01-58-8001.mp3')
        this.load.audio('actionMusic', './assets/2021-10-19_-_Funny_Bit_-_www.FesliyanStudios.com.mp3')
        this.load.audio('toy-gun1', './assets/356906-FGF-GunShot-DryFire-FoamGun4-MediumChamber-SilentThud3-96k.wav')
        this.load.audio('toy-gun2', './assets/356914-FGF-GunShot-DryFire-FoamGun15-MediumChamber-SpringRecoil5-96k.wav')
        this.load.audio('ouch', './assets/470444-Mature_Female_Expressing_Pain_Ow_2_55.wav')
        this.load.audio('jump', './assets/542312-zapsplat-cartoon-spring-boing-jaw-harp-short-60817.wav')
        this.load.audio('damage', './assets/zapsplat_cartoon_hit_thud_thump_003_95554.mp3')
        this.load.audio('powerup', './assets/video-game-power-up-jam-fx-1-00-03-trimmed.m4a')
        this.load.audio('denied', './assets/arcade-game-retro-8-bit-denied-smartsound-fx-1-00-00.mp3')
        this.load.audio('reward', './assets/8bit-coin-sound-effect.mp3')
        this.load.audio('partialwinner', './assets/mixkit-final-level-bonus-2061-trimmed.wav')
        this.load.audio('winner', './assets/mixkit-final-level-bonus-2061.wav')
        this.load.audio('hurt', './assets/hurt_c_08-102842.mp3')
        this.load.audio('death1', './assets/death-trimmed.m4a')
        this.load.audio('death2', './assets/arcade-game-retro-8-bit-losing-points-floor-model-1-00-00.mp3')
        this.load.audio('grandmaKiss', './assets/kiss-test-pixabay.wav')

        this.load.bitmapFont('blockFont', './assets/bigblocks.png', './assets/bigblocks.xml')
        this.load.bitmapFont('blocko', './assets/blocko.png', './assets/blocko.xml')
        this.load.bitmapFont('pinkblocko', './assets/pinkBlocko.png', './assets/pinkBlocko.xml')
        this.load.bitmapFont('darkBlueBlocko', './assets/darkBlueBlocko.png', './assets/darkBlueBlocko.xml')
        this.load.bitmapFont('whitePixel', './assets/whitePixel.png', './assets/whitePixel.xml')
        this.load.bitmapFont('purplePixel', './assets/grandchildDePixel.png', './assets/grandchildDePixel.xml')

        this.load.image('livingroom', './assets/EscapeLivingRoom.png')
        this.load.image('gameframe', './assets/gameframe.png')
        this.load.image('purple', './assets/purple.png')
        this.load.image('street', './assets/street.png')
        this.load.image('street1', './assets/street1.png')

        this.load.image('button', './assets/button.png')
        this.load.image('smallButton', './assets/smallButton.png')
        this.load.image('up', './assets/up.png')                  
        this.load.image('down', './assets/down.png')
        this.load.image('left', './assets/left.png')                  
        this.load.image('right', './assets/right.png')
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
        
        this.load.spritesheet("skull", "./assets/skulls.png",{
            frameWidth: 480,
            frameHeight: 510,
            startFrame: 0,
            endFrame: 2
        })

        this.load.spritesheet("lip", "./assets/lips.png",{
            frameWidth: 480,
            frameHeight: 510,
            startFrame: 0,
            endFrame: 2
        })

        this.load.spritesheet("star", "./assets/stars.png",{
            frameWidth: 480,
            frameHeight: 510,
            startFrame: 0,
            endFrame: 5
        })
    }

    create() {
        // Add music as global variables
        music = this.sound.add('scaryMusic')
        actionMusic = this.sound.add('actionMusic')

        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            LEFT:   KeyCodes.LEFT,
            RIGHT:  KeyCodes.RIGHT,
            SHIFT:  KeyCodes.SHIFT,
            SPACE: KeyCodes.SPACE,
            S: KeyCodes.S,
            UP: KeyCodes.UP,
            DOWN: KeyCodes.DOWN,
            M: KeyCodes.M,
            ENTER: KeyCodes.ENTER,
            C: KeyCodes.C,

        })
        
        // launch next scene so it will run concurrently with this one
        this.scene.launch('menuScene')
    }
}