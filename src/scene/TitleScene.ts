export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    const { width, height } = this.game.canvas;
    
    this.add.text(width/2,height/2-200,"漢磨き",{fontSize:120}).setOrigin(0.5);
    this.add.image(width/2, height/2, '').setOrigin(0.5);
    const button = this.add.text(width/2, height/2, 'Click To Start',{fontSize:75,color:"#ff0000"},).setOrigin(0.5);
   
    // buttonをクリックできるように設定
    button.setInteractive({
      useHandCursor: true  // マウスオーバーでカーソルが指マークになる
    });

    // buttonをクリックしたらMainSceneに遷移
    button.on('pointerdown', () => {
      this.scene.start('main', { timelineID: 'start' })});

    const rule = this.add.text(width/2,height/2+120,"How To Play",{fontSize:35}).setOrigin(0.5)
    // ruleをクリックできるように設定
    rule.setInteractive({
      useHandCursor: true // マウスオーバーでカーソルが指マークになる
    });

    // ruleをクリックしたらルール画面に遷移
    rule.on('pointerdown',() => {

    });
    
    
  }
}
