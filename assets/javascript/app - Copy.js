// on load of page set on click for the lets play button.
window.onload = function () {
    $("#letsPlay").on("click", letsPlay);
};


// make array of my questions.
var myQuestions = [
    {
        question: "Which Beatle crossed Abbey Road first?",
        answers: {
            a: 'John',
            b: 'George',
            c: 'Ringo',
            d: 'Paul'
        },
        correctAnswer: 'a'
    },
    {
        question: "Which of the following songs contributed to the rumor that Paul had died?",
        answers: {
            a: 'Penny Lane',
            b: 'Hey Jude',
            c: 'Strawberry Fields Forever',
            d: 'Yesterday'
        },
        correctAnswer: 'c'
    },
    {
        question: "What name did the group go by before they were the Beatles?",
        answers: {
            a: 'The Quarrymen',
            b: 'Johnny and the Moondogs',
            c: 'The BlackJacks',
            d: 'All of the above'
        },
        correctAnswer: 'd'
    },
    {
        question: "Where were the Beatles originally formed?",
        answers: {
            a: 'Manchester',
            b: 'London',
            c: 'Hamburg',
            d: 'Liverpool'
        },
        correctAnswer: 'd'
    },
    {
        question: "What was the Beatles first single?",
        answers: {
            a: 'Please Please Me',
            b: 'Love Me Do',
            c: 'I Saw Her Standing There',
            d: 'Twist And Shout'
        },
        correctAnswer: 'b'
    }
];



// make my variables.

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var intervalId;
var clockRunning = false;
var time = 60;


// run reset function
function reset() {
    time = 60;
    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
    resultsContainer.innerHTML = "";

    // Change the "display" div to "00:00"
    $("#timeDisplay").text("01:00");

}

// start the count and set clock to running (counting down).
function letsPlay() {
    if (!clockRunning) {
        reset();
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

// stop the clock
function stop() {
    clearInterval(intervalId);
    clockRunning = false;
    console.log("teststop", clockRunning);
}

// increment the time by 1 second and save the results in the variable and in the div.
function count() {
    time--;
    var converted = timeConverter(time);
    console.log(converted);
    $("#timeDisplay").text(converted);
    console.log(time);
    if (time < 1) {
        showResults(myQuestions, quizContainer, resultsContainer);
        stop();
        alert("Time is OUT!");
    }
}

// converter function
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}



generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    showQuestions(myQuestions, quizContainer);
    // on submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
        stop();
    }
}

function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // first reset the list of answers
        answers = [];

        // for each available answer...
        for (letter in questions[i].answers) {

            // ...add an html radio button
            answers.push(
                '<label>'
                + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                + " " + letter + ': '
                + questions[i].answers[letter]
                + '</label>'
            );
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].question + '</div>'
            + '<div class="answers">' + answers.join('  ') + '</div>'
        );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
}


function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

        // if answer is correct
        if (userAnswer === questions[i].correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[i].style.color = 'red';
        }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

    // show questions right away
    //showQuestions(questions, quizContainer);




