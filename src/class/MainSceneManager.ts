enum OperationState {
  INIT,
  TOP,
  BOTTOM,
}

export class MainSceneManager {
  kanjiElements: string;
  originalElements: string;
  originalKanji: string;
  operationState: OperationState;

  constructor() {
    this.kanjiElements = "⿱田";
    this.originalElements = "⿱田力";
    this.originalKanji = "力";
    this.operationState = OperationState.INIT;
  }

  private setKanjiElements = (newElements: string): void => {
    this.kanjiElements = newElements;
  };

  public sharpenTop(): void {
    // 文字数のバリデーション
    // 上から磨く処理
    // 結果をkanjiElementsにセット
    // ステートの更新
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
    // 下から磨く処理
    // 結果をkanjiElementsにセット
    // ステートの更新
    this.operationState = OperationState.BOTTOM;
  }

  public complete(): void {
    // もしoriginalKanjiとkanjiElementsが一致していたらエンディングシーンに遷移
    // スコアを計算して諸々の情報と共にエンディングシーンに渡す
  }
}
