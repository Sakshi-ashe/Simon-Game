var level = 0; 
var toggle = true;

$(document).on("keypress",function () {
  console.log("key pressed !");
   if(toggle){
    toggle = false;
    nextSequence(level);    
   }
   

})

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

 
 playSound(userChosenColour);

 animatePress(userChosenColour);
  
 if( userClickedPattern.length === level){
    checkPattern(userClickedPattern,gamePattern,level);
    userClickedPattern = [];
 }

 console.log("userClickedPattern.length "+userClickedPattern.length);
 

});

function nextSequence() {

  $("h1").text("level "+ level);
  level = level + 1;
  console.log("level in next sequence: "+ level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkPattern( array1 , array2 , level )  {
  if(array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]}) ){
    setTimeout(() => {
      console.log("true")
      nextSequence();
     }, 1000);

     
  }

  else{
    
    $("h1").html("You lost. Press any key to restart.");
    $("body").addClass("game-over");
    playSound("wrong");
    startOver();
    
  }

  
    
}


function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  toggle = true;
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 1000);
}
