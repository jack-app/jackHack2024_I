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
    this.load.image("buttonTop","assets/button_uekara.png")
    this.load.image("buttonRestore","assets/button_hukugen.png")
    this.load.image("buttonBottom","assets/button_shitakara.png")
    this.load.image("buttonComplete","assets/button_kansei.png")
  }

  create() {
    const { width, height } = this.game.canvas;
    const opState = this.manager.getOperationState();
    console.log("opState: ", opState);

    // =============================
    // 中央の文字列を作成
    // =============================
    const kanji = this.manager.getKanji();
    this.add
      .text(width / 2, height / 2 + 50, kanji, { fontSize: "200px" })
      .setOrigin(0.5)
      .setPadding(10);

    // 元の漢字の構成要素に対する現在の漢字構成要素の比率
    const rate =
      this.manager.getKanjiElements().length /
      this.manager.getOriginalElements().length;
    console.log("rate: ", rate);
    const graphics = this.add.graphics().fillStyle(0x000000, 1);
    // 下を磨く場合の幕
    if (opState == OperationState.BOTTOM) {
      graphics.fillRect(width / 2 - 100, 420 - 2.0 * rate, 200, 200);
    }
    //　上を磨く場合の幕
    if (opState == OperationState.TOP) {
      graphics.fillRect(width / 2 - 100, 40 + 2.0 * rate, 200, 200);
    }

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
      .image(width / 2 + 300, height / 2 + 130, "buttonTop")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.sharpenTop();
        this.scene.restart();
      });
    buttonTop.setDisplaySize(200, 40);

    // "復元する"ボタン作成
    const buttonRestore = this.add
      .image(width / 2 + 300, height / 2 + 180, "buttonRestore")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.restore();
        this.scene.restart();
      });
    buttonRestore.setDisplaySize(200, 40);

    // "下から磨く"ボタン作成
    const buttonBottom = this.add
      .image(width / 2 + 300, height / 2 + 230, "buttonBottom")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.manager.sharpenBottom();
        this.scene.restart();
      });
    buttonBottom.setDisplaySize(200, 40);

    // "完了"ボタン作成
    const buttonComplete = this.add
      .image(width / 2 + 300, height / 2 + 280, "buttonComplete")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        const { kanji, kanjiElements, score } = this.manager.complete();
        this.scene.start("ending", {
          kanji: kanji,
          ids: kanjiElements.join(""),
          score: score,
        });
      });
    buttonComplete.setDisplaySize(200, 40);

    // =============================
    // ボタンの有効・無効化
    // =============================
    if (opState == OperationState.INIT) {
      buttonTop.setInteractive({
        useHandCursor: true,
      });
      buttonRestore.setAlpha(0.5);

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
      buttonBottom.setAlpha(0.5);
      buttonComplete.setAlpha(0.5);
    }
    if (opState == OperationState.BOTTOM) {
      buttonTop.setAlpha(0.5);
      buttonRestore.setInteractive({
        useHandCursor: true,
      });
      buttonBottom.setInteractive({
        useHandCursor: true,
      });
      buttonComplete.setAlpha(0.5);
    }
  }
}
