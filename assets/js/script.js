const startBtn = document.getElementById('start');
const questionsEl = document.getElementById('questions');
const timeEl = document.getElementById('time');
const questionTitle = document.getElementById('question-title');
const choicesEl = document.getElementById('choices');
const feedBackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('final-score');
const endScreenEl = document.getElementById('end-screen');
let initialsInput = document.getElementById("initials");
let submitBtn = document.getElementById('submit');


let questionIndex = 0;

// Set the initial time for the quiz to 60 seconds
let timeLeft = 60;

// Listen for button click to start quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startBtn.parentNode.classList.add('hide');

  // Hide landing page and show question
  questionsEl.classList.remove('hide');

  // Show the first question
  showQuestion();

  // Begin countdown
  startTimer();
}


// Function to display a question
function showQuestion() {
  const currentQuestion = quizQuestions.questions[questionIndex];
  questionTitle.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.textContent = currentQuestion.choices[i];
    choiceBtn.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceBtn);
  }
}

function startTimer() {
  // Start timer once button is clicked
  let timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0 || questionIndex === quizQuestions.questions.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function checkAnswer(playerChoice) {
  const playerAnswer = playerChoice.target.textContent;
  const correctAnswer = quizQuestions.questions[questionIndex].answer;

  // Compare selected answer to correct answer
  if (playerAnswer === correctAnswer) {
    showFeedback('Correct!', 'green');
    questionIndex++;
  } else {
    showFeedback('Wrong! -10 seconds!', 'red');
    timeLeft -= 10;
    questionIndex++;
  }

  setTimeout(function () {
    if (questionIndex < quizQuestions.questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  });
}

function showFeedback(feedback, color) {
  feedBackEl.textContent = feedback;
  feedBackEl.style.color = color;
  feedBackEl.classList.remove('hide');

  setTimeout(function () {
    feedBackEl.classList.add('hide');
  }, 500);
}

function endQuiz() {
  questionsEl.classList.add('hide');
  endScreenEl.classList.remove('hide');
  scoreEl.textContent = timeLeft;
}
saveQuiz();

function saveQuiz() {
  submitBtn.addEventListener('click', function () {
    let playerInitials = initialsInput.value.trim();

    if (playerInitials !== '');
    let highScore = JSON.parse(localStorage.getItem('highScore')) || [];
    highScore.push({ initials: playerInitials, score: timeLeft });
    localStorage.setItem('highScore', JSON.stringify(highScore));

    // Redirect to high scores page
    window.location.href = './assets/pages/highscores.html';
  });
}