// Assigning Vars
var startBtn = document.querySelector(".starter");
var starterSec = document.getElementById("begining");
var quesitonsSec = document.getElementById("questions");
var showQuestions = document.getElementById("whereQuestions");
var toDisplayAnswers =document.querySelectorAll(".answers");
var secondsDisplay = document.getElementById("seconds");         
var minutesDisplay = document.getElementById("minutes");
var multipleChoice =document.querySelectorAll(".answers");
var buttonsWrapper =document.getElementById("buttonContainer");
var outcome = document.getElementById("resultAnswer");
var outcomeDiv = document.getElementById("result");
var scoreCountText = document.getElementById("scoreCount");
var questionsCountText = document.getElementById("questionCount");
var toHide= true;
var arrayIndex=0;
var questions= [
               {question : "How well are you doing?", 
                an0: "Not Good",
                an1: "Very Good",
                an2: "Terrible",
                an3: "Awsome",
                answer: 2},
                {question : "How well mnmmnn?", 
                an0: "Nmnmn",
                an1: "Very",
                an2: "Terr",
                an3: "Aws",
                answer: 3},
                {question : "How well ddfgdgfdf?", 
                an0: "Not",
                an1: "Good",
                an2: "Terri",
                an3: "Awshjghjkhjk",
                answer: 1},
                {question : "What does '7ARAH mean?", 
                an0: "shit",
                an1: "Good",
                an2: "choclote",
                an3: "Awshjghjkhjk",
                answer: 1}
                ],
                

availableQuestions = [...questions];
var currentQuestion;
var questionsIndex=0;
var questionsCounter=0;
var maxQuestionsCount=10;
var acceptingAnswers= false;
var scoreBonus=20;
var score=0;


// Writing Functions
function startTimer() {
    hideStarter ();
    getQuestions();
    var secondsElapsed=0;
    var totalSeconds=90;
    var timerInterval = setInterval(function() {
        secondsElapsed++;
        if (secondsElapsed >= totalSeconds){
            clearInterval (timerInterval);
            localStorage.setItem("latestScore", score);
            return window.location.assign("endGame.html");
        }
        else {
            var secondsLeft = (totalSeconds - secondsElapsed);
            minutesDisplay.textContent = Math.floor(secondsLeft /60);
            secondsDisplay.textContent= (secondsLeft % 60);
        }
    }, 1000);
  }

function hideStarter () {
    if (toHide) {
        toHide= false;
        starterSec.setAttribute("class", "hide");
        quesitonsSec.removeAttribute ("class", "hide");
   return toHide;
    }
}

function getQuestions () {
    if (availableQuestions.length == 0) {
        localStorage.setItem("latestScore", score);
        return window.location.assign("endGame.html");
    }
    questionsCounter++;
    questionsCountText.textContent = questionsCounter +"/" + maxQuestionsCount; 
    var random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[random];
    showQuestions.textContent = currentQuestion.question;
   
    toDisplayAnswers.forEach(toDisplayAnswer =>{
        var buttonIndexing = toDisplayAnswer.dataset['id'];
        toDisplayAnswer.textContent= currentQuestion["an"+buttonIndexing];
    });

 availableQuestions.splice(random,1);
 acceptingAnswers = true;
};

toDisplayAnswers.forEach(toDisplayAnswer =>{
    toDisplayAnswer.addEventListener("click",e =>{
        e.preventDefault();
        e.stopPropagation();
        if (!acceptingAnswers){return};

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var crossAnswer = selectedChoice.dataset['id'];
    console.log (crossAnswer == currentQuestion.answer);

    if (crossAnswer == currentQuestion.answer){
        incrementScore(scoreBonus);
        outcomeDiv.removeAttribute("class", "hide");
        outcome.textContent = "Correct";
        setTimeout (()=> {
            outcomeDiv.setAttribute("class", "hide");
            getQuestions();
        }, 300);
    }
    else{
        outcomeDiv.removeAttribute("class", "hide");
        outcome.textContent = "Wrong";
        setTimeout (()=> {
            outcomeDiv.setAttribute("class", "hide");
            getQuestions();
        }, 300);
    }
   
    
});
    });

function incrementScore (number) {

    score+=number;
    scoreCountText.textContent= score;

}

// Adding an event
startBtn.addEventListener("click", startTimer);




