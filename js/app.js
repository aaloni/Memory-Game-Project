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

//Create card list by JS
function producecards(card) 
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

function startgame()
 // The start game function
{
  let thedeck=document.querySelector('.deck');
  let htmlcards=shuffle(thecards).map(function(card)
  {
    return producecards(card);
  });
  thedeck.innerHTML=htmlcards.join('');
}
// Timer function
function startTimer()
{
  timeCount += 1;
  sectimer.innerText=timeCount;
  timeCount2=setTimeout(startTimer, 1000);
}
 // Create the listening function
cards.forEach(function(card){
  card.addEventListener('click', function(e){
    if (!card.classList.contains('open') && !card.classList.contains('match') && !card.classList.contains('show')){
      //Count open cards
      opencards.push(card);
      card.classList.add('open','show');
      //Count moves
      steps+= 1;
      // display moves
      stepscounter.innerText=steps; 
      // rating stars
      if (steps==5) 
      {
        starlevel.innerHTML=(`<li><i class="fa fa-star"></i><i class="fa fa-star"></li>`);
      }
      else if(steps==10)
      {
        starlevel.innerHTML=(`<li></i><i class="fa fa-star"></i></li>`);
      }
      // start timer function
      if (!started)
      {
        started = true;
        setTimeout(startTimer);
      }
      // open just two cards
      if (opencards.length ==2) 
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
          // Count matched cards
          solvedCount++;
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
            // Wait till close the cards
          },500); 
        }
      }
    }
    // Msg appear if finish the game
    if (solvedCount == 8)
    {
      clearTimeout(timeCount2);
      if (confirm(`You Won after ${steps} moves in ${timeCount} Seconds!! Do you want to play again?`))
      {
        //Play again
        location.reload();
      }
      else
      {
        //Do not play again
        clearTimeout(timeCount2);
        txt = "You pressed Cancel!";
      }
    }
  });
});
