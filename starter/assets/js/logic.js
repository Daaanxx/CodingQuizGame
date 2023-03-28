var timer = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var initialsEl = document.querySelector("#initials");
var choices = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");
var startBtn = document.querySelector("#start");

var currentQuestionIndex = 0;
var time = quizQuestions.length * 15;
var timerId;

function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timer.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var title = document.getElementById("question-title");
  title.textContent = currentQuestion.title;
  choices.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choices.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== quizQuestions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timer.textContent = time;
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
    feedback.style.fontSize = "400%";
  } else {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    feedback.style.fontSize = "400%";
  }

  feedback.setAttribute("class", "feedback");
  setTimeout(function () {
    feedback.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === quizQuestions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initialsValue = initialsEl.value.trim();

  if (initialsValue !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initialsValue,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;
