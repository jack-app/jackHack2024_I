import * as data from "../data/UCSkanji-tree.json";

enum OperationState {
  INIT,
  TOP,
  BOTTOM,
}

type KanjiWithIds = {
  kanji: string,
  ids: string
}

export class KanjiRestore {
  private kanjiTree: any;

  constructor() {
    this.kanjiTree = data;
  }

  public restore(subIds: string, way:OperationState): KanjiWithIds {
    let kanji = '山';
    let ids = "山山"
    

    return {kanji, ids};
  }
}