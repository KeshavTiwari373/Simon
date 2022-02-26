
var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$('.btn').on('click',function(event){
   var userChosenColor = event.target.id;

  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        // let userClickedPattern = [];
      } ,1000);
    }

  }  else{
    console.log("wrong");
    playSound("wrong");
    $('body')
    .addClass("game-over")
    .delay(200)
    .queue(function(next){
      $(this).removeClass("game-over");
      next();
    });
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){

  userClickedPattern = [];

  level++;

    $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColor = buttonColor[randomNumber];
   gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn('fast').fadeOut('fast').fadeIn('fast');
  // animatePress(randomChosenColor);
   playSound(randomChosenColor);

}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour)
  .addClass("pressed")
  .delay(100)
  .queue(function(next){
    $(this).removeClass("pressed");
    next();
  });
}
