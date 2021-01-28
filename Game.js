class Game {
    constructor(){}
  //Reading the value of the gameState datafield from the database and storing it in the global variable gameState
    getState(){
      //.ref is referncing to the gameState datafield in the database
      var gameStateRef  = database.ref('gameState');
      //.on is a listener that will listen to all changes occuring in the database and will read function(data),
      //automatically
      //.val is used for reading info from the database
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    //async means that we want the machine to break its natural frequncy of reading the program
    async start(){
      if(gameState === 0){
        player = new Player();
        //asking the machine to wait on line 29
        //machine will jump from line 27 to 28 only after it has observed or listened to any change 
        //in the playerCount datafield in the database
        //.once is a function used for creating a listener and listens to changes only once
        var playerCountRef = await database.ref('playerCount').once("value");
        //checking if the link, the referencing, was successful
        if(playerCountRef.exists()){
          //.val is used for reading the info from the referance
          //info stored in playerCount variable
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      //making the 4 player sprites
      player1 = createSprite(100,200);
      player1.addImage("player1",player1_img);
      player2 = createSprite(300,200);
      player2.addImage("player2",player2_img);
      player3 = createSprite(500,200);
      player3.addImage("player3",player3_img);
      player4 = createSprite(700,200);
      player4.addImage("player4",player4_img);
      player5 = createSprite(900,200);
      player5.addImage("player5",player5_img);
      player6 = createSprite(1100,200);
      player6.addImage("player6",player6_img);
      player7 = createSprite(1300,200);
      player7.addImage("player7",player7_img);
      players = [player1, player2, player3, player4, player5, player6, player7];
   
    }
  
    play(){
      form.hide();

      //using the getPlayerInfo function using the Player Class.
      Player.getPlayerInfo();
      player.getPlayersAtEnd();
          
      //!==, is not equals
      //checking if all players is storing some data inside it or not
      //plr is a variable that is navigating from one player to another
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0, -displayHeight*3.5, displayWidth, displayHeight*4.5);
        image.scale = 2;
      }

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the players
      var x = 150 ;
      var y;

        for(var plr in allPlayers){
          
          //add 1 to the index for every loop
          index = index + 1;

          //position the players a little away from each other in x direction
          x = x + 200;

          //use data form the database to display the players in y direction
          y = displayHeight - allPlayers[plr].distance;
          //index-1, in order to point/refer to the appropriate sprite in the players array
          //as when index=1, player1, is stored in the 0th position of the players array
          players[index-1].x = x;
          players[index-1].y = y;

          //checking if plr is pointing to the current player
          //if yes, create a red color cicle beneath the sprite
           if (index === player.index){
            //stroke(10);
            //fill("red");
            //ellipse(x,y,60,60);
            //players[index - 1].shapeColor = "red";
            //the x of the camera is fixed at the center of canvas
            //the y of the camera is constantly following the y coordinate of the sprite
            camera.position.x = displayWidth/2;
            camera.position.y = players[index-1].y;
      }
    }
  
  //when up arrow key is pressed you enter the game and the index is assigned to the player.
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=50
        player.update();
      } 
      if(player.distance > 4500){
        gameState = 2;
        player.rank += 1
        Player.updatePlayersAtEnd(player.rank);
      }
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
      //alert is helping create a pop up on the screen
      alert("Your Rank: " + player.rank);
    }
  }