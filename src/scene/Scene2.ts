import { MainSceneManager, OperationState } from "../class/MainSceneManager";

export class MainScene extends Phaser.Scene {
  private manager: MainSceneManager;

  constructor() {
    super("main");
    this.manager = MainSceneManager.getInstance();
  }

  preload() {
    // ロゴ画像だけは最初から表示したいので予めロード
    // Phaser3のロゴをlabs.phaser.ioから取得しているので、もし公開する際はこの部分は消してください
    this.load.image("background_main", "assets/background_main.png");
    this.load.image("buttonTop","assets/button_uekara.png")
    this.load.image("buttonRestore","assets/button_hukugen.png")
    this.load.image("buttonBottom","assets/button_shitakara.png")
    this.load.image("buttonComplete","assets/button_kansei.png")
    this.load.image("frame_ending", "assets/frame_ending.png");
    this.load.image("kanjiframe", "assets/kanjiframe.png")
  }

  create() {
    const { width, height } = this.game.canvas;
    const background = this.add
      .image(width / 2, height / 2, "background_main")
      .setOrigin(0.5);
    // 背景画像の大きさを合わせる
    background.setDisplaySize(width, height);


    const opState = this.manager.getOperationState();

    // =============================
    // 中央の文字列を作成
    // =============================
    const graphics = this.add.graphics().fillStyle(0x000000, 1);
    graphics.fillRect(width / 2-(370/2), height / 2+25 -(370/2), 370, 370);
    const kanjiframe = this.add
      .image(width / 2, height / 2+25, "kanjiframe")
      .setOrigin(0.5);
    kanjiframe.setDisplaySize(400, 400);
    
    const kanji = this.manager.getKanji();
    this.add
      .text(width / 2, height / 2 + 50, kanji, { fontSize: "200px" })
      .setOrigin(0.5)
      .setPadding(10);
      
    // 元の漢字の構成要素に対する現在の漢字構成要素の比率
    const rate =
      this.manager.getKanjiElements().length /
      this.manager.getOriginalElements().length;
    let pos = 0;
    if (opState == OperationState.TOP) {
      pos = 220 - 200 * rate;
    } else if (opState == OperationState.BOTTOM) {
      pos = 220 + 200 * rate;
    }
    this.add
      .graphics()
      .fillStyle(0x000000, 1)
      .fillRect(width / 2 - 100, pos, 200, 200);

    // =============================
    // 漢字構成要素の表示
    // =============================
    const elements = this.manager.getKanjiElements();
    this.add
      .text(width / 2, 50, "漢字構成要素:" + elements.join(""), {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4);

    // =============================
    // ボタンの定義
    // =============================
    // "上から磨く"ボタン作成
    const buttonTop = this.add
      .image(width / 2 + 295, height / 2 + 90, "buttonTop")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.sharpenTop();
        this.scene.restart();
      });
    buttonTop.setDisplaySize(200, 50);

    // "復元する"ボタン作成
    const buttonRestore = this.add
      .image(width / 2 + 295, height / 2 + 145, "buttonRestore")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.restore();
        this.scene.restart();
      });
    buttonRestore.setDisplaySize(200, 50);

    // "下から磨く"ボタン作成
    const buttonBottom = this.add
      .image(width / 2 + 295, height / 2 + 200, "buttonBottom")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.sharpenBottom();
        this.scene.restart();
      });
    buttonBottom.setDisplaySize(200, 50);

    // "完了"ボタン作成
    const buttonComplete = this.add
      .image(width / 2 + 295, height / 2 + 255, "buttonComplete")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        const { kanji, kanjiElements, score } = this.manager.complete();
        this.manager.destroyInstance();
        this.scene.start("ending", {
          kanji: kanji,
          ids: kanjiElements.join(""),
          score: score,
        });
      });
    buttonComplete.setDisplaySize(200, 50);

    // =============================
    // ボタンの有効・無効化
    // =============================
    if (opState == OperationState.INIT) {
      buttonTop.setInteractive({
        useHandCursor: true,
      });
      buttonRestore.setAlpha(0.3);

      buttonBottom.setInteractive({
        useHandCursor: true,
      });
      buttonComplete.setInteractive({
        useHandCursor: true,
      });
    }
    if (opState == OperationState.TOP) {
      buttonTop.setInteractive({
        useHandCursor: true,
      });
      buttonRestore.setInteractive({
        useHandCursor: true,
      });
      buttonBottom.setAlpha(0.3);
      buttonComplete.setAlpha(0.3);
    }
    if (opState == OperationState.BOTTOM) {
      buttonTop.setAlpha(0.3);
      buttonRestore.setInteractive({
        useHandCursor: true,
      });
      buttonBottom.setInteractive({
        useHandCursor: true,
      });
      buttonComplete.setAlpha(0.3);
    }
  }
}
