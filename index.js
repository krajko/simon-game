var buttonColours = ['red' ,'green', 'yellow', 'blue'];
var gamePattern = [];
var level = 0;
var currentLevel = 0;
var clickPattern = [];

function newGame() {
    $(document).keypress(function () {
        $(document).off('keypress');
        startGame();       
    });
}

function startGame() {
    
    gamePattern = [];
    level = 0;
    currentLevel = 0;
    clickPattern = [];

    nextSequence();

    $('.btn').click(function () {
        var clickedColor = this.id;
        console.log('clicked color: ', clickedColor)

        clickPattern.push(clickedColor);
        console.log('click pattern: ' , clickPattern);

        console.log(currentLevel);
        checkAnswer(currentLevel);
            
        if (clickPattern.length == gamePattern.length) {
            nextSequence();
        } else {
            currentLevel++;
        }
    });


    
}

function checkAnswer(currentLevel) {
    if (clickPattern[currentLevel] == gamePattern[currentLevel]) {
        playSound(gamePattern[currentLevel]);
        animatePress(gamePattern[currentLevel]);
        return;
    } else {
        playSound('wrong');
        endGame();
    }
}

function nextSequence() {
    clickPattern = [];
    level++;
    currentLevel = 0;
    $('#level-title').text(`Level ${level}`);
    
    randomNumber = Math.floor(Math.random() * 4);
    randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
        
    setTimeout(function () {
        playSound(randomColor);
        animatePress(randomColor);
    }, 800);

}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(name) {
    $(`#${name}`).addClass('pressed');
    setTimeout(function () {
        $(`#${name}`).removeClass('pressed');
    }, 100);
}

function endGame() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 800);
    $('#level-title').text('Game over, press any key to restart');
    
    gamePattern = [];
    $('.btn').off('click');

    newGame();       
}

newGame();