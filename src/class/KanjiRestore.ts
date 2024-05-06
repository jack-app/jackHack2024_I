import * as data from "../data/UCSkanji-tree.json";
import * as data_reverse from "../data/UCSkanji-tree-reverse.json";

enum OperationState {
  INIT,
  TOP,
  BOTTOM
}

type KanjiWithIds = {
  kanji: string,
  ids: string[]
}

export class KanjiRestore {
  private kanjiTree: any;
  private kanjiTreeReverse: any;

  constructor() {
    this.kanjiTree = data;
    this.kanjiTreeReverse = data_reverse;
  }

  public restore(subIds: string[], way:OperationState): KanjiWithIds {
    let kanji = '';
    let ids: string[] = [];
    let subtree;
    // 下向きに復元
    if (way == OperationState.BOTTOM) {
      ids = subIds;
      subtree = this.kanjiTree;
    } else if (way == OperationState.TOP) {
      // 上向きに復元
      ids = subIds.reverse();
      subtree = this.kanjiTreeReverse;
    }

    for (let i = 0; i < subIds.length; i++) {
      subtree = subtree[subIds[i]];
    }
    while (true){
      const keys : string[] = Object.keys(subtree);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const randomValue :any = subtree[randomKey];
      if (randomKey == "terminal"){
        kanji = randomValue;
        break;
      } else {
        ids.push(randomKey);
        subtree = randomValue;
      }
    }
    if (way == OperationState.TOP) {
      ids = ids.reverse();
    }
    return {kanji, ids};
  }
}