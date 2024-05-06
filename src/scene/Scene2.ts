import { MainSceneManager, OperationState } from "../class/MainSceneManager";

let buttonEnabled = {
  sharpenTop: true,
  restore: true,
  sharpenButtom: true,
  complete: true,
};

let ids = ["⿱", "田", "⿻", "丿", "𠃌"];

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

    // 漢字構成要素の表示
    const elements = this.manager.getKanjiElements();
    this.add
      .text(width / 2, 50, "漢字構成要素:" + elements.join(""), {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4);

    // 中央の文字列を作成
    const kanji = this.manager.getKanji();
    this.add
      .text(width / 2, height / 2 + 50, kanji, { fontSize: "200px" })
      .setOrigin(0.5)
      .setPadding(10);

    let rate = 0;
    let target = "TOP";
    // 下の幕
    if (target == "BOTTUM") {
      let graphics = this.add.graphics();
      graphics
        .fillStyle(0x800000, 1)
        .fillRect(width / 2 - 100, 420 - 2.0 * rate, 200, 200);
    } else if (target == "TOP") {
      // 上の幕
      let graphics2 = this.add.graphics();
      graphics2
        .fillStyle(0x800000, 1)
        .fillRect(width / 2 - 100, 40 + 2.0 * rate, 200, 200);
    }

    // "上から磨く"ボタン作成
    this.add
      .text(width / 2 + 300, height / 2 + 130, "上から磨く", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        if (buttonEnabled["sharpenTop"] == true) {
          if (ids.length > 1) {
            let result = ids.slice(1).join("");
            console.log(result);
            this.add
              .text(width / 2, 50, "漢字構成要素:" + result, {
                fontSize: "24px",
                color: "#ffffff",
                backgroundColor: "#000000",
              })
              .setOrigin(0.5)
              .setPadding(4);
            buttonEnabled["sharpenButtom"] = false;
          } else if (ids.length < 1) {
            return;
          }
        } else if (buttonEnabled["sharpenTop"] == false) {
          return;
        }
        //this.scene.restart()
      });

    // "復元する"ボタン作成
    this.add
      .text(width / 2 + 300, height / 2 + 180, "復元する", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        buttonEnabled["sharpenTop"] = true;
        buttonEnabled["sharpenButtom"] = true;
        this.scene.restart();
      });

    // "下から磨く"ボタン作成
    this.add
      .text(width / 2 + 300, height / 2 + 230, "下から磨く", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        if (buttonEnabled["sharpenButtom"] == true) {
          if (ids.length > 1) {
            let result = ids.slice(0, -1).join("");
            console.log(result);
            this.add
              .text(width / 2, 50, "漢字構成要素:" + result, {
                fontSize: "24px",
                color: "#ffffff",
                backgroundColor: "#000000",
              })
              .setOrigin(0.5)
              .setPadding(4);
            buttonEnabled["sharpenTop"] = false;
          } else if (ids.length < 1) {
            return;
          }
        } else if (buttonEnabled["sharpenButtom"] == false) {
          return;
        }
        //this.scene.restart()
      });

    // "完了"ボタン作成
    this.add
      .text(width / 2 + 300, height / 2 + 280, "完成", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5)
      .setPadding(4)
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        buttonEnabled["sharpenTop"] = true;
        buttonEnabled["sharpenButtom"] = true;
        this.scene.start("ending", {
          kanji: this.manager.getKanji(),
          ids: this.manager.getKanjiElements().join(""),
        });
      });
  }
}
