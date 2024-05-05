enum OperationState {
  INIT,
  TOP,
  BOTTOM,
}

export class MainSceneManager {
  kanjiElements: string[];
  originalElements: string[];
  originalKanji: string;
  operationState: OperationState;

  constructor() {
    this.kanjiElements = ["⿱", "田"];
    this.originalElements = ["⿱", "田", "力"];
    this.originalKanji = "力";
    this.operationState = OperationState.INIT;
  }

  private setKanjiElements = (newElements: string[]): void => {
    this.kanjiElements = newElements;
  };

  public sharpenTop(): void {
    // 文字数のバリデーション
    // FIXME: 正しい要件を満たすように要修正
    if (this.kanjiElements.length <= 1) return;
    // "上から磨く"処理
    this.setKanjiElements(this.kanjiElements.slice(1));
    // 操作ステートの更新
    this.operationState = OperationState.TOP;
  }

  public restore(): void {
    // 辞書から新たな漢字構成要素と漢字を取得してセット
    // kanjiElementsを新たな漢字構成要素にセット
    // operationStateをINITに戻す
    this.operationState = OperationState.INIT;
  }

  public sharpenBottom(): void {
    // 文字数のバリデーション
    // FIXME: 正しい要件を満たすように要修正
    if (this.kanjiElements.length <= 1) return;
    // 下から磨く処理
    this.setKanjiElements(this.kanjiElements.slice(0, -1));
    // 操作ステートの更新
    this.operationState = OperationState.BOTTOM;
  }

  public complete(): void {
    // 復元直後、即ち操作ステートがINIT以外なら早期リターン
    if (this.operationState !== OperationState.INIT) return;

    // スコアを計算して諸々の情報と共にエンディングシーンに渡す
  }
}
