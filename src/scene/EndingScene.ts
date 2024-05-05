export class EndingScene extends Phaser.Scene {
  private kanji?: string;
  private ids?: string;

  constructor() {
    super('ending');
  }

  init(data: any){
    const kanji = data.kanji;
    const ids = data.ids;
    // data = {
    // kanji: "龍",
    // ids:"⿰⿱⿱⿱⿱丶一丷一月&CDP-89B0"
    //  }
    this.kanji = kanji;
    this.ids = ids;
  }

  create() {
    const { width, height } = this.game.canvas;
    let kanji:string = this.kanji!
    let ids:string = this.ids!
    
    this.add.text(width/2,height/2-170,kanji,{fontSize:100,fontFamily:"meiryo UI"},).setOrigin(0.5);

    ids = ids.replace(/&\w{3}-\w{4}/g,"★");
    this.add.text(width/2,height/2-70,ids,{fontSize:45,fontFamily:"meiryo UI"},).setOrigin(0.5)

    const button= this.add.text(width/2, height/2+120, 'RETRY',{fontSize:35,fontFamily:"meiryo UI"}).setOrigin(0.5);
    button.setInteractive({
      useHandCursor: true
    });
    button.on('pointerdown', () => {
      this.scene.start('title');  // TitleSceneに遷移
    });
    const share= this.add.text(width/2, height/2+200, 'Share Result',{fontSize:30}).setOrigin(0.5);
    share.setInteractive({
      useHandCursor: true
    })
    // 結果を共有するページに遷移
    share.on('pointerdown',() => {

    })
  }
}
