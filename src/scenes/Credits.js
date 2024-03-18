class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.purpleScreen = this.add.tileSprite(0, 0, 2472, 1746, 'purple').setOrigin(0,0).setScale(0.4)


        // Idea from The Simpsons Season 2, Episode 1
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
    }

    update() {
        // add a return to menu or play
    }
}