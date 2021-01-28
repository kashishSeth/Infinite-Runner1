class Form {
    //input,button,greeting are DOM (Document Object Model)  
        constructor() {
          this.input = createInput("Name");
          this.button = createButton('Play');
          this.greeting = createElement('h2');
          this.title = createElement('h2');
          //creating a button for reseting the database automatically 
          this.reset = createButton('Reset');
        }
        hide(){
          this.greeting.hide();
          this.button.hide();
          this.input.hide();
          this.title.hide();
        }
      
        display(){
          //.html is used for diaplying Infinite Runner Game and h2 size
          this.title.html("Infinite Runner Game");
          //positioning all the elements with respect to the screen size of the player
          //ex: if displayWidth = 100, displayWidth/2 = 50
          this.title.position(displayWidth/2 - 50, 0);
      
          this.input.position(displayWidth/2 - 50, displayHeight/2 - 300);
          this.button.position(displayWidth/2 + 100, displayHeight/2 - 250);
          this.reset.position(displayWidth-100,20);
          //"()=>" is a consized way of writing function()
          this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(displayWidth/2 - 50, displayHeight/2 - 400);
          });
          
          this.reset.mousePressed(()=>{
            player.updateCount(0);
            //updating the gameState in the database 
            game.update(0);
            Player.updatePlayersAtEnd(0);
            //creating a reference to the database and removing the players datafield from there
            database.ref('/').child("players").remove()
          });
      
        }
      }
      