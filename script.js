'use strict';

//selecting elements
const score0El = document.querySelector('#score--0'); // way 1
const score1El = document.getElementById('score--1'); // way 2
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let scores, isPlaying, currentScore, activePlayer;

//starting conditions on new game
const init = function(){
  //starting conditions
 

  
  //to keep track of game being played
   isPlaying = true; // true initially
  //variables needed
   currentScore = 0;
  //below variable needed to kepp track of which is the active player so ,
   activePlayer = 0; // initially zero as active is player 1 when 2 then we will update it to 1
  //below array wil keep the actual total scores of both player and remember array have zero based indexing that why we set activePlayer var to zero so it will be handy for us
   scores = [0, 0];
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent=0;
  current1El.textContent=0;


  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
  diceEl.classList.add('hidden');
}

init();

//rolling dice functionality

btnRollEl.addEventListener('click', function () {
  if (isPlaying) {
    //1 generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //add rolled number to current score
      currentScore += dice;
      //dynamic selection of active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //lose all score & switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      //1 change the active player
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      //toggle class
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//Hold the button and Update total score

btnHoldEl.addEventListener('click', function () {
  if(isPlaying)
  {

  
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  if (scores[activePlayer] >= 100) {
    //finish
    isPlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
      diceEl.classList.add('hidden');
  } else {
    //change player
    activePlayer = activePlayer === 0 ? 1 : 0;

    currentScore = 0;
    //toggle class
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}
});


//resetting to initial condition
btnNewEl.addEventListener('click',init);
