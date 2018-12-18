// Create variables to hold number values.
var wins = 0;
var losses = 0;
var totalScoreNumber = 0;
var computerQuestion = 0;
var crystal1 = 0;
var crystal2 = 0;
var crystal3 = 0;
var crystal4 = 0;
var playAgain = false;

// Build out your on click functions.
$(document).ready(function () {
    $("#crystalImages").hide();
    $("#letsPlay").on("click", startGame);
    $("#crystal1").on("click", crystal1);
    $("#crystal2").on("click", crystal2);
    $("#crystal3").on("click", crystal3);
    $("#crystal4").on("click", crystal4);

    // Create variables that hold references to the places in the HTML where we want to display the results/text.
    var computerQuestionText = document.getElementById("computerQuestion-text");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var totalScoreNumberText = document.getElementById("totalScoreNumber-text");

    // Display what you want the text to say/contain.
    updateScreen();

    // Run function to randomly assign values to each crystal and hide lets play button when let's plan is clicked.
    function startGame() {
        console.log("started");
        computerQuestion = (Math.floor(Math.random() * 120) + 19);
        crystal1 = (Math.floor(Math.random() * 12) + 1);
        crystal2 = (Math.floor(Math.random() * 12) + 1);
        crystal3 = (Math.floor(Math.random() * 12) + 1);
        crystal4 = (Math.floor(Math.random() * 12) + 1);
        totalScoreNumber = 0;
        $("#crystalImages").show();
        updateScreen();
    }

    // When a crystal is clicked, run function to add value to totalScoreNumber.
    function crystal1() {
        console.log(crystal1);
        totalScoreNumber = (totalScoreNumber + crystal1);
        console.log(totalScoreNumber)
        updateScreen();
        checkGameStatus();
    }
    function crystal2() {
        console.log(crystal2);
        totalScoreNumber = (totalScoreNumber + crystal2);
        updateScreen();
        checkGameStatus();
    }
    function crystal3() {
        console.log(crystal3);
        totalScoreNumber = (totalScoreNumber + crystal3);
        updateScreen();
        checkGameStatus();
    }
    function crystal4() {
        console.log(crystal4);
        totalScoreNumber = (totalScoreNumber + crystal4);
        updateScreen();
        checkGameStatus();
    }

    // Update screen text.
    function updateScreen() {
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
        computerQuestionText.textContent = computerQuestion;
        totalScoreNumberText.textContent = totalScoreNumber;
        console.log(totalScoreNumber, computerQuestion);
    }

    function checkGameStatus() {
        console.log(totalScoreNumber, computerQuestion);
        // If totalScoreNumber is greater than computerQuestion then alert lost, add a loss, and confirm if want to play again.
        if (totalScoreNumber > computerQuestion) {
            updateScreen();
            alert("You lost!");
            losses++;
            playAgain = confirm("Do you want to play again?");
            if (playAgain) {
                startGame();
            }
        }

        // If totalScoreNumber is equal to computerQuestion then alert won, add a win, and ask if want to play again.
        console.log(totalScoreNumber, computerQuestion);
        if (totalScoreNumber === computerQuestion) {
            updateScreen();
            alert("You won!");
            wins++;
            playAgain = confirm("Do you want to play again?");
            if (playAgain) {
                startGame();
            }
        }

    };

});

