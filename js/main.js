window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
         game.load.image('windows','assets/blueBackground.png');
         game.load.image('bar','assets/bar.png')
         game.load.image('eFolder','assets/encryptedFolder.png');
         game.load.image('files','assets/files.png');
         game.load.image('folder','assets/folderIcon.png');
         game.load.image('mail','assets/mailIcon.png');
         game.load.spritesheet('mouse','assets/mouse.png');
         game.load.image('mIcon','assets/musicIcon.png');
         game.load.image('gIcon','assets/gameIcon.png');
    }
    
    var gIcon, mIcon, eFolder, mail, files;
    var folder, folder1, folder2, folder3, folder4, folder5;
    var folder6, folder7, folder8, folder9, folder10;
    
    function create() {
     
       game.add.sprite(0, 0, 'windows');  //background
       game.add.image(0,570,'bar');
         
       gIcon = game.add.sprite(680,300,'gIcon');
       //mIcon = game.add.sprite(250,300,'mIcon');
       mail = game.add.sprite(700,50,'mail');
       files = game.add.sprite(100,250,'files');
       
        //the folders are just platforms, not interactive challenges
       folder = game.add.sprite(100,300,'folder');
       folder1 = game.add.sprite(150,50,'folder');
       folder2 = game.add.sprite(100,300,'folder');
       folder3 = game.add.sprite(100,500,'folder');
       folder4 = game.add.sprite(50,400,'folder');
       folder5 = game.add.sprite(10,100,'folder');
       folder6 = game.add.sprite(500,500,'folder');
       folder7 = game.add.sprite(640,400,'folder');
       folder8 = game.add.sprite(700,500,'folder');
       folder9 = game.add.sprite(610,300,'folder');
       folder10 = game.add.sprite(600,100,'folder');
        
       //eFolder = game.add.sprite(300,300,'eFolder');
        
    }
    
    function update() {
   
    }
};
