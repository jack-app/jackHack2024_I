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
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    const { width, height } = this.game.canvas;
    const opState = this.manager.getOperationState();

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
      .text(width / 2 + 300, height / 2 + 130, "上から磨く", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .on("pointerdown", () => {
        this.manager.sharpenTop();
        this.scene.restart();
      });

    // "復元する"ボタン作成
    const buttonRestore = this.add
      .text(width / 2 + 300, height / 2 + 180, "復元する", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .on("pointerdown", () => {
        this.manager.restore();
        this.scene.restart();
      });

    // "下から磨く"ボタン作成
    const buttonBottom = this.add
      .text(width / 2 + 300, height / 2 + 230, "下から磨く", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .on("pointerdown", () => {
        this.manager.sharpenBottom();
        this.scene.restart();
      });

    // "完了"ボタン作成
    const buttonComplete = this.add
      .text(width / 2 + 300, height / 2 + 280, "完成", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .on("pointerdown", () => {
        const { kanji, kanjiElements, score } = this.manager.complete();
        this.manager.destroyInstance();
        this.scene.start("ending", {
          kanji: kanji,
          ids: kanjiElements.join(""),
          score: score,
        });
      });

    // =============================
    // ボタンの有効・無効化
    // =============================
    if (opState == OperationState.INIT) {
      buttonTop.setInteractive({
        useHandCursor: true,
      });
      buttonRestore.setFill("#888888");
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
      buttonBottom.setFill("#888888");
      buttonComplete.setFill("#888888");
    }
    if (opState == OperationState.BOTTOM) {
      buttonTop.setFill("#888888");
      buttonRestore.setInteractive({
        useHandCursor: true,
      });
      buttonBottom.setInteractive({
        useHandCursor: true,
      });
      buttonComplete.setFill("#888888");
    }
  }
}
