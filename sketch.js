//creating Global Variables
var canvas, backgroundImage;
var gameState = 0;
var playerCount, allPlayers;
var distance = 0;
var database;
var form, player, game;
var players, player1, player2, player3, player4, player5, player6, player7;
var track, player1_img, player2_img, player3_img, player4_img, player5_img, player6_img, player7_img;

//preloading the images
function preload(){
  track = loadImage("../images/mid run track.jpg");
  player1_img = loadImage("../images/runner1.png");
  player2_img = loadImage("../images/runner2.png");
  player3_img = loadImage("../images/runner3.png");
  player4_img = loadImage("../images/runner4.png");
  player5_img = loadImage("../images/runner5.png");
  player6_img = loadImage("../images/runner6.png");
  player7_img = loadImage("../images/runner7.png");
}

function setup() {
  //displayWidth/Height are 2 words that will fetch the width and the height of the screen size of the user
  canvas = createCanvas(displayWidth, displayHeight);
  
  //creating a nickname for firebase.database
  database = firebase.database();

  //right_grass = createSprite();
 // left_grass = createSprite();
  
  //making a new object of game class
  //only reads the constructor of the class
  game = new Game();
  game.getState();
  game.start();
}

//updating and starting the game if player count is 2
function draw() {
   
  if(playerCount === 7){
    game.update(1);
    background("Green");
  }
  if(gameState === 1){
    //clear clears the console.log
    clear();
    game.play();
  }
  //ending the game if gameState is 2
  if(gameState === 2){
    game.end();
  }
}

