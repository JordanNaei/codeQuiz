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
var toHide= true;
var arrayIndex=0;
var questions= [{question : "How well are you doing?",
                 answers: [
                {text: "Not Good", correct: true},
                {text: "Very Good", correct: false},
                {text: "Terrible", correct: false},
                {text: "Awsome", correct: false}
                ]
                },
                {question : "What the hell is going on?",
                answers:[
                {text: "notging", correct: false},
                {text: "beornottobe", correct: true},
                {text: "m", correct: false},
                {text: "y", correct: false}
                ]
               },    
               {question : "What are you doing?",
               answers: [
               {text: "gogogog", correct: false},
               {text: "ffdfdfd", correct: true},
               {text: "mamama", correct: false},
               {text: "daaaaa", correct: false}
               ]
              }]

var availableQuestions = [...questions];
var currentQuestion;
var questionsIndex=0;
var questionsCounter=0;
var acceptingAnswers= false;


// Writing Functios
function startTimer() {
    hideStarter ();
    getQuestions();
    var secondsElapsed=0;
    var totalSeconds=90;
    var timerInterval = setInterval(function() {
        secondsElapsed++;
        if (secondsElapsed >= totalSeconds){
            clearInterval (timerInterval);
            return;
            // endGame();
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
    if (availableQuestions.length === 0) {
        return window.location.assign("endGame.html");
    }
    questionsCounter++;
    var random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[random];
    showQuestions.textContent = currentQuestion.question;
   
    for (var j=0; j < toDisplayAnswers.length; j++) {
        var buttonIndexing = toDisplayAnswers[j];
        toDisplayAnswers[j].textContent = currentQuestion.answers[j].text; 
    }

 availableQuestions.splice(random,1);
 console.log(availableQuestions);
 acceptingAnswers = true;
}

buttonsWrapper.addEventListener("click", function(e){
    if (event.target.matches("button")) {
    e.preventDefault();
        if(!acceptingAnswers){return;}
    acceptingAnswers=false;
    var selectedChoice = e.target;
    var selectedAns = selectedChoice.dataset['id'];

    
    console.log(selectedAns);
    getQuestions();
    }
});






// forEach(toDisplayAnswer =>{
//     toDisplayAnswer.addEventListener("click", function(e){
//         e.preventDefault();
//         if(!acceptingAnswers) {
//             return;
//         }
// acceptingAnswers=false;
// var selectedChoice = e.target;
// var selectedAns = selectedChoice.dataset['id'];
// console.log(selectedAns);
// getQuestions();
//     });
// });



// Adding an event
startBtn.addEventListener("click", startTimer);



