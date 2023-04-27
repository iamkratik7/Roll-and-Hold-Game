'use strict';

/* SELECTING ELEMENTS */

// let's select "score-elements" of player 1 and player 2
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//let's select dice element as same as above
const diceEl = document.querySelector('.dice');
// let's also select all the button elements anyway because we will need them later
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
// selecting current score elements of both players
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
// selecting player's elements also to keep track of active players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// getElementById is infact little bit faster and more preferable when selecting large number of elements but here let's use querySelector only! score0El contains whole element not a value!

/* 

So we're selecting these here and now we can use the variables to do something on them. And again, we do that because probably we will need to do something with these selected elements multiple times throughout the application. And so we just defined them once at the top of our file instead of having to select the same elements over and over again.

*/

/* initially textContent of score0El and score1El is 0 */

// score0El.textContent = 0;
// score1El.textContent = 0;

// And here we are specifying numbers, not strings, but JavaScript will then automatically convert them to strings to actually display them on the page.

/* initiallt dice is hidden so add the hidden class to dice element! */

// diceEl.classList.add('hidden');

/* ROLLING DICE FUNCTIONALITY */

// let's also have our current score for updation on rolling dice
// let currentScore = 0;

// let's have total scores of both the player in an array and why becuase array will be 0 - based indexing and will be handy for us to have below things:

// let activePlayer = 0; // initially
// const score = [0, 0];
// let playing = true;

let score, currentScore, activePlayer, playing;

const initialCondition = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialCondition();

btnRollEl.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number:
    let rolledNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice accordingly the rolledNumber:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rolledNumber}.png`;

    // 3.Check for rolleNumber === 1 , if true then switch to next player:
    if (rolledNumber !== 1) {
      // currentScore = currentScore + rolledNumber;
      // // temporarily display current score on player 1
      // current0El.textContent = currentScore;

      currentScore += rolledNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // changing the styles
      // document
      //   .querySelector(`player--${activePlayer}`)
      //   .classList.remove('player--active');
      // player1El.classList.add('player--active');

      // changing the active player

      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      //toggle class
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

/* HOLD DICE FUNCTIONALITY */

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // 1 . First add currentscore to the current active player

    score[activePlayer] += currentScore;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2 . check for score >= 100
    // finish the game

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      // switch to the next player

      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      //toggle class
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

/* RESETTING THE GAME*/

btnNewEl.addEventListener('click', function () {
  initialCondition();
});
