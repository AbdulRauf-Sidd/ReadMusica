document.getElementById('optionsb').addEventListener('click', function() {
    document.getElementById('options').style.display = 'block';
    resetGame()
});
  
document.getElementById('closeoptions').addEventListener('click', function() {
    document.getElementById('options').style.display = 'none';
});

document.getElementById('savebutton').addEventListener('click', function() {
    //document.getElementById('gameover').style.display = 'none';
    closegameover()
});

document.getElementById('closegameover').addEventListener('click', function() {
    //document.getElementById('gameover').style.display = 'none';
    resetGame();
    gameover.style.display = 'none';
});

function pop() {
    document.getElementById('overpopup').style.display = 'block';
    scoreDisplay.textContent = score;
};

function popout() {
    document.getElementById('overpopup').style.display = 'none';
};

// var audio = document.getElementById("myAudio");
var correctAudio = new Audio('sounds/correct_sound_effect.mp3');
var wrongAudio = new Audio('sounds/wrong_sound_effect.mp3');

// Play the audio
function playAudio() {
  sound = true;
}

// Pause the audio
function pauseAudio() {
  sound = false;
}

function playCorrect() {
    if (sound) {
        correctAudio.play();
    }
}

function playWrong() {
    if (sound) {
        wrongAudio.play();
    }
}

  
  
/*const alto = [
    'altoclef-c3.png', 'altoclef-c4.png', 'altoclef-c5.png', 'altoclef-d3.png', 'altoclef-e3.png',
    'altoclef-f4.png', 'altoclef-g3.png', 'altoclef-g4.png', 'altoclef-a3.png', 'altoclef-d4.png',
    'altoclef-e4.png', 'altoclef-f3.png',
]

const bass = [
    'bassclef-a2.png', 'bassclef-a3.png', 'bassclef-b2.png', 'bassclef-b3.png', 'bassclef-c2.png',
    'bassclef-c3.png', 'bassclef-c4.png', 'bassclef-d2.png', 'bassclef-d3.png', 'bassclef-e2.png',
    'bassclef-e3.png', 'bassclef-f2.png', 'bassclef-f3.png', 'bassclef-g2.png', 'bassclef-g3.png'
]

const treble = [
    'trebleclef-a4.png', 'trebleclef-a5.png', 'trebleclef-b4.png', 'trebleclef-b5.png', 'trebleclef-c4.png',
    'trebleclef-c5.png', 'trebleclef-c6.png', 'trebleclef-d4.png', 'trebleclef-d5.png', 'trebleclef-e4.png',
    'trebleclef-f4.png', 'trebleclef-f5.png', 'trebleclef-g4.png', 'trebleclef-g5.png',
]*/


const baseA = [44, 45, 56, 57]; 
const baseB = [46, 47, 58, 59];
const baseC = [48, 60];
const baseD = [49, 50];
const baseE = [39, 40, 51, 52];
const baseF = [41, 53];
const baseG = [42, 43, 54, 55];

const altoA = [56, 57, 68, 69]; 
const altoB = [58, 59];
const altoC = [60];
const altoD = [49, 50, 61, 62];
const altoE = [51, 52, 63, 64];
const altoF = [53, 65];
const altoG = [54, 55, 66, 67];

const trebleA = [68, 69, 80, 81]; 
const trebleB = [70, 71];
const trebleC = [60];
const trebleD = [61, 62, 73, 74];
const trebleE = [63, 64, 75, 76];
const trebleF = [65, 77];
const trebleG = [66, 67, 78, 79];

const allClefs = [[altoA, altoB, altoC, altoD, altoE, altoF, altoF],
                [baseA, baseB, baseC, baseD, baseE, baseF, baseG],
                [trebleA, trebleB, trebleC, trebleD, trebleE, trebleF, trebleG]
                ]


const staffDiv1 = document.getElementById("staffDiv1");
const staffDiv2 = document.getElementById("staffDiv2");
var staff1;
var staff2;
const buttons = document.querySelectorAll(".btn");
const scoreDisplay = document.getElementById("score-value");
const livesDisplay = document.getElementById("lives-value");
const levelDisplay = document.getElementById("level-value");
const errorDisplay = document.getElementById("error-value");
const playButton = document.getElementById("startgame"); // Play button
let checkedCheckboxes = [];

//const positions = ['20%', '40%', '60%', '80%'];

//let currentsource;
//let currentsource2;
let sound = false;
let position = 0;
let position2 = window.innerWidth; // Start position at the far right of the screen
let speed = 6; // Pixels to move per frame
let intervalTime = 30; // Milliseconds per frame
let intervalId;
let intervalId2;
let score = 0;
let lives = 3;
let level = 1;
let error = 0;
let diff = "easy";
let firsthalf = false;
let firsttime = true;
let ahead = 1;
let current = 0;
let time = 1500;
//let playing = false;

var overMessage = document.getElementById('over-message');
var options = document.getElementById('options');
var highscore = document.getElementById('highscore');
var levelb = document.getElementById('level');
var openBtn = document.getElementById('optionsb');
var highscoreb = document.getElementById('highscoreb');
var closeoption = document.getElementById('closeoptions');
var closehigh = document.getElementById('closehigh');
var closelev = document.getElementById('closelevel');
var closehigh2 = document.getElementById('okhigh');
var closelev2 = document.getElementById('oklevel');
var gameover = document.getElementById('gameover');
var finalScore = document.getElementById('final-score');



function openhighscore() {
    highscore.style.display = 'block';
    displayScores();

}

function closehighscore() {
    highscore.style.display = 'none';
}

function openlevel() {
    levelb.style.display = 'block';
    clearInterval(intervalId);
    clearInterval(intervalId2);
    current = 0;
}

function closelevel() {
    levelb.style.display = 'none';
    staffDiv2.style.display = 'none';
    ahead = 1;
    generateSVG(1);
    generateSVG(2);
    intervalId = setInterval(function() {moveImage(1);}, intervalTime);
    setTimeout(start, time);
    // intervalId2 = setInterval(function() {moveImage(2);}, intervalTime);
}

function opengameover() {
    // finalScore.textContent = "Score: " + score;
    let scores = loadScores();
    if (scores.length > 0) {
        scores.sort((a, b) => b.score - a.score);
        console.log(score);
        console.log(scores[0].score);
        if (score > scores[0].score) {
            overMessage.textContent = "Congratulations - You have achieved a new high score! Enter your name below.";
        }
        else {
            overMessage.textContent = "Enter your name below.";    
        }
    }
    else {
        overMessage.textContent = "Enter your name below.";
    }
    gameover.style.display = 'block';
}

function closegameover() {
    var name = document.getElementById('playername').value;
    if (name.trim() === "") {
        // Display error message for empty name
        alert("Name is required");
        // Prevent form submission
        return false;
    } else if (/^\s+$/.test(name)) {
        // Display error message for name consisting of spaces only
        alert("Name should not consist of spaces only");
        // Prevent form submission
    }
    else {
        saveScore(name, score);
        resetGame();
        gameover.style.display = 'none';    
    }
}

function saveScore(playerName, score) {
    let scores = JSON.parse(localStorage.getItem('gameScores')) || [];
    scores.push({ playerName: playerName, score: score });
    localStorage.setItem('gameScores', JSON.stringify(scores));
}

// Load scores
function loadScores() {
    return JSON.parse(localStorage.getItem('gameScores')) || [];
}

function displayScores() {
    let scores = loadScores();
    let scoreList = document.getElementById('scorelist');

    // Clear previous list items
    scoreList.innerHTML = '';

    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);

    // Populate the list with scores
    scores.forEach(function(scoreObj) {
        let listItem = document.createElement('li');
        let playerName = scoreObj.playerName;
        let score = scoreObj.score;
        let formattedScore = scoreObj.score.toString().padStart(5, ' '); // Ensure consistent spacing

        // Create player name and score elements
        let playerSpan = document.createElement('span');
        playerSpan.textContent = playerName;

        let scoreSpan = document.createElement('span');
        scoreSpan.textContent = 'Score: ' + formattedScore;
        scoreSpan.classList.add('score'); // Apply CSS class for consistent spacing

        // Append elements to list item
        listItem.appendChild(playerSpan);
        listItem.appendChild(scoreSpan);
        scoreList.appendChild(listItem);
    });
}

// Event listener to open the popup when the button is clicked
highscoreb.addEventListener('click', openhighscore);

// Event listener to close the popup when the close button is clicked

closehigh.addEventListener('click', closehighscore);
closehigh2.addEventListener('click', closehighscore);

closelev.addEventListener('click', closelevel);
closelev2.addEventListener('click', closelevel);

// Event listener to close the popup when the user clicks outside of it
/*window.addEventListener('click', function(event) {
    if (event.target === popup) {
        closePopup();
    }
});*/

document.addEventListener("DOMContentLoaded", function() {
    playButton.addEventListener("click", function() {
        document.getElementById('options').style.display = 'none';
        play(); // Call the play function when the play button is clicked
    });
});
    

function generateSVG(number) {

    if (number == 1) {
        position = window.innerWidth * 1.08;
        staffDiv1.style.left = position + 'px';
    } else if (number == 2) {
        position2 = window.innerWidth * 1.08;
        staffDiv2.style.left = position2 + 'px';
    }

    let clef = generateRandomClef();

    var options = {
        id: "myStaff"+number,
        at: "staffDiv"+number,
        clef: clef,
        accidental: "flat",
        color: "#000000"
    }

    let generatednotes = [];
    
    while (generatednotes.length < level) {
        let note = generateRandomNotes(clef);
        generatednotes.push(note);
    }

    if (number == 1) {
        staff1 =  new Staff(options);
        staff1.setNotesWithDistance(generatednotes, number);
        staffDiv1.style.transform = 'translateY(85%)';
    } else if (number == 2) {
        staff2 =  new Staff(options);
        staff2.setNotesWithDistance(generatednotes, number);
        staffDiv2.style.transform = 'translateY(135%)';
    }
}
    // Function to move the image
function moveImage(number) {
    let out = -window.innerWidth*0.1
    if (number == 1) {
        position -= speed;
        staffDiv1.style.left = position + 'px';

        // Calculate 15% of the screen's width
        const point = window.innerWidth * 0.85;
        // Check if image has moved 15% of the screen's width
        if (position <= point) {
            firsthalf = true;
        }
        // Check if image reaches the far left of the screendivLeft + divWidth
         

        if (position <= out) {
            firsthalf = false;
            ahead = 2;
            current = 0;
            generateSVG(1);
            updateLives();

        }
    }

    else if (number == 2) {

        staffDiv2.style.display = 'block';
        position2 -= speed;
        staffDiv2.style.left = position2 + 'px';
        firsttime = false;
        if (position2 <= out) {
            ahead = 1;
            current = 0;
            generateSVG(2);
            updateLives();
        }
    }
    
}

/*function moveImage2() {
    if (diff === 'medium' || diff === 'hard') {
        if (firsttime == true) {
            if (firsthalf) {
                firsttime = false;
            const movingImage2 = document.getElementById("moving-image2");
            movingImage2.style.display = 'block';
            position2 -= speed;
            movingImage2.style.left = position2 + 'px';
            }
        } else {
            const movingImage2 = document.getElementById("moving-image2");
            movingImage2.style.display = 'block';
            position2 -= speed;
            movingImage2.style.left = position2 + 'px';
        }
        // Calculate 30% of the screen's width
        /*const point = window.innerWidth * 0.3;

        if (position2 <= point) {
            secondhalf = true;
        }
        // Check if image reaches the far left of the screen
        if (position2 <= -movingImage2.width) {
            ahead = 1;
            newImage2();
            updateLives();
        }
    }
    //newImage2()
}*/
 
    // Function to update lives
    function updateLives() {
        error = error + 1;
        lives = lives - 1;
        errorDisplay.textContent = error;
        livesDisplay.textContent = lives;
        

        if (lives === 0) {
            gameOver();
            //resetGame();
        }
    }
    
    // Function to update score
    function updateScore() {
        score += 15;
        scoreDisplay.textContent = score;
        
        // Check for level up
        if (score % 150 === 0) {
            level++;
            levelDisplay.textContent = level;
            if (level <=3) { 
                openlevel();
            }
            else {
                gameOver();
            }
            // Increase speed for the next level
        }
    }
    

function checkinput(pressed, ahead, number) {
    let index;
    let index2;
    let notes;
    let clef;

    if (ahead == 1) {
        notes = staff1.getNotes();
        clef = staff1.getClef();
    } else if (ahead == 2) {
        notes = staff2.getNotes();
        clef = staff2.getClef();
    }    

    console.log(notes);
    // console.log(clef);

    if (clef == 'alto') {
        index = 0;
    }
    else if (clef == 'bass') {
        index = 1; 
    }
    else if (clef == 'treble') {
        index = 2;
    }

    switch (pressed) {
        case 'a':
            index2 = 0;
        break;
        case 'b':
            index2 = 1;
        break;
        case 'c':
            index2 = 2;
        break;
        case 'd':
            index2 = 3;
        break;
        case 'e':
            index2 = 4;
        break;
        case 'f':
            index2 = 5;
        break;
        case 'g':
            index2 = 6;
        break;
    } 
    return allClefs[index][index2].includes(notes[number]);

}

    // Function to handle button clicks
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (level == 1) {
                if (checkinput(button.id, ahead, current)) {
                    playCorrect();
                    if (ahead == 1) {
                        ahead = 2;
                        updateScore();
                        let note0 = document.getElementById("note0");
                        note0.style.fill = 'green';
                        generateSVG(1);
                    }
                    else if (ahead == 2) {
                        ahead = 1;
                        updateScore();
                        let note3 = document.getElementById("note3");
                        note3.style.fill = '#176310';
                        generateSVG(2);
                    }
                }
                else { 
                    playWrong();
                    error++;
                    if (ahead == 1) {
                        ahead = 2;
                        let note0 = document.getElementById("note0");
                        note0.style.fill = 'red';
                        generateSVG(1);
                    }
                    else if (ahead == 2) {
                        ahead = 1;
                        let note3 = document.getElementById("note3");
                        note3.style.fill = 'red';
                        generateSVG(2);
                    }
                }
            }
            else if (level == 2) {
                if (checkinput(button.id, ahead, current)) {
                    playCorrect();
                    if (ahead == 1) {
                        if (current == 0) {
                            let note0 = document.getElementById("note0");
                            note0.style.fill = 'green';
                            updateScore();
                            current += 1;
                        }
                        else if (current == 1) {
                            let note1 = document.getElementById("note1");
                            note1.style.fill = 'green';
                            current = 0;
                            ahead = 2;
                            updateScore();
                            generateSVG(1);
                        }
                    }
                    else if (ahead == 2) {
                        if (current == 0) {
                            let note3 = document.getElementById("note3");
                            note3.style.fill = 'green';
                            updateScore();
                            current += 1;
                        }
                        else if (current == 1) {
                            let note4 = document.getElementById("note4");
                            note4.style.fill = 'green';
                            current = 0;
                            ahead = 1;
                            updateScore();
                            generateSVG(2);
                        }
                    }
                }
                else {
                    playWrong();
                    error++;
                    if (ahead == 1) {
                        if (current == 0) {
                            let note0 = document.getElementById("note0");
                            note0.style.fill = '#c40000';
                            current += 1;
                            console.log("wrong1");
                        }
                        else if (current == 1) {
                            let note1 = document.getElementById("note1");
                            note1.style.fill = '#c40000';
                            current = 0;
                            ahead = 2;
                            console.log("wrong2");
                            generateSVG(1);
                        }
                    }
                    else if (ahead == 2) {
                        if (current == 0) {
                            let note3 = document.getElementById("note3");
                            note3.style.fill = '#c40000';
                            current += 1;
                            console.log("wrong1");
                        }
                        else if (current == 1) {
                            let note4 = document.getElementById("note4");
                            note4.style.fill = '#c40000';
                            current = 0;
                            ahead = 1;
                            console.log("wrong2");
                            generateSVG(2);
                        }
                    }
                }
            }
            else if (level == 3) {
                if (checkinput(button.id, ahead, current)) {
                    playCorrect();
                    if (ahead == 1) {
                        if (current == 0) {
                            let note0 = document.getElementById("note0");
                            note0.style.fill = 'green';
                            current += 1;
                            updateScore();
                        }
                        else if (current == 1) {
                            let note1 = document.getElementById("note1");
                            note1.style.fill = 'green';
                            current += 1;
                            updateScore();
                        }
                        else if (current == 2) {
                            let note2 = document.getElementById("note2");
                            note2.style.fill = 'green';
                            current = 0;
                            ahead = 2;
                            updateScore();
                            generateSVG(1);
                        }
                    }
                    else if (ahead == 2) {
                        if (current == 0) {
                            let note3 = document.getElementById("note3");
                            note3.style.fill = 'green';
                            current += 1;
                            updateScore();
                        }
                        else if (current == 1) {
                            let note4 = document.getElementById("note4");
                            note4.style.fill = 'green';
                            current += 1;
                            updateScore();
                        }
                        else if (current == 2) {
                            let note5 = document.getElementById("note5");
                            note5.style.fill = 'green';
                            current = 0;
                            ahead = 1; 
                            updateScore();
                            generateSVG(2);
                        }
                    }
                }
                else {
                    playWrong();
                    error++;
                    if (ahead == 1) {
                        if (current == 0) {
                            let note0 = document.getElementById("note0");
                            note0.style.fill = 'red';
                            current += 1;
                        }
                        else if (current == 1) {
                            let note1 = document.getElementById("note1");
                            note1.style.fill = 'red';
                            current += 1;
                        }
                        else if (current == 2) {
                            let note2 = document.getElementById("note2");
                            note2.style.fill = 'red';
                            current = 0;
                            ahead = 2;
                            generateSVG(1);
                        }
                    }
                    else if (ahead == 2) {
                        if (current == 0) {
                            let note3 = document.getElementById("note3");
                            note3.style.fill = 'red';
                            current += 1;
                        }
                        else if (current == 1) {
                            let note4 = document.getElementById("note4");
                            note4.style.fill = 'red';
                            current += 1;
                        }
                        else if (current == 2) {
                            let note5 = document.getElementById("note5");
                            note5.style.fill = 'red';
                            current = 0;
                            firsthalf = false; 
                            ahead = 1;
                            generateSVG(2);
                        }
                    }
                }
            }
            errorDisplay.textContent = error;
        });
    });
    
    // Function to handle game over
    function gameOver() {
        clearInterval(intervalId);
        clearInterval(intervalId2);
        opengameover();
    }

    function resetGame() {
        clearInterval(intervalId);
        clearInterval(intervalId2);
        position = window.innerWidth;
        position2 = window.innerWidth;
        staffDiv2.style.display = 'none';
        firsthalf = false;
        firsttime = true;
        ahead = 1;
        score = 0; // Reset score
        lives = 3; // Reset lives
        level = 1; // Reset level
        error = 0;
        checkedCheckboxes = [];
        scoreDisplay.textContent = score;
        livesDisplay.textContent = lives;
        levelDisplay.textContent = level;
        errorDisplay.textContent = error;
    }
    
    function generateRandomClef() {
        const clef = [];
        if (checkedCheckboxes.includes('alto')) {
            clef.push('alto');
        }
        if (checkedCheckboxes.includes('bass')) {
            clef.push('bass');
        }
        if (checkedCheckboxes.includes('treble')) {
            clef.push('treble');
        }
        if (checkedCheckboxes.includes('tenor')) {
            clef.push('tenor');
        }
        
        return clef[Math.floor(Math.random() * clef.length)];
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomNotes(clef) {
        switch(clef) {
            case "treble":
                return getRandomInt(60, 81);
            case "bass":
				return getRandomInt(39, 60);
            case "alto":
				return getRandomInt(49, 69);
        }
    }

    // Function to start the game
    function play() {
        
        if (diff === "easy") {
            speed = 3; // Pixels to move per frame
            intervalTime = 30;

        }
        else if (diff === "medium") {
            speed = 4; // Pixels to move per frame
            intervalTime = 30;
            time = 1200
        }
        else {
            speed = 6; // Pixels to move per frame
            intervalTime = 30;
            time = 800;
        }
        
        console.log("before");
        generateSVG(1);
        console.log("after");
        generateSVG(2);
        staffDiv1.style.display = 'block';
        staffDiv2.style.display = 'block';
        intervalId = setInterval(function() {moveImage(1);}, intervalTime);
        setTimeout(start,time);
    }

    function start() {
        // console.log("hello");
        intervalId2 = setInterval(function() {moveImage(2);}, intervalTime);;
    }


    

    playButton.addEventListener("click", function() {
        const selectedDifficulty = document.querySelector('input[name="seldifficulty"]:checked');
        if (selectedDifficulty == null) {
            diff = 'easy';
        }
        else {
            diff = selectedDifficulty.value;
        }
        const checkboxes = document.querySelectorAll('input[name="CLEF"]');
           
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked && checkbox.value != 'tenor') {
                checkedCheckboxes.push(checkbox.value);
            }
        });
            
        if (checkedCheckboxes.length > 0) {
            console.log("Checked checkboxes:", checkedCheckboxes);
        } else {
            checkedCheckboxes.push('treble')
        }

        document.getElementById('options').style.display = 'none';
    });