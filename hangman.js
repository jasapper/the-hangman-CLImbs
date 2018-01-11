var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./word.js");
var Letter = require("./letter.js");

// function Game() {
//     var self = this;
//     this.play = function()  {
//         this.guessesLeft=10;
//         this.nextWord();
//     };

// Pick a new word and it's corresponding letters
var newChallengeWord = new Word();
var newLetter = new Letter();

// Declare inital variables and empty letter arrays
var questionCounter = 0;
var loop = 0;
var maxAttempts = 10;
var attempts = maxAttempts;
var matchedLetterIndex = [];
var matchedLetters = [];
var unmatchedLetters = [];
var letterCount = 0;
var revealedWord = "";
var revealedWordLetterCount = 0;

function gameStartEnd() {
    inquirer.prompt({
        type: "list",
        message: "Welcome to Hangman Shapes! Please select an option to continue:",
        choices: ["Play :)", "Exit :("],
        name: "choice"
    })
        .then(function (response) {
            if (response.choice === "Play :)") {
                gamePlay(attempts);
            } else if (response.choice === "Exit :(") {
                process.exit(0);
            }
        })
}

function gamePlay(attempts) {
    if (attempts <= maxAttempts && attempts > 0) {
        if (loop === 0) {
            var challengeWord = newChallengeWord.pickNewWord(questionCounter);
            console.log("Challenge Word: ", newChallengeWord.disguisedWord);
            letterCount = newLetter.letterCount(challengeWord);
            console.log("Challenge Word length: ", letterCount);

        } else {
            console.log("Challenge Word: ", newChallengeWord.disguisedWord);
        }
        inquirer.prompt({
            type: "input",
            name: "userGuess",
            message: "Guess a letter: "
        }).then(function (guesses) {
            console.log("you guessed: ", guesses.userGuess);
            // convert guessed letter to lowercase
            lcaseUserGuess = guesses.userGuess.toLowerCase();
            // convert challenge word to lowercase
            lcaseChallengeWord = newChallengeWord.storedPick.toLowerCase();
            // check if guessed letter is in the selected word
            var letterFound = lcaseChallengeWord.includes(lcaseUserGuess);
            if (letterFound) {
                for (i = 0; i < lcaseChallengeWord.length; i++) {
                    // if the guesses.userGuess matches a letter in the selectedWord...
                    if (lcaseChallengeWord[i] === lcaseUserGuess) {
                        // push that index into the matchedLetters array
                        matchedLetterIndex.push(i);
                        if (!matchedLetters.includes(lcaseUserGuess)) {
                            matchedLetters.push(lcaseUserGuess);
                        }
                        // replace the _ character by index if a letter matches
                        newChallengeWord.disguisedWord = newChallengeWord.disguisedWord.substr(0, i) + lcaseUserGuess + newChallengeWord.disguisedWord.substr(i + 1);
                        revealedWord = newChallengeWord.disguisedWord;
                    }
                }
            } else {
                // Done: if the letter guessed is not in the challenge word,
                // decrement the number of attempts left
                attempts--;
                loop++;
                revealedWord = newChallengeWord.disguisedWord;
                var regEx = /[a-z]/gi;
                var match = revealedWord.match(regEx);
                if (match) {
                    revealedWordLetterCount = match.length;
                }
                unmatchedLetters.push(lcaseUserGuess);
                console.log("Sorry, that letter (" + lcaseUserGuess + ") is not in the shape you're guessing.");
                if (attempts < maxAttempts) {
                    console.log("You have " + attempts + " attempts remaining.");
                }
                if (attempts === 0) {
                    inquirer.prompt({
                        type: "list",
                        message: "Sorry you did not guess the shape: " + newChallengeWord.storedPick + "\nWould you like to play again?",
                        choices: ["Yes", "No"],
                        name: "continue"
                    })
                        .then(function (response) {
                            if (response.continue === "Yes") {
                                questionCounter++
                                attempts = maxAttempts;
                                loop = 0;
                                gamePlay(attempts);
                            } else if (response.continue === "No") {
                                process.exit(0);
                            }
                        });
                }
            }
            var regEx = /[a-z]/gi;
            var match = revealedWord.match(regEx);
            if (match) {
                revealedWordLetterCount = match.length;
            }
            loop++;
            if (revealedWordLetterCount === letterCount) {
                questionCounter++
                attempts = maxAttempts;
                loop = 0;
                inquirer.prompt({
                    type: "list",
                    message: "Congratulations! You guessed the correct shape: " + newChallengeWord.storedPick + "\nWould you like to play again?",
                    choices: ["Yes", "No"],
                    name: "continue"
                })
                    .then(function (res) {
                        if (res.continue === "Yes") {
                            gamePlay(attempts);
                        } else if (res.continue === "No") {
                            process.exit(0);
                        }
                    });
            } else {
                gamePlay(attempts);
            }

        });
    } else if (questionCounter < newChallengeWord.wordArray.length) {
        attempts = maxAttempts;
        loop = 0;
    }
}
gameStartEnd();