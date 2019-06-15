/*
* Create a list that holds all of your cards
*/
let thecards = ['fa-diamond','fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'];
startgame(); // call the start function
let timeCount = 0;
let timeCount2 = 0;
let opencards=[];
let steps = 0;
let started = false;
let openCards = [];
let solvedCount = 0;
// link the queries(JS) with the HTML code
let starlevel=document.querySelector('.stars');
let cards=document.querySelectorAll('.card');
let stepscounter=document.querySelector('.moves');
let sectimer=document.querySelector('.time');
starlevel.innerHTML=(`<li><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></li>`);
document.querySelector('.restart').addEventListener("click", function(){
  location.reload();
});
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
function producecards(card) //Create card list by JS
{
  return `<li class="card" data-card="${card}">
  <i class="fa ${card}"></i>
  </li>`
}
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
function startgame() // The start game function
{
  let thedeck=document.querySelector('.deck');
  let htmlcards=shuffle(thecards).map(function(card)
  {
    return producecards(card);
  });
  thedeck.innerHTML=htmlcards.join('');
}
function startTimer()// Timer function
{
  timeCount += 1;
  sectimer.innerText=timeCount;
  timeCount2=setTimeout(startTimer, 1000);
}
cards.forEach(function(card){ // Create the listening function
  card.addEventListener('click', function(e){
    if (!card.classList.contains('open') && !card.classList.contains('match') && !card.classList.contains('show')){
      opencards.push(card);//Count open cards
      card.classList.add('open','show');
      steps+= 1;//Count moves
      stepscounter.innerText=steps; // display moves
      if (steps==5) // rating stars
      {
        starlevel.innerHTML=(`<li><i class="fa fa-star"></i><i class="fa fa-star"></li>`);
      }
      else if(steps==10)
      {
        starlevel.innerHTML=(`<li></i><i class="fa fa-star"></i></li>`);
      }
      if (!started)// start timer function
      {
        started = true;
        setTimeout(startTimer);
      }
      if (opencards.length ==2) // open just two cards
      {
        if (opencards[0].dataset.card==opencards[1].dataset.card) // Matching method
        {
          opencards[0].classList.add('match');
          opencards[0].classList.add('open');
          opencards[0].classList.add('show');
          opencards[1].classList.add('match');
          opencards[1].classList.add('open');
          opencards[1].classList.add('show');
          opencards=[];
          solvedCount++;// Count matched cards
        }
        else
        {
          setTimeout(function()
          {
            opencards.forEach(function(card)
            {
              card.classList.remove('open','show');
            });
            opencards=[];
          },500); // Wait till close the cards
        }

      }
    }
    if (solvedCount == 8)// Msg appear if finish the game
    {
      clearTimeout(timeCount2);
      if (confirm(`You Won after ${steps} moves in ${timeCount} Seconds!! Do you want to play again?`))
      {
        location.reload();//Play again
      }
      else
      {
        clearTimeout(timeCount2);//Do not play again
        txt = "You pressed Cancel!";
      }
    }
  });
});
