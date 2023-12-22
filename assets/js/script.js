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