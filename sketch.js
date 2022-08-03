var bg,bgImg;
var player1, player2; // son para los sprites
var player1Img, player2Img; // para contener la imagen de los monos

var hormiga, hormigaImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var score = 0;
var life = 3;
var piedras = 20;

var invisibleGround;
var hormigasGroup, piedrasGroup;

var gameState = "fight";



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  player1Img = loadImage("assets/V1.png")
  player1ImgA = loadImage("assets/V2.png")

  player2Img = loadImage("assets/Y1.png")
  player2ImgA = loadImage("assets/Y2.png")

  hormigaImg = loadImage("assets/h.png")

  bgImg = loadImage("assets/bg.png")

}

function setup() {

  
  createCanvas(1300,600);

  //agregando la imagen de fondo 
  bg = createSprite(1300/2-20,600/2,20,20)
bg.addImage(bgImg)
bg.scale = 0.5

// creando sprite de suelo
invisibleGround = createSprite(1300/2,550,1800,80);
invisibleGround.visible = false;
  

//creando el sprite del jugador V1
player1 = createSprite(200,600-100, 50, 50);
 player1.addImage(player1Img)
   player1.scale = 0.5
   player1.debug = true
   player1.setCollider("rectangle",0,0,200,200)

   player2 = createSprite(100,600-100, 50, 50);
   player2.addImage(player2Img)
   player2.scale = 0.5
   player2.debug = true
   player2.setCollider("rectangle",0,0,200,200)


   //creando sprites para representar la vida sobrante
   heart1 = createSprite(1300-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(1300-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(1300-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
    // Creando grupos para hormigas y piedras
    piedrasGroup = new Group()
    hormigasGroup = new Group()


}

function draw() {
   background(0); 
  //Mostrar la imagen apropiada segun la vida restante 
  if(gameState === "fight"){
    if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  
// Ir al estado de juego (gameState) "lost" cuando quedan 0 vidas
    if(life<=0){
      gameState = "lost"
      
    }
// Ir al estado "won" si la puntuación es 100
    if(score==20){
      gameState = "won"
      
    }


  //Controles de jugadores
  if((keyDown("W")||touches.length>0)&& player1.y >= 300){
    //player1.y = player1.y-30
    player1.velocityY = -12;
    console.log(player1.x,player1.y);
  }
  if((keyDown("S")||touches.length>0)&& player1.y < 860){
  player1.y = player1.y+30
  console.log(player1.x,player1.y);
  }

  if(keyDown("D")&& player1.x < 1300){
    player1.x = player1.x+30
    console.log(player1.x,player1.y);
  }

  if(keyDown("A")&& player1.x > 10){
    player1.x = player1.x-30
    console.log(player1.x,player1.y);
  }


  //player2
  if((keyDown('UP_ARROW')||touches.length>0) && player1.y >= 300){
    //player2.y = player2.y-30
    player2.velocityY = -12;
  }
  if(keyDown('DOWN_ARROW')||touches.length>0){
  player2.y = player2.y+30
  }

  if(keyDown('RIGHT_ARROW')&& player2.x < 1300){
    player2.x = player2.x+30
  }

  if(keyDown('LEFT_ARROW')&& player2.x > 10){
    player2.x = player2.x-30
  }

  // agregar gravedad
  player1.velocityY = player1.velocityY + 0.8
  player2.velocityY = player2.velocityY + 0.8

  // hacer que los monos no se caigan
  player1.collide(invisibleGround);
  player2.collide(invisibleGround);

//liberar las balas y cambiar la imagen del tirador a posición de disparo cuando la barra espaciadora es presionada 
//PLAYER1
  if(keyWentDown("Q")){
    piedras = createSprite(player1.X-30,player1.y-30,20,10);
    piedras.velocityX = 20;
    
    piedrasGroup.add(piedras);
    player1.depth = piedras.depth;
    player1.depth = player1.depth+2;
    player1.addImage("player1", player1ImgA);
    piedras = piedras-1;
      if(piedras<=0){
        gameState = 'piedra'
      }
    
  }
//el jugador regresa a la imagen de la posición original una vez que dejamos de presionar la barra espaciadora
  else if(keyWentUp("Q")){
    player1.addImage(player1Img);
  }
  //PLAYER2
  if(keyWentDown("0")){
    piedras = createSprite(player2.X-30,player2.y-30,20,10);
    piedras.velocityX = 20;
    
    piedrasGroup.add(piedras);
    player2.depth = piedras.depth;
    player2.depth = player2.depth+2;
    player2.addImage("player2", player2ImgA);
    piedras = piedras-1;
    if(piedras=0){
      gameState = 'piedra'
    }
    
  }
//el jugador regresa a la imagen de la posición original una vez que dejamos de presionar la barra espaciadora
  else if(keyWentUp("0")){
    player2.addImage(player2Img);
  }


// Destruir a la hormiga cuando una bala lo toca e incrementar la puntuación
  if(hormigasGroup.isTouching(piedrasGroup)){
    for(var i=0;i<hormigasGroup.length;i++){     
        
    if(hormigasGroup[i].isTouching(piedrasGroup)){
          hormigasGroup[i].destroy()
          piedrasGroup.destroyEach()
        
  
          score = score+2
          } 
    }  
    
  }
// Reducir la vida y destruir a la hormiga cuando el jugador lo toca
  if(hormigasGroup.isTouching(player1) || hormigasGroup.isTouching(player2) ){
  
    // lose.play();


    for(var i=0;i<hormigasGroup.length;i++){     
        
      if(hormigasGroup[i].isTouching(player1) || hormigasGroup.isTouching(player2)){
        hormigasGroup[i].destroy()
          
          life=life-1
            } 

  }
  }

// Llamar la función para generar zombis
  enemy();
}


  drawSprites();

// Mostrar la puntuación, las vidas y balas restantes 
  textSize(20)
  fill("white")
  text("Piedras = " + piedras ,100,50)
  text("Puntuación = " + score,100,20)
  text("Vidas = " + life,100,80)

  // Destruir a hormiga y al jugador y mostrar el mensaje en el estado de juego "lost"
  if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("Perdiste",400,300)
  hormigasGroup.destroyEach();
  player1.destroy();
  player2.destroy();

  }

  // Destruir al zombi y al jugador y mostrar el mensaje del estado de juego "won"
  else if(gameState == "won"){

  textSize(100)
  fill("yellow")
  text("Ganaste",400,300)
  hormigasGroup.destroyEach();
  player1.destroy();
  player2.destroy();

  }

  // Destruir al hormiga, jugador y balas y mostrar el mensaje en el estado de juego "piedra"
  else if(gameState == "piedra"){

  textSize(50)
  fill("yellow")
  text("¡Te quedaste sin piedras!",displayWidth/2,displayHeight/2)
  hormigasGroup.destroyEach();
  player1.destroy();
  player2.destroy();
  piedrasGroup.destroyEach();

  }
}

// Creando la función para generar zombis
function enemy(){
  if(frameCount%50===0){

    // Dando posiciones "x" e "y" aleatorias cuando aparecen los zombis
    hormiga = createSprite(1300,random(300,450),40,40)

    hormiga.addImage(hormigaImg)
    hormiga.scale = 0.15
    hormiga.velocityX = -3
    hormiga.debug= true
    hormiga.setCollider("rectangle",0,0,400,400)
   
    hormiga.lifetime = 400
    hormigasGroup.add(hormiga)
  }

}


