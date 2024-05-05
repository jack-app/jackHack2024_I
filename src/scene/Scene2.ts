let buttonEnabled = {
  'sharpenTop':true,
  'restore':true,
  'sharpenButtom':true,
  'complete':true,
  }

let ids = ['⿱', '田', '⿻', '丿', '𠃌']

// class MainSceneManager {
  // ids: string[]

  // constructor() {
    // this.ids = ['⿱', '田', '⿻', '丿', '𠃌']
  // }

  // setIds(newIds: string[]) {
    // this.ids = newIds
  // }
// }

export class MainScene extends Phaser.Scene {
    constructor() {
      super('main');
    }
    
    preload() {
      // ロゴ画像だけは最初から表示したいので予めロード
      // Phaser3のロゴをlabs.phaser.ioから取得しているので、もし公開する際はこの部分は消してください
      this.load.image('logo', 'assets/phaser3-logo.png');
    }
    create() {
      const { width, height } = this.game.canvas;
    // 中央の文字列を作成
      this.add.text(width/2, height/2+50, '男', {fontSize: '200px'}).setOrigin(0.5).setPadding(10);
   
    let rate = 0;
    let target = "TOP";
     // 下の幕
    if(target == 'BOTTUM'){
    let graphics = this.add.graphics()
        graphics.fillStyle(0x800000, 1).fillRect(width/2-100, 420-2.0*rate, 200, 200)
    }else if (target == 'TOP'){// 上の幕  
    let graphics2 = this.add.graphics()
        graphics2.fillStyle(0x800000, 1).fillRect(width/2-100, 40+2.0*rate, 200, 200)    
    }
        // ボタンを作成
      const button = this.add.text(width/2+300, height/2+130, '上から磨く', {
       fontSize: '24px',
       color: '#ffffff',
       backgroundColor: '#000000',
       }).setOrigin(0.5).setPadding(4);

      // Zoneをクリックできるように設定
      button.setInteractive({
        useHandCursor: true  
        // マウスオーバーでカーソルが指マークになる
    });
    // ボタン2を作成
      const button2 = this.add.text(width/2+300, height/2+180, '復元する', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        }).setOrigin(0.5).setPadding(4);
      
       // Zoneをクリックできるように設定
       button2.setInteractive({
         useHandCursor: true  
         // マウスオーバーでカーソルが指マークになる
     });
     //ボタン３を作成
     const button3 = this.add.text(width/2+300, height/2+230, '下から磨く', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        }).setOrigin(0.5).setPadding(4);
      
       // Zoneをクリックできるように設定
       button3.setInteractive({
         useHandCursor: true  
         // マウスオーバーでカーソルが指マークになる
     });
     
     //ボタン4を作成
     const button4 = this.add.text(width/2+300, height/2+280, '完成', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        }).setOrigin(0.5).setPadding(4);
      
       // Zoneをクリックできるように設定
       button4.setInteractive({
         useHandCursor: true  
         // マウスオーバーでカーソルが指マークになる
     });
     //文字列を定義
    //  let ids = ['⿱', '田', '⿻', '丿', '𠃌']

     const kanji = this.add.text(width/2, 50, '漢字構成要素:'+ids.join(''), {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        }).setOrigin(0.5).setPadding(4);
       //上削るをクリックしたらidsの一番前の文字を消去
       
       button.on('pointerdown', () => { 
        if(buttonEnabled['sharpenTop'] == true) 
           {
          if(ids.length>1)
          {
          let result = ids.slice(1).join('');
          console.log(result)
          this.add.text(width/2, 50, '漢字構成要素:'+result, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            }).setOrigin(0.5).setPadding(4); 
            buttonEnabled['sharpenButtom'] = false
          }else if(ids.length<1)
          {
           return
          }}else if(buttonEnabled['sharpenTop'] == false)
            { 
             return
            }
          //this.scene.restart()
       })
      //復元ボタンをクリックしたら    
       button2.on('pointerdown', () => {
        buttonEnabled['sharpenTop'] = true
        buttonEnabled['sharpenButtom'] = true
        this.scene.restart()
      })
      //下削るをクリックしたらidsの一番後ろの文字を消去
       button3.on('pointerdown', () => { 
        if(buttonEnabled['sharpenButtom'] == true)
          {
        if(ids.length>1)
        {
        let result = ids.slice(0, -1).join('');
        console.log(result)
        this.add.text(width/2, 50, '漢字構成要素:'+result, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            }).setOrigin(0.5).setPadding(4);
            buttonEnabled["sharpenTop"] = false
          }else if(ids.length<1){
           return
          }}else if(buttonEnabled['sharpenButtom'] == false)
           { 
             return
           }
           //this.scene.restart()
    });
      //完成をクリックしたらMainSceneに遷移
      button4.on('pointerdown', () => {
        buttonEnabled['sharpenTop'] = true
        buttonEnabled['sharpenButtom'] = true
        this.scene.start('ending', { timelineID: 'start' });
    });
  }}
