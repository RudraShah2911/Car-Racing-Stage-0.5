class Game {
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
      var playerCountRef = await database.ref('playerCount').once("value")
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val()
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    text("The Game has Started!!",120,100)
    Player.getPlayerInfo()
    if (allPlayers!==undefined){
      var position = 130
      for (var p in allPlayers){
        if (p ==="player" + player.index){
          fill("red")
        }
        else{
          fill("black")
        }
        text(allPlayers[p].name + ":" + allPlayers[p].distance, 120, position)
        position = position + 20
      }
    }
    if((keyIsDown(UP_ARROW))&&(player.index!==null)){
      player.distance = player.distance + 50
      player.update()
    }
  }
}
