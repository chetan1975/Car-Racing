+class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200,20,40)

    car2 = createSprite(140,200,20,40)

    car3 = createSprite(180,200,20,40)

    car4 = createSprite(220,200,20,40)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      // var display_position = 130;
      var index = 0;
      var x=0;
      var y;


      for(var plr in allPlayers){
        index = index + 1;
        x=x+60;
        y=displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        
        if (index === player.index){
          cars[index-1].shapeColor = "red"
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
          

   
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
