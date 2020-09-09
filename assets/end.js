// Assigning Vars
var userInput = document.getElementById("username");
var saveButton = document.getElementById("saveScoreBtn");
var finalScoreDisplay = document.getElementById("finalScore");
var latestScore = localStorage.getItem("latestScore");
var highestScores = JSON.parse(localStorage.getItem("highestScores")) || [];
var retryQuizBtn = document.getElementById("goHome");
var goodScoreText = document.getElementById("goodScore");
var averageScoreText = document.getElementById("averageScore")
var badScoreText = document.getElementById("badScore")

finalScoreDisplay.textContent = latestScore;

if (latestScore < 60) {
    badScoreText.removeAttribute("class","hide");
}
else if (latestScore >= 60 && latestScore <= 80){
    averageScoreText.removeAttribute("class","hide");
}
else if (latestScore > 80) {
goodScoreText.removeAttribute("class","hide");
}


userInput.addEventListener ("keyup", function(){ 
            if (!userInput.value){
                saveButton.disabled=true;
            }
            else{
                saveButton.disabled=false;
            }
  });


saveButton.addEventListener("click", saveHighScores);
function saveHighScores (e) {
e.preventDefault();
var scoreObj = {
    score : latestScore,
    name : userInput.value
};
highestScores.push(scoreObj);
highestScores.sort((a,b)=>b.score - a.score);
highestScores.splice(5);
localStorage.setItem('highestScores', JSON.stringify(highestScores));
window.location.assign("index.html");
};

retryQuizBtn.addEventListener("click", function(e){
    e.preventDefault();
    window.location.assign("index.html");
})