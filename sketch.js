var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400, 400);
   
  monkey = createSprite(50, 300, 20, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  console.log(ground.x);
  ground.visible = true;            
  
  invisibleGround = createSprite(200, 350, 400, 10);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  /*monkey.debug = true;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);*/
  
  survivalTime = 0;
}


function draw() {
  background("white");
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: "+ survivalTime, 100,50);
  
  if(gamestate === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnObstacle();
    spawnBanana();
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)) {
      gamestate = END;
    }
  }
  
  if(gamestate === END) {
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
}

function spawnObstacle() {
  if(frameCount %300 === 0){
   obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage("obstacle", obstacleImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = 100;
     
   obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if(frameCount %80 === 0) {
    banana = createSprite(600,140,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1 ;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}