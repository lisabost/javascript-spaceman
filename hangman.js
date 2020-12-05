$(document).ready(function () {
        //an array of words for hangman
        var words = ["EUPHORIA", "PREDATOR", "RHYTHM", "HILARIOUS", "RAILROAD", "SYZYGY", "FAFFED", "BOLLOCKS",
            "FACETIOUSLY", "TELEPROMPTER", "CRACKPOT", "FJORD", "CAT", "VOODOO"];

        var randomWordArray = [];
        var dashes = [];
        var letter;
        var wrongGuesses = 0;
        var wrongGuessArray = [];


        gameStart();

        //event handlers

        $("#showRules").click(function () {
            $("#howToPlay").toggle();
        });


        $("input[type='button']").click(getLetter);

        //other functions
        function gameStart() {
            //when the game starts select a word at random from the array
            var index = Math.floor(Math.random() * words.length);
            var randomWord = words[index];

            //make the random word into an array for easy searching and iteration
            randomWordArray = randomWord.split("");
            //get the word's length and make dashes for each letter
            //use an array for our dashes so it is easy to find and replace when we know the index of the letter
            var numOfDashes = randomWord.length;
            for (var i = 0; i < numOfDashes; i++) {
                dashes[i] = "-";
            }
            $("#secretWord").text(dashes.join(" "));
        }

        //clicking a button needs to select the letter
        function getLetter() {
            var clickedButton = $(this);

            letter = clickedButton.val();

            findLetterIndexes(letter);

            //hide rules if they are showing
            $("#howToPlay").hide();
        }

        //use the letter to search the word's array and get the indexes at which it appears
        function findLetterIndexes(letter) {
            var letterIndexes = [];
            for (var i = 0; i < randomWordArray.length; i++) {
                if (randomWordArray[i] === letter) {
                    letterIndexes.push(i);
                }
            }
            replaceDashes(letterIndexes); // returns an array of number indexes like [1, 2, 3]
        }

        //use those indexes to replace dashes in the dashes array with the correct letters
        function replaceDashes(letterIndexes) {
            //we have two arrays - [ - - - - - - ] and [1, 2, 3]
            //we want to get the number out of the letterIndexes array and use it as the index in the word array
            //we only want to check if there are numbers in our indexes array
            if (letterIndexes.length !== 0) {
                //get the first value in the letterIndexes
                for (var i = 0; i < letterIndexes.length; i++) {
                    var letterToReplace = letterIndexes[i];
                    //use that index to replace the letter in the dashes array
                    dashes[letterToReplace] = letter;
                }
            } else {
                wrongGuesses++;
                wrongGuessArray.push(letter);
                $("#wrongGuesses").text(wrongGuessArray.join(" "));
                $("#guesses").show();
            }
            //print out the secret word with any guessed letters replaced
            $("#secretWord").text(dashes.join(" "));
            //check to see if the game is over
            isGameOver();
        }

        //limit people to 6 wrong guesses
        function isGameOver() {
            //game is over if the player has 6 wrong guesses
            if (wrongGuesses === 6) {
                //display game over
                $("#gameOver").text("You Lost! Maggie will be lost in space!").css("color", "red").show();
                $("#hangman").hide();
            }
            //game is over if the player has guessed the word
            if (dashes.join("") === randomWordArray.join("")) {
                //display you won, yay
                $("#gameOver").text("You guessed it! Maggie can get back to her ship now!").css("color", "blue").show();
                $("#hangman").hide();
            }
        }


    }
)