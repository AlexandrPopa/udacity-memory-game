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

//stars
document.getElementsByClassName('star');
let starRating = '3 stars';
const thirdStar = document.getElementById('third-star');
const secondStar = document.getElementById('second-star');
let endStars = document.getElementById('end-stars');

//timer variables
let minutesTimer = document.getElementById('minutes');
let secondsTimer = document.getElementById('seconds');
let minutes = 0;
let seconds = 0;
let endTime = document.getElementById('end-time');
let timeCount = 0;

//restart button
let restartButton = document.querySelector('.restart');

//moves variables
let movesCount = 0;
let movesNumber = document.getElementById('moves-number');
let movesText = document.getElementById('moves-text');

//variables for modal
let playAgain = document.getElementById('play-again');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

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
function gameOn() {
  resetTimer();
  openedCards = [];
  matchedCards = 0;
  movesCount = 0;
  movesNumber.innerHTML = movesCount;
  thirdStar.classList.remove('lost-star');
  secondStar.classList.remove('lost-star');
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove('open', 'show', 'done', 'match');
    cards[i].addEventListener('click', turn);
    cards[i].addEventListener('click', cardOpen);
  };
}

//function for showing symbol
function turn() {
  this.classList.add('open', 'show', 'done');
}

//fuction for opening a card
function cardOpen() {
  openedCards.push(this);
  let openNumber = openedCards.length;
  if (openNumber == 2) {
    counter();
    if (openedCards[0].className == openedCards[1].className) {
      openedCards.forEach(match);
      openedCards = [];
      matchedCards += 2;
      if (matchedCards == 16) {
        congratulate();
      }
    } else {
      deck.classList.add('done');
      openedCards.forEach(noMatch);
      openedCards = [];
      setTimeout(function() {
        deck.classList.remove('done');
      }, 500);
    }
  }
}

//moves counter
function counter() {
  ++movesCount;
  movesNumber.innerHTML = movesCount;
  if (movesCount == 1) {
    movesText.innerHTML = 'move';
    timer();
  } else {
    movesText.innerHTML = 'moves';
  }

  //star rating
  if (movesCount >= 14 && movesCount <= 20) {
    thirdStar.classList.add('lost-star');
    starRating = '2 stars';
  } else if (movesCount > 20) {
    secondStar.classList.add('lost-star');
    starRating = '1 star';
  }
}

//match function
function match(openedCard) {
  openedCard.classList.add('match');
}

//in case it didn't match
function noMatch(openedCard) {
  setTimeout(function() {
    openedCard.classList.remove('open', 'show', 'done');
  }, 500);
}

//Timer
function timer() {
  let start = new Date().getTime();
  timeCount = setInterval(() => {
    let now = new Date().getTime();
    let elapsed = now - start;
    minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    secondsTimer.innerHTML = pad(seconds);
    minutesTimer.innerHTML = pad(minutes);
  }, 1000);
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function resetTimer() {
  clearInterval(timeCount);
  secondsTimer.innerHTML = '00';
  minutesTimer.innerHTML = '00';
}

//modal for finishing the game
function congratulate() {
  endStars.innerText = starRating;
  endTime.innerText = 'in ' + minutes + ' minutes and ' + seconds + ' seconds';
  resetTimer();
  $("#win-modal").modal("show");
  playAgain.addEventListener('click', gameOn);
}

//restart button functionality
restartButton.addEventListener('click', gameOn);
