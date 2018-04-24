/*
 * Create a list that holds all of your cards
 */
//the deck
const deck = document.querySelector('.deck');

//cards and opened cards
let card = document.getElementsByClassName('card');
let cards = [...card];
let openedCards = [];
let matchedCards = 0;
let matchedCard = document.getElementsByClassName('match');

//stars
document.getElementsByClassName('star');
let starRating = '3 stars';
const thirdStar = document.getElementById('third-star');
const secondStar = document.getElementById('second-star');

//timer variables
const timerLabel = document.getElementById('timer');
let minutesTimer = document.getElementById('minutes');
let secondsTimer = document.getElementById('seconds');

//moves variables
let movesCount = 0;
let movesNumber = document.getElementById('moves-number');
//
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 //fuction for showing symbol
 function cardOpen(){
   this.classList.add('open', 'show');
   openedCards.push(this);
   let openNumber = openedCards.length;
   if(openNumber == 2){
     if(openedCards[0].className == openedCards[1]){
       openedCards.forEach(match);
       openedCards = [];
       matchedCards += 2;
     } else {
       openedCards.forEach(noMatch);
       openedCards = [];
     }
   }
 }

 //moves counter
 function counter(){
   ++movesCount;
   movesNumber.innerHTML = movesCount;

   //star rating
   if(movesCount >= 28 && movesCount <= 40){
     thirdStar.className = 'lost-star';
     starRating = '2 stars';
   } else if(movesCount > 40){
     thirdStar.className = 'lost-star';
     secondStar.className = 'lost-star';
     starRating = '1 star';
   }
 }

 //match function
 function match(openedCard){
   openedCard.classList.add('match');
 }

 //in case it didn't match
 function noMatch(openedCard){
   openedCard.classList.remove('open', 'show');
 }

 //Timer
 let totalSeconds = 0;
 function timer(){
   ++totalSeconds;
   secondsTimer.innerHTML = pad(totalSeconds % 60);
   minutesTimer.innerHTML = pad(totalSeconds / 60);
 }
