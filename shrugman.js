

const prompt = require('prompt-sync')({ sigint: true });

const chalk = require('chalk');



//Functions

//hide the letters of the title behind underscores
const hideTheLetters = (str) => str.split("").map((char) => (char === " " ? " " : "_")).join("");


//hide the Shrugman emoji
const hideShrugman = (str) => str.split("").map((char) => (char = " ")).join("");


//make sure given character is a letter
const isLetter = (c) => {
    return c.toLowerCase() != c.toUpperCase();
}


//prompt to choose category, and return random title from chosen category
const booksOrMovies = (list) => {
    let category;
    let bookTitle;
    let movieTitle;
    const randomIndex = Math.floor(Math.random()* 10);
    console.clear()
    while(category !== "books" && category !== "movies"){
       category = prompt("Choose category: movies or books ")
       //clear console if the user input is wrong
       console.clear()
       if(category === "books"){
          bookTitle = list.books[randomIndex];
          return bookTitle;
        } 
        else if (category === "movies"){
          movieTitle = list.movies[randomIndex];
          return movieTitle;
        }
    }
}


//print masked title and shrugman emoji on the screen
const printBothHidden = () => {
    console.log(randomHidden+ "\n\n\n" + chalk.bold.magenta(shrugmanHidden));
}


//Guess the letter. If the letter is in title, reveal the character, otherwise print next shrugman character.
const guessTheLetter = (title, hiddenTitle, falseGuess, falseGuessHidden) => {
    
    console.log(`\n`)
    
    let letter = prompt("Guess a letter ");     
    let wrongGuess = true;  // Assume the guess is wrong initially
    
    for(let i = 0; i < title.length; i++){
        //make sure the typed character is case insensitive, is a letter, and is a single character, otherwise repeat prompt
        if(title[i].toLowerCase().includes(letter) && isLetter(letter) && letter.length === 1){
            hiddenTitle[i] = title[i];
            wrongGuess = false;  // The guess is correct
        }
    } 
    //make sure that letter is not repeating, is a letter and single character, otherwise prompt again
    if (wrongGuess && !falseLetters.includes(letter) && isLetter(letter) && letter.length === 1) {
        
        falseGuessHidden[falseLetterCounter] = falseGuess[falseLetterCounter];
        falseLetterCounter += 1;
        falseLetters.push(letter);
    }
    console.clear()
    //print updated title and shrugman after every itteration
    return hiddenTitle.join("") + "\n\n\n" + chalk.bold.magenta(falseGuessHidden.join(""));
}

const game = () => {
    //print hidden title and shrugman emoji
    printBothHidden();
    //transform both of them to array so when the condition is fulfilled the character can be swapped
    randomHidden = randomHidden.split("");
    shrugmanHidden = shrugmanHidden.split("");
    //prompt until title or shrugman are fully revealed and print corresponding message at the end
    while(randomHidden.includes("_") && shrugmanHidden.includes(" ")){
        console.log(guessTheLetter(random, randomHidden, shrugman, shrugmanHidden))
        if(!randomHidden.includes("_")){
            console.log(chalk.green(`\nYou are the Winner!\n`))
            //update the rounds counter and save the title together with the result in the gameResult array
            numOfRounds ++;
            gameResults.push(chalk.yellow.italic(`${numOfRounds}.${random}`) + chalk.green(" - win"))
              //prompt until the character is "y" or "n"
              while(anotherRound !== "y" && anotherRound !== "y"){
                //ask if the player wants to play another round. If not end the game and print the game result list
                anotherRound = prompt("Another round (y/n)? ");
                //clear console if the user input is wrong
                
                console.clear()
                console.log(randomHidden.join("") + "\n\n\n" + chalk.bold.magenta(shrugmanHidden.join("")));
                console.log(chalk.green(`\nYou are the Winner!\n`))

                if(anotherRound === "y"){
                    console.clear()
                  return anotherRound === "y";
                }
                else if(anotherRound === "n"){
                    console.clear()
                    return console.log(chalk.bgWhite(`----- THE END -----`))
                }
            }
        }
        else if(!shrugmanHidden.includes(" ")){
            console.log(chalk.red(`\nBetter luck next time: `) +  chalk.green(random))
            //update the rounds counter and save the title together with the result in the gameResult array
            numOfRounds ++;
            gameResults.push(chalk.yellow.italic(`${numOfRounds}.${random}`) + chalk.red(" - loss"));
            //prompt until the character is "y" or "n"
            while(anotherRound !== "y" && anotherRound !== "y"){
                //ask if the player wants to play another round. If not end the game and print the game result list
                anotherRound = prompt("Another round (y/n)? ");
                //clear console if the user input is wrong

                console.clear()
                console.log(randomHidden.join("") + "\n\n\n" + chalk.bold.magenta(shrugmanHidden.join("")));
                console.log(chalk.red(`\nBetter luck next time: `) +  chalk.green(random))

                if(anotherRound === "y"){
                    console.clear()
                  return anotherRound === "y";
                }
                else if(anotherRound === "n"){
                    console.clear()
                    return console.log(chalk.bgWhite(`----- THE END -----`))  
                }
            }
        }
    }
}
//in case the player wants to play another round reset the variables and run the function game() again
const anotherRoundGame = () => {
    while(anotherRound === "y"){
        random = booksOrMovies(list);
        shrugman = `¯\\_(:/)_/¯`
         falseLetterCounter = 0;
         falseLetters = [];
         anotherRound = "";
        console.clear();
        
        randomHidden = hideTheLetters(random);
        shrugmanHidden = hideShrugman(shrugman);
        game()
    }
}

//at the end of the game print the results on the screen
const printResults = () => {
    console.log(chalk.bgYellow(`\nResults:\n`))
    for(let i in gameResults){
    
        console.log(gameResults[i]);
    }
}


//start a new game
const newGame = () => {
    game()
    anotherRoundGame();
    printResults();
}
//=====================================================================

//Variables


//database with movies and books titles
const list = {
    books: [
      "To Kill a Mockingbird",
      "Born in Crime",
      "The Great Gatsby",
      "Pride and Prejudice",
      "The Catcher in the Rye",
      "The Lord of the Rings",
      "Brave New World",
      "The Chronicles of Narnia",
      "The Hobbit",
      "The Da Vinci Code"
    ],
    movies: [
      "The Shawshank Redemption",
      "The Godfather",
      "The Dark Knight",
      "Pulp Fiction",
      "The Green Mile",
      "Forrest Gump",
      "Inception",
      "The Matrix",
      "Gladiator",
      "The Silence of the Lambs"
    ]
};


//random title from the database
let random =  booksOrMovies(list);

//shrugman emoji
let shrugman = `¯\\_(:/)_/¯`

//count to make sure the shrugman characters are printed in right order
let falseLetterCounter = 0;

//make sure if you type the false letter again it won't be counted as a wrong guess
let falseLetters = [];
let anotherRound = "";

//save all game results to print it out at the end
const gameResults = [];

//count the number of the rounds in one game
let numOfRounds = 0;

console.clear();


//hide the title and the shrugmann emoji
let randomHidden = hideTheLetters(random);
let shrugmanHidden = hideShrugman(shrugman);

//============================================================================
//play the new game
newGame();






