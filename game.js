
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var isGameStarted = false;

var level = 0;

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("h1").text("Level " + level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(document).keypress(function () {

    if (!isGameStarted) {
        nextSequence(level);
        isGameStarted = true;
    }
});

$(".btn").click(function (event) {
    // game not started and we press key..
    if (isGameStarted === false) {
        playSound("wrong");
        return;
    }

    var userChosenColor = $(event.target).attr('id')
    userClickedPattern.push(userChosenColor);
    checkAns(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

});
var ind = 0;
function checkAns(userChosenColor) {

    if (userChosenColor !== gamePattern[ind]) {
        startOver();
        return;
    }
    ind++;
    if (ind === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
            ind = 0;
            userClickedPattern = [];
        }, 1000);
    }
}
function startOver() {
    level = 0;
    ind = 0;
    isGameStarted = false;
    userClickedPattern = [];
    gamePattern = [];
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}
