// Get elements
const scoresList = document.getElementById('highscores');
const clearBtn = document.getElementById('clear');

// Retrieve player high score from local storage
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

// Sort the retrieved scores in descending order
highScore.sort(function (firstScore, secondScore) {
    return secondScore.score - firstScore.score;
});

// Loop through the list element and display the scores as an ordered list
for (let i = 0; i < highScore.length; i++) {
    const li = document.createElement('li');
    li.textContent = highScore[i].initials + ` - ${highScore[i].score}`;
    scoresList.appendChild(li);
}

// Click all scores when clear button is clicked
clearBtn.addEventListener('click', function() {
    localStorage.removeItem('highScore');
    scoresList.innerHTML = '';
});