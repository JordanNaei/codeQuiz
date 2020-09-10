// Assigning Vars
var startBtn = document.querySelector(".starter");
var starterSec = document.getElementById("begining");
var quesitonsSec = document.getElementById("questions");
var showQuestions = document.getElementById("whereQuestions");
var toDisplayAnswers = document.querySelectorAll(".answers");
var secondsDisplay = document.getElementById("seconds");
var minutesDisplay = document.getElementById("minutes");
var multipleChoice = document.querySelectorAll(".answers");
var buttonsWrapper = document.getElementById("buttonContainer");
var outcome = document.getElementById("resultAnswer");
var outcomeDiv = document.getElementById("result");
var scoreCountText = document.getElementById("scoreCount");
var questionsCountText = document.getElementById("questionCount");
var toHide = true;
var arrayIndex = 0;
var questions = [
    {
      question:
        "Which of the following is the correct syntax to display “JordanNaei” in an alert box using JavaScript?",
      an0: "alertbox(“JordanNaei”);",
      an1: "msg(“JordanNaei”);",
      an2: "msgbox(“JordanNaei”);",
      an3: "alert(“JordanNaei”);",
      answer: 3,
    },
    {
      question:
        "What is the correct syntax for referring to an external script called “script.js”?",
      an0: "<script src=”script.js”>",
      an1: "<script href=”script.js”>",
      an2: "<script ref=”script.js”>",
      an3: "<script name=”script.js”>",
      answer: 0,
    },
    {
      question: "Which of the following is an advantage of using JavaScript?",
      an0: "Increased interactivity.",
      an1: "Less server interaction.",
      an2: "Immediate feedback from the users.",
      an3: "All of the above.",
      answer: 3,
    },
    {
      question: "The external JavaScript file must contain <script> tag",
      an0: "false",
      an1: "true",
      an2: "neither",
      an3: "sometimes",
      answer: 0,
    },
    {
      question: "Which of the following is not a reserved word in JavaScript?",
      an0: "interface",
      an1: "throws",
      an2: "program",
      an3: "short",
      answer: 2,
    },
    {
      question:
        "What is the syntax for creating a function in JavaScript named as jfunc?",
      an0: "function = jfunc()",
      an1: "function jfunc() ",
      an2: "function := jfunc() ",
      an3: "function : jfunc()",
      answer: 1,
    },
    {
      question: "How is a function named jordan is called in JavaScript?",
      an0: "call jordan(); ",
      an1: "call function jordan();",
      an2: "jordan (); ",
      an3: "function jordan();",
      answer: 2,
    },
    {
      question:
        "How to write an ‘if’ statement for executing some code, if 'i' is Not equal to 5",
      an0: "if(i<>5)",
      an1: "if i<>5",
      an2: "if(i!=5)",
      an3: "if i!=5",
      answer: 2,
    },
    {
      question: "What is the correct syntax for adding comments in JavaScript?",
      an0: "<!–This is a comment–&gt",
      an1: "//This is a comment",
      an2: "–This is a comment",
      an3: "**This is a comment**",
      answer: 1,
    },
    {
      question: "What is the JavaScript syntax for printing values in Console?",
      an0: "print(5)",
      an1: "console.log(5);",
      an2: "console.print(5);",
      an3: "print.console(5);",
      answer: 1,
    },
  ],
  availableQuestions = [...questions];
var currentQuestion;
var questionsIndex = 0;
var questionsCounter = 0;
var maxQuestionsCount = 10;
var acceptingAnswers = false;
var scoreBonus = 10;
var score = 0;
var answer;

// Writing Functions
function startTimer() {
  hideStarter();
  getQuestions();
  var secondsElapsed = 0;
  var totalSeconds = 90;

  var timerInterval = setInterval(function () {
    if (!answer) {
      totalSeconds -= 5;
      answer = true;
    } else {
      console.log("correct answer");
    }
    secondsElapsed++;
    if (secondsElapsed >= totalSeconds) {
      clearInterval(timerInterval);
      localStorage.setItem("latestScore", score);
      return window.location.assign("endGame.html");
    } else {
      var secondsLeft = totalSeconds - secondsElapsed;
      minutesDisplay.textContent = Math.floor(secondsLeft / 60);
      secondsDisplay.textContent = secondsLeft % 60;
    }
  }, 1000);
}

function hideStarter() {
  if (toHide) {
    toHide = false;
    starterSec.setAttribute("class", "hide");
    quesitonsSec.removeAttribute("class", "hide");
    return toHide;
  }
}

function getQuestions() {
  if (availableQuestions.length == 0) {
    localStorage.setItem("latestScore", score);
    return window.location.assign("endGame.html");
  }
  questionsCounter++;
  questionsCountText.textContent = questionsCounter + "/" + maxQuestionsCount;
  var random = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[random];
  showQuestions.textContent = currentQuestion.question;

  toDisplayAnswers.forEach((toDisplayAnswer) => {
    var buttonIndexing = toDisplayAnswer.dataset["id"];
    toDisplayAnswer.textContent = currentQuestion["an" + buttonIndexing];
  });

  availableQuestions.splice(random, 1);
  acceptingAnswers = true;
}

toDisplayAnswers.forEach((toDisplayAnswer) => {
  toDisplayAnswer.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var crossAnswer = selectedChoice.dataset["id"];
    console.log(crossAnswer == currentQuestion.answer);

    if (crossAnswer == currentQuestion.answer) {
      incrementScore(scoreBonus);
      outcomeDiv.removeAttribute("class", "hide");
      outcome.textContent = "Correct";
      setTimeout(() => {
        outcomeDiv.setAttribute("class", "hide");
        getQuestions();
      }, 300);
    } else {
      outcomeDiv.removeAttribute("class", "hide");
      outcome.textContent = "Wrong";
      answer = false;
      setTimeout(() => {
        outcomeDiv.setAttribute("class", "hide");
        getQuestions();
      }, 300);
    }
  });
});

function incrementScore(number) {
  score += number;
  scoreCountText.textContent = score;
}

// Adding an event
startBtn.addEventListener("click", startTimer);
