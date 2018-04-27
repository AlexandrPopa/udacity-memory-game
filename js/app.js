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

//restart button
let restartButton = document.querySelector('.restart');

//moves variables
let movesCount = 0;
let movesNumber = document.getElementById('moves-number');
let movesText = document.getElementById('moves-text');
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
 document.body.onload = gameOn();
//function for starting a new game
function gameOn(){
  openedCards = [];
  matchedCards = 0;
  movesCount = 0;
  movesNumber.innerHTML = movesCount;
  thirdStar.classList.remove('lost-star');
  secondStar.classList.remove('lost-star');
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
		cards[i].classList.remove('open', 'show', 'done', 'match');
    cards[i].addEventListener('click', turn);
		cards[i].addEventListener('click', cardOpen);
    cards[i].addEventListener('click', counter);
	};
}

//function for showing symbol
function turn(){
    this.classList.add('open', 'show', 'done');
}

 //fuction for opening a card
 function cardOpen(){
   openedCards.push(this);
   let openNumber = openedCards.length;
   if(openNumber == 2){
     if(openedCards[0].className == openedCards[1].className){
       openedCards.forEach(match);
       openedCards = [];
       matchedCards += 2;
       if (matchedCards == 16){
         gameOn();
       }
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
   if(movesCount == 1){
     movesText.innerHTML = 'move';
   } else {
     movesText.innerHTML = 'moves';
   }

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
   setTimeout(function(){
     openedCard.classList.remove('open', 'show', 'done');
   }, 500);
 }

 //Timer
 let totalSeconds = 0;
 function timer(){
   ++totalSeconds;
   secondsTimer.innerHTML = pad(totalSeconds % 60);
   minutesTimer.innerHTML = pad(totalSeconds / 60);
 }

 //restart button functionality
 restartButton.addEventListener('click', gameOn);
