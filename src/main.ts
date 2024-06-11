// --------------- MEMORY GAME --------------- //

// --------------- SET UP GAME --------------- //

const appDiv = document.getElementById('app') as HTMLDivElement;

const numCards = 24; // total number of cards

// create new array with IDs for cards
let memoryCards: number[] = [];
for (let i=1; i<=numCards; i++) { memoryCards.push(i) };

// shuffle the array
// memoryCards.sort(() => Math.random()-0.5 );

// fill board with cards
for (let i of memoryCards) {
  // create new div
  let newCard = document.createElement('div') as HTMLDivElement;
  // add class to div
  newCard.classList.add('memory__card');
  newCard.innerHTML = `<img src="src/imgs/img${i%12+1}.svg" id=${i} class="hidden" />`;
  newCard.addEventListener('click', () => handleClick(i));
  // append class to appDiv
  appDiv.appendChild(newCard);
}

// --------------- RUN GAME --------------- //

// TODO: Make card visible on click
// function handleClick(id: number) {
  // TODO: check if wo caess are visible
  // if so: block other cards from being shown
//   const card = document.getElementById(id.toString()) as HTMLElement;
//   card.classList.toggle('hidden');
// }

let firstCard: HTMLElement;
let secondCard: HTMLElement;
let showCounter = 0;    // counter for showing cards
let isShowing = false;  // var for keeping track of showing cards
let playerOne = document.getElementById("playerOne") as HTMLElement
let playerTwo = document.getElementById("playerTwo") as HTMLElement
let playerOneScore: number = 0;
let playerTwoScore: number = 0;
playerOne.innerText = (`Player One: ${playerOneScore}`);
playerTwo.innerText = (`Player Two: ${playerTwoScore}`);
let playerTurn = document.getElementById("playerTurn") as HTMLElement
playerTurn.innerText = (`Player One's turn`);
let isPlayerOneTurn: boolean = true;



// Make card visible on click
async function handleClick(id: number) {
  console.log("tom the cat", isPlayerOneTurn);
  
  if (isShowing) { return }
  if (showCounter%2 === 0) {
    // first Card
    firstCard = document.getElementById(id.toString()) as HTMLElement;
    fancyRotate(firstCard);
    firstCard.classList.toggle('hidden');
  } else {
    // second Card
    secondCard = document.getElementById(id.toString()) as HTMLElement;    
    fancyFlip(secondCard)
    // fancyFlip(parent)
    secondCard.classList.toggle('hidden');
    isShowing = true;
    // 1
    await delay(1500);
    // instead of 1
    // await new Promise(f => setTimeout(f, 2000));
    // can be used
    checkMatch();
    // isPlayerOneTurn = !isPlayerOneTurn 
    playerTurn.innerText = isPlayerOneTurn ? `Player One's turn`:`Player Two's turn`;
    console.log("player name", playerTurn.innerText);
    
    isShowing = false;
  }
  showCounter++;  
  console.log("end of handleClick", isPlayerOneTurn);
  playerOne.innerText = (`Player One: ${playerOneScore}`);
  playerTwo.innerText = (`Player Two: ${playerTwoScore}`);
  
}

// 1
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function to check if two cards have been a match
function checkMatch() {
  // check if firstCard and secondCard are a match
  let firstID = Number(firstCard.id);
  let secondID = Number(secondCard.id);
  if (Math.abs(firstID - secondID) === 12){
    firstCard.parentElement!.innerHTML = `<img src="src/imgs/check.svg" />`
    secondCard.parentElement!.innerHTML = `<img src="src/imgs/check.svg" />`
    isPlayerOneTurn ? playerOneScore++ : playerTwoScore++;

  } else {
    firstCard.classList.toggle('hidden');
    secondCard.classList.toggle('hidden');
    isPlayerOneTurn = !isPlayerOneTurn
  }

  // if so: replace cards with a CHECK
  // else: hide cards again
}

async function fancyRotate(card: HTMLElement){
  for (let i = 0; i <= 360; i+=6){
    card.parentElement!.style.rotate = `${i}deg`;
    await delay(5)
  }
}

async function fancyFlip(card: HTMLElement){
  for (let i = 70; i >= 0; i-=4){
    card.parentElement!.style.width = `${i}px`;
    card.style.width = `${i}px`;
    await delay(10)
  }
  for (let i = 0; i <= 70; i+=4){
    card.parentElement!.style.width = `${i}px`;
    card.style.width = `${i}px`;
    await delay(10)
}
}




let PlayerTurn = document.querySelector("#turn") as HTMLElement;

function whichPlayerTurn(){
  let count: number
}