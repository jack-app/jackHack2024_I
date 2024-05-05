export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  preload() {
    // 画像をロードする
    this.load.image('background_start', 'assets/background_start.png');
    this.load.image('button_play', 'assets/button_play.png');
    this.load.image('button_rule', 'assets/button_rule.png');
  }

  create() {
    const { width, height } = this.game.canvas;

    // 背景を追加
    const background_start =this.add.image(width / 2, height / 2, 'background_start').setOrigin(0.5);
    // 背景画像の大きさを合わせる
    background_start.displayWidth = width;
    background_start.displayHeight = height;
    
    const button_play = this.add.image(width / 2, height / 2 + 100, 'button_play').setOrigin(0.5);
    // ボタンのサイズを調整する
    const buttonWidth = 200;
    const buttonHeight = 100;
    button_play.setDisplaySize(buttonWidth, buttonHeight);
   
    // buttonをクリックできるように設定
    button_play.setInteractive({
      useHandCursor: true  // マウスオーバーでカーソルが指マークになる
    });

    // buttonをクリックしたらMainSceneに遷移
    button_play.on('pointerdown', () => {
      this.scene.start('main', { timelineID: 'start' })});

    
    const button_rule = this.add.image(width / 2, height / 2 + 200, 'button_rule').setOrigin(0.5);
    button_rule.setDisplaySize(buttonWidth, buttonHeight);
    // ruleをクリックできるように設定
    button_rule.setInteractive({
      useHandCursor: true // マウスオーバーでカーソルが指マークになる
    });

    // ruleをクリックしたらルール画面に遷移
    button_rule.on('pointerdown',() => {
      this.scene.launch('popup');
    });
    
    
    
  }
}
