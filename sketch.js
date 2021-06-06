var PLAY = 1;
var END = 0; 
var gameState = 1;

var  alien1, alien2, fruit1, fruit2, fruit3, fruit4;
var sword, sword1;

var knife, gameoverImg, swordImg, gameover;
var knifeSwooshSound, monster;
var score;

var fruitGroup, enemyGroup;

function preload(){
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  swordImg = loadImage("sword.png");
  
  gameoverImg = loadImage("gameover.png");
  
  gameoverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
  //creating the canvas
  createCanvas(650, 390);
  background(180);
  
  //creating all the sprites
  knife = createSprite(40,200,20,20);
  knife.addImage(swordImg);
  knife.scale = 0.7;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  
  //create fruit and enemy Groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  console.log("Hello" + 5);
  
  //knife.setCollider("circle", 0, 0);
  //knife.debug = true;
  
  score = 0;
  
  }

function draw(){

  background("brown");
  //displaying score
  text("Score: "+ score, 500,50);
  
    if(gameState === PLAY){
    gameover.visible = false;
    
    fruits();
    enemy();
    
    if (fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score + 2;
      
    }
    
    else if (knife.isTouching(enemyGroup)){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.velocityX = 0;
      enemyGroup.velocityY = 0;
      score = score - 2;
      gameState = END;
    }
  
      
  // check the point when the score is a multiple of 50
    if (score > 0 && score % 50 === 0){
      knifeSwooshSound.play();
    }
    
  knife.y =  World.mouseY;
  knife.x =  World.mouseX;
    }

    else if (gameState === END) {
     console.log("Hey");
      //gameover.visible = true;
     
      fruitGroup.velocityX = 0;
      knife.velocityY = 0
      
     //changing the animation of the sword to gameover and reset its position
    knife.addImage(gameoverImg);
    knife.x = 200;
    knife.y = 200;
   }
 drawSprites();
}

function fruits(){
  
  if (frameCount % 60 === 0){
    var fruit = createSprite(400, 200, 10, 40);
    fruit.scale=0.2;
    //fruit.debug= true;
    r = Math.round(random(1,4))
    if (r == 1){
      fruit.addImage(fruit1)
    }
      else if (r == 2){
        fruit.addImage(fruit2)
        }
     else if (r == 3){
        fruit.addImage(fruit3)
        }
     else if (r == 4){
        fruit.addImage(fruit4)
        }

    fruit.y = round(random(50,340))
    
    fruit.velocityX = -7;
    fruit.setLifetime= 150;
    
    fruitGroup.add(fruit);
    }
}
  function enemy(){
     if (World.frameCount%200 ===0){
         monster = createSprite(400,200,20,20);
         monster.addAnimation("moving", alien1);
         monster.y= Math.round(random(100,300));
         monster.velocityX= -8;
         monster.setLifetime = 50;
  
    enemyGroup.add(monster);
   
   
}
}
