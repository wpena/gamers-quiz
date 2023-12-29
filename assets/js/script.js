// console.log(quizQuestions); --> checking to make sure can access the questions js file 

/*
Create a code quiz that contains the following requirements: (5 Quiz questions is enough)

A start button that when clicked a timer starts and the first question appears.

Questions contain buttons for each answer.
When answer is clicked, the next question appears
If the answer clicked was incorrect then subtract time from the clock
The quiz should end when all questions are answered or the timer reaches 0.

When the game ends, it should display their score and give the user the ability to save their initials and their score
*/


// Set of questions --> array of objects
// Each question needs the following
// Question text
// Set of answers
// Which answer is correct

// Landing Page
// Explanation of the quiz
// Start button

// When click the start button
// Landing page goes away
// Timer starts
// The first question appears (with its answers)

// For each question
// User clicks an answer
// Their choice is compared to the correct answer as stored in the question's object
// If correct, tell them
// If incorrect, tell them and subract time from the timer
// Optional: Play sound for correct or incorrect answer
// Either way, the question disappears after a few seconds and the next question appears

// After the last question
// Timer stops
// Question disappears
// Form appears for user to enter their intials
// Display their score

// User submits form
// Initials and score get stored in local storage
// User is taken to the high score page
// High scores are listed, sorted highest to lowest
// User has the option to take the quiz again

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
  if (playerAnswer === correctAnswer ) {
    showFeedback('Correct!', 'green');
    questionIndex++;
  } else {
    showFeedback('Wrong! -10 seconds!', 'red');
    timeLeft -= 10;
    questionIndex++;
  }

  setTimeout(function() {
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

  setTimeout(function() {
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
  submitBtn.addEventListener('click', function() {
    let playerInitials = initialsInput.value.trim();

    if (playerInitials !== '');
    let highScore = JSON.parse(localStorage.getItem('highScore')) || [];
    highScore.push({ initials: playerInitials, score: timeLeft });
    localStorage.setItem('highScore', JSON.stringify(highScore));
  });
}