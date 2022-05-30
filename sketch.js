var trex, trex_running, edges;
var dietrex
var groundImage, solo;
var transparente
var nuvenzinha
var nuvem
var cacto
var cactozinho1, cactozinho2, cactozinho3, cactozinho4, cactozinho5, cactozinho6
var nuvao, cactuzao
var inicio = "start"
var fim, finzinho
var recomeco, recomecinho
var pulo, batida,marcacao
var pontuacao = 0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  dietrex = loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  nuvenzinha = loadImage("cloud.png")
  cactozinho1 = loadImage("obstacle1.png")
  cactozinho2 = loadImage("obstacle2.png")
  cactozinho3 = loadImage("obstacle3.png")
  cactozinho4 = loadImage("obstacle4.png")
  cactozinho5 = loadImage("obstacle5.png")
  cactozinho6 = loadImage("obstacle6.png")
  finzinho = loadImage("gameOver.png")
  recomecinho = loadImage("restart.png")
  pulo = loadSound("jump.mp3")
  batida = loadSound("die.mp3")
  marcacao = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //criando o trex
  trex = createSprite(50,height-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addImage("morreu", dietrex);
  edges = createEdgeSprites();
  transparente = createSprite(width/2, height-10, width, 9)
  transparente.visible = false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  solo = createSprite(width/2, height-15)
  solo.addImage(groundImage)
  nuvao = new Group()
  cactuzao = new Group()
  trex.debug = false
  trex.setCollider("circle", 0, 0, 40)
  // trex.setCollider ("rectangle" ,0,0,100,90)
  fim = createSprite(width/2,height/2 -30)
  fim.addImage("morte", finzinho)
  recomeco = createSprite(width/2, height/2 +20)
  recomeco.addImage("nasceu", recomecinho)
  recomeco.scale = 0.5
  recomeco.visible = false
  fim.visible = false
}
function draw() {
  //definir a cor do plano de fundo 
  background("white");
  text ("pontuação "+pontuacao,8,10)
  if (pontuacao>0 && pontuacao %100===0){
  marcacao.play(  )
  }
  if (inicio === "start") {
  pontuacao = pontuacao + Math.round(getFrameRate()/30)
    solo.velocityX = -(5+pontuacao/100)
    if (solo.x < 0) {
      solo.x = solo.width / 2
    }
    if (keyDown("space") && trex.y > height-54||touches.length>0) {
      trex.velocityY = -10;
      pulo.play()
      touches  =[]
      
    }
    trex.velocityY = trex.velocityY + 0.5;

    geradordenuvens()
    geradordecactos()
    if (trex.isTouching(cactuzao)) {
      inicio = "game over"
      batida.play()

    }

  } else if (inicio === "game over") {
    recomeco.visible = true
    fim.visible = true
    cactuzao.setLifetimeEach(-1)
    nuvao.setLifetimeEach(-1)
    trex.changeAnimation("morreu", dietrex);
    solo.velocityX = 0
    trex.velocityY = 0
    nuvao.setVelocityXEach(0)
    cactuzao.setVelocityXEach(0)
    if( mousePressedOver(recomeco)){
    restart()
    }
  }
  //impedir que o trex caia
  trex.collide(transparente)
  drawSprites();
}
function restart(){
inicio = "start"
cactuzao.destroyEach()
nuvao.destroyEach()
trex.changeAnimation("running", trex_running);
recomeco.visible=false
fim.visible =false
pontuacao =0

}
function geradordenuvens() {
  if (frameCount % 90 === 0) {
    nuvem = createSprite(width-20, 20)
    nuvem.addImage(nuvenzinha)
    nuvem.velocityX = -4
    nuvem.scale = 0.8
    nuvem.y = Math.round(random(25, height/2 -30))
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1
    nuvem.lifetime = 1000
    nuvao.add(nuvem)
  }
}

function geradordecactos() {
  if (frameCount % 90 === 0) {
    cacto = createSprite(width-10,height-37)
    cacto.velocityX = -(5+pontuacao/100)
    cacto.lifetime = 1000
    cacto.scale = 0.6
    cactuzao.add(cacto)
    var bau = Math.round(random(1, 6))
    switch (bau) {
      case 1:
        cacto.addImage(cactozinho1)
        break;
      case 2:
        cacto.addImage(cactozinho2)
        break;
      case 3:
        cacto.addImage(cactozinho3)
        break;
      case 4:
        cacto.addImage(cactozinho4)
        break;
      case 5:
        cacto.addImage(cactozinho5)
        break;
      case 6:
        cacto.addImage(cactozinho6)
        break;

      default:
        break;
    }
  }

}