import { KanjiRestore } from "./KanjiRestore";

export enum OperationState {
  INIT,
  TOP,
  BOTTOM,
}

export class MainSceneManager {
  private static instance?: MainSceneManager;
  private kanjiElements: string[];
  private originalElements: string[];
  private originalKanji: string;
  private operationState: OperationState;
  private kanjiRestore: KanjiRestore;

  constructor() {
    this.kanjiElements = ["⿱", "田", "⿻", "丿", "𠃌"];
    this.originalElements = ["⿱", "田", "⿻", "丿", "𠃌"];
    this.originalKanji = "男";
    this.operationState = OperationState.INIT;
    this.kanjiRestore = new KanjiRestore();
  }

  public static getInstance = (): MainSceneManager => {
    if (!this.instance) {
      this.instance = new MainSceneManager();
    }
    return this.instance;
  };

  public destroyInstance = (): void => {
    MainSceneManager.instance = undefined;
  };

  public getKanji = (): string => {
    return this.originalKanji;
  };

  public getKanjiElements = (): string[] => {
    const elements = this.kanjiElements.map((elm) => {
      return elm[0] == "&" ? "☆" : elm;
    });
    return elements;
  };

  public getOriginalElements = (): string[] => {
    // FIXME: Unicodeで表示できない文字を星に置換
    return this.originalElements;
  };

  public getOperationState = (): OperationState => {
    return this.operationState;
  };

  private setKanjiElements = (newElements: string[]): void => {
    this.kanjiElements = newElements;
  };

  public sharpenTop(): void {
    // 文字数のバリデーション
    if (this.kanjiElements.length <= 1) return;
    // "上から磨く"処理
    this.setKanjiElements(this.kanjiElements.slice(1));
    // 操作ステートの更新
    this.operationState = OperationState.TOP;
  }

  public restore(): void {
    // 辞書から新たな漢字構成要素と漢字を取得してセット
    const { kanji, ids } = this.kanjiRestore.restore(
      this.kanjiElements,
      this.operationState
    );
    this.setKanjiElements(ids); // for development
    this.originalKanji = kanji; // for development
    // operationStateをINITに戻す
    this.operationState = OperationState.INIT;
  }

  public sharpenBottom(): void {
    // 文字数のバリデーション
    if (this.kanjiElements.length <= 1) return;
    // 下から磨く処理
    this.setKanjiElements(this.kanjiElements.slice(0, -1));
    // 操作ステートの更新
    this.operationState = OperationState.BOTTOM;
  }

  public complete(): { kanji: string; kanjiElements: string[]; score: number } {
    // スコアを計算して諸々の情報と共に返す
    return {
      kanji: this.getKanji(),
      kanjiElements: this.getKanjiElements(),
      score: this.getKanjiElements().length * 100,
    };
  }
}
