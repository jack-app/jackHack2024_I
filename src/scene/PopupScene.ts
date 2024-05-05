export class PopupScene extends Phaser.Scene {
    constructor() {
        super({ key: 'popup', active: false });
    }

    preload() {
        // 画像をロードする
        this.load.image('background_main', 'assets/background_main.png');
        this.load.image('button_exit', 'assets/button_exit.png');
    }

    create() {
        const { width, height } = this.game.canvas;
        const background_start =this.add.image(width / 2, height / 2, 'background_main').setOrigin(0.5);
        // 背景画像の大きさを合わせる
        background_start.displayWidth = width;
        background_start.displayHeight = height;
        // ポップアップのテキストを追加
        const text1 = this.add.text(width / 2, height / 2-200, '厳しいって！', {fontSize:35,fontFamily:"meiryo UI"});
        const text2 = this.add.text(width / 2, height / 2-100, '弱いって！', {fontSize:35,fontFamily:"meiryo UI"});
        const text3 = this.add.text(width / 2, height / 2, 'モテないって！', {fontSize:35,fontFamily:"meiryo UI"});
        // ポップアップを閉じるボタンを追加
        const closeButton =  this.add.image(width / 2, height / 2 + 200, 'button_exit').setOrigin(0.5);
        const buttonWidth = 200;
        const buttonHeight = 100;
        closeButton.setDisplaySize(buttonWidth, buttonHeight);
        closeButton.setInteractive();
        closeButton.on('pointerdown', () => {
            this.scene.stop('popup');
        });
    }
}