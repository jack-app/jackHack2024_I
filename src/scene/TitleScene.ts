export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  preload() {
    // 画像をロードする
    this.load.image("background_start", "assets/background_start.png");
    this.load.image("button_play", "assets/button_play.png");
  }

  create() {
    const { width, height } = this.game.canvas;

    // 背景を追加
    const background_start = this.add
      .image(width / 2, height / 2, "background_start")
      .setOrigin(0.5);
    // 背景画像の大きさを合わせる
    background_start.displayWidth = width;
    background_start.displayHeight = height;

    const button_play = this.add
      .image(width / 2, height / 1.5, "button_play")
      .setOrigin(0.5);
    // ボタンのサイズを調整する
    const buttonWidth = 200;
    const buttonHeight = 100;
    button_play.setDisplaySize(buttonWidth, buttonHeight);

    // buttonをクリックできるように設定
    button_play.setInteractive({
      useHandCursor: true, // マウスオーバーでカーソルが指マークになる
    });

    // buttonをクリックしたらMainSceneに遷移
    button_play.on("pointerdown", () => {
      this.scene.start("main", { timelineID: "start" });
    });

    /*
    const rule = this.add.text(width/2,height/2+120,"How To Play",{fontSize:35}).setOrigin(0.5)
    // ruleをクリックできるように設定
    rule.setInteractive({
      useHandCursor: true // マウスオーバーでカーソルが指マークになる
    });

    // ruleをクリックしたらルール画面に遷移
    rule.on('pointerdown',() => {

    });
    */
  }
}
