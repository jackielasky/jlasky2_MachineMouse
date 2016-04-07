window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
         game.load.image('windows','assets/blueBackground2.png');
         game.load.image('bar','assets/bar.png')
         game.load.image('eFolder','assets/encryptedFolder.png');
         game.load.image('files','assets/files.png');
         game.load.image('folder','assets/folder2.png');
         game.load.image('mail','assets/mailIcon.png');
         game.load.spritesheet('mouse','assets/mouse2.png');
         game.load.image('mIcon','assets/musicIcon.png');
         game.load.image('gIcon','assets/gameIcon.png');
         game.load.image('virus','assets/virus.png');
         game.load.image('heart','assets/heart1.png');
        
    }
    
    var gIcon, mIcon, eFolder, mail, files;
    var folder, folder1, folder2, folder3, folder4, folder5;
    var folder6, folder7, folder8, folder9, folder10, folder11;
    var player, cursors, jumpButton;
    var emitter, enemies;
    var heart,heart1,heart2;
    var folders;
    var facing = 'left';
    var strikes=0;
    var score=0;
    var stateText,stateText2, scoreText;
    
    function create() {
       
    //change camera view of the game and add physics component
       game.physics.startSystem(Phaser.Physics.ARCADE);
       game.add.tileSprite(0, 0, 1000, 1000,'windows');  //background
       game.world.setBounds(0, 0, 1000, 1000);
       game.add.image(0,960,'bar');
     
        //the player
        player = game.add.sprite(0,0,'mouse');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2; //low bounce
        player.body.gravity.y = 250;       
        player.body.collideWorldBounds = true;
    
     //   player.animations.add('left', [0, 1, 2, 3], 10, true);
    //    player.animations.add('turn', [4], 20, true);
    //    player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.camera.follow(player);
        
       //computer icons on desktop world
       gIcon = game.add.sprite(680,300,'gIcon');
       //mIcon = game.add.sprite(250,300,'mIcon');
       mail = game.add.sprite(700,50,'mail');
       files = game.add.sprite(100,250,'files');
       
        
        //the folders are just platforms to jump on to move throughout the game world, not interactive challenges
       folders = game.add.group();
       folders.enableBody = true;
        
       folder = folders.create(100,300,'folder');
       folder.body.immovable = true;
       folder1 = folders.create(150,50,'folder');
       folder1.body.immovable = true;
       folder2 = folders.create(100,300,'folder');
       folder2.body.immovable = true;
       folder3 = folders.create(100,500,'folder');
       folder3.body.immovable = true;
       folder4 = folders.create(50,400,'folder');
       folder4.body.immovable = true;
       folder5 = folders.create(109,100,'folder');
       folder5.body.immovable = true;
       folder6 = folders.create(300,900,'folder');
       folder6.body.immovable = true;
       folder7 = folders.create(640,400,'folder');
       folder7.body.immovable = true;
       folder8 = folders.create(700,500,'folder');
       folder8.body.immovable = true;
       folder9 = folders.create(610,300,'folder');
       folder9.body.immovable = true;
       folder10 = folders.create(12,800,'folder');
       folder10.body.immovable = true; 
       folder11 = folders.create(600,850,'folder');
       folder11.body.immovable = true; 
        
       //eFolder = game.add.sprite(300,300,'eFolder');
     
        //enemies
        enemies = game.add.emitter(game.world.centerX,-200,200);
        enemies.setYSpeed(-300,-5000);
        enemies.makeParticles(['virus']);
        enemies.start(false, 14000, 40);
        
         //these are the lives for the game
        heart = game.add.sprite(16,50,'heart');
        heart1 = game.add.sprite(55,50,'heart');
        heart2 = game.add.sprite(95,50,'heart');
        
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ',     { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
        
        stateText2 = game.add.text(game.world.centerX,game.world.centerY,' ',    { font: '50px Arial', fill: '#fff' });
        stateText2.anchor.setTo(0.5, 0.5);
        stateText2.visible = false;
        
         //  The score
        scoreText = game.add.text(16, 16, '0/10 Challenges Complete', { fontSize: '40px', fill: '#fff' }); 
        
    }
    
    function update() {
       
        //collisions with other objects
        game.physics.arcade.collide(player, folders);
          player.body.velocity.x = 0;

        game.physics.arcade.overlap(player, enemies, enemyHitsPlayer, null, this);
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;

            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;

            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player.animations.stop();

                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 5;
                }

                facing = 'idle';
            }
        }

        if (jumpButton.isDown)
        {
            player.body.velocity.y = -250;
            //jumpTimer = game.time.now + 750;
        }
    }
    
    function enemyHitsPlayer (player,virus) {
        strikes +=1;
        virus.kill();
       
        if (strikes==1){
            heart.kill();            
        }
        if (strikes==2){
            heart1.kill();
        }
        if(strikes==3){
            heart2.kill();
        }
        //make noise
        if(strikes>3){
            game.paused = true;
            virus.kill();
            stateText.visible = true;
            stateText.text="GAME OVER! \n Click here to restart";
            game.input.onTap.addOnce(restart,this);   
        }   
    }
    
    function restart () {    
    //resets the score count, unpauses game  
      score = 0;
      strikes=0;
      game.paused = false;
      stateText2.visible=false;
      stateText.visible = false;
      //revive lives
      heart.revive();
      heart1.revive();
      heart2.revive();      
  }
    
    
    function render(){
        //game.debug.cameraInfo(game.camera,32,32);
        //game.debug.spriteCoords(player,32,500);
        
    }
};
