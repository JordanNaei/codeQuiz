var goHomeBtn = document.getElementById("showScoreBtn");
var scoresListNames = document.querySelectorAll(".names");
var highestScores = JSON.parse(localStorage.getItem("highestScores")) || [];



for (var i=0; i < highestScores.length; i++){
    var name = highestScores[i].name;
    var scoreValue = highestScores[i].score;
    scoresListNames[i].textContent = name + " ------------ "+ scoreValue;
}
 



goHomeBtn.addEventListener("click", function(){
    window.location.assign("index.html");
})