export class EndingScene extends Phaser.Scene {
  private kanji?: string;
  private ids?: string;
  private score?: number;

  preload() {
    // 画像をロードする
    this.load.image("background_ending", "assets/background_ending.png");
    this.load.image("button_restart", "assets/button_restart.png");
    this.load.image("button_share", "assets/button_share.png");
    this.load.image("frame_ending", "assets/frame_ending.png");
  }

  constructor() {
    super("ending");
  }

  init(data: any) {
    // data = {
    // kanji: "龍",
    // ids:"⿰⿱⿱⿱⿱丶一丷一月&CDP-89B0"
    //  }
    this.kanji = data.kanji;
    this.ids = data.ids;
    this.score = data.score;
  }

  create() {
    this.load.image(
      "1",
      "assets/pngtree-small-size-clothes-icon-png-image_4944491.png"
    );
    this.load.start();
    const { width, height } = this.game.canvas;
    let kanji: string = this.kanji!;
    let ids: string = this.ids!;
    const background_ending = this.add
      .image(width / 2, height / 2, "background_ending")
      .setOrigin(0.5);
    // 背景画像の大きさを合わせる
    background_ending.displayWidth = width;
    background_ending.displayHeight = height;
    const frame_ending = this.add
      .image(width / 2, 200, "frame_ending")
      .setOrigin(0.5);
    // 背景画像の大きさを合わせる
    frame_ending.displayWidth = 600;
    frame_ending.displayHeight = 350;
    //ボタンのサイズを設定
    const buttonWidth = 200;
    const buttonHeight = 100;

    this.add
      .text(width / 2, height / 2 - 190, kanji, {
        fontSize: 100,
        fontFamily: "simsun",
      })
      .setOrigin(0.5);

    ids = ids.replace(/&\w{3}-\w{4}/g, "★");
    this.add
      .text(width / 2, height / 2 - 90, ids, {
        fontSize: 45,
        fontFamily: "simsun",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 3, height / 2, "Score:", {
        fontSize: 35,
        fontFamily: "meiryo UI",
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2, String(this.score), {
        fontSize: 35,
        fontFamily: "meiryo UI",
      })
      .setOrigin(0.5);

    //リスタートボタンを追加
    const button_restart = this.add
      .image(width / 2, height / 2 + 130, "button_restart")
      .setOrigin(0.5);
    //リスタートボタンのサイズを設定
    button_restart.setDisplaySize(buttonWidth, buttonHeight);
    button_restart.setInteractive({
      useHandCursor: true,
    });
    button_restart.on("pointerdown", () => {
      this.scene.start("title"); // TitleSceneに遷移
    });
    //シェアボタンを追加
    const button_share = this.add
      .image(width / 2, height / 2 + 230, "button_share")
      .setOrigin(0.5);
    //シェアボタンのサイズを設定
    button_share.setDisplaySize(buttonWidth, buttonHeight);
    button_share.setInteractive({
      useHandCursor: true,
    });
    // 結果を共有するページに遷移
    button_share.on("pointerdown", () => {
      window.alert("甘いって。自分の手でシェアしないと。");
    });
  }
}
