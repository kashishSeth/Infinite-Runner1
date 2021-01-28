class Player {

    //creating the player features in the constructor
      constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = null; 
      }
    
      //getting the players on canvas from database
      getCount(){
        var playerCountRef = database.ref('playerCount');
        //(data)=>, is used for writing function(data) in a concise way  
        playerCountRef.on("value",(data)=>{
          playerCount = data.val();
        })
      }
      
      //updating the player Count in database
      updateCount(count){
        // slash is used for going inside the database using ref and updating the player count 
        database.ref('/').update({
          playerCount: count
        });
      }
    
      //adding the player details in the database where players is the parent datafield and the player(1,2) are the children datafields
      //.update and .set are used for writing on the database
      //.update can only make changes in the pre existing datafield
      //.set is capable of creating a new datafield
      update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
          name:this.name,
          distance:this.distance
        });
      }
      
      //getting the player info in database
      //static means that it will be called directly by the class, common for all 4 objects 
      static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
          allPlayers = data.val();
        })
      }
  
      getPlayersAtEnd() {
        database.ref('PlayersAtEnd').on("value",(data)=>{
          this.rank = data.val();
        })
      }
    
      //updating rank of players at the end of the game
      //static means that this function will be accessed by the class and not the object
      //whenever properties are not object specific and need to occur for the entire class unanymously we make it static in nature.
      static updatePlayersAtEnd(rank) {
        database.ref('/').update({
          PlayersAtEnd:rank
        })
      }
    }