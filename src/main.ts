// --------------- MEMORY GAME --------------- //

// --------------- SET UP GAME --------------- //

const appDiv = document.getElementById('app') as HTMLDivElement;

const numCards = 24; // total number of cards

// create new array with IDs for cards
let memoryCards: number[] = [];
for (let i=1; i<=numCards; i++) { memoryCards.push(i) };

// shuffle the array
memoryCards.sort(() => Math.random()-0.5 );

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

// Make card visible on click
async function handleClick(id: number) {

  //?? WHAT??
  if (isShowing) { return }
  if (showCounter%2 === 0) {
    // first Card
    firstCard = document.getElementById(id.toString()) as HTMLElement;
    firstCard.classList.toggle('hidden');
  } else {
    // second Card
    secondCard = document.getElementById(id.toString()) as HTMLElement;
    secondCard.classList.toggle('hidden');
    isShowing = true;
    // 1
    await delay(1500);
    // instead of 1
    // await new Promise(f => setTimeout(f, 2000));
    // can be used
    checkMatch();
    isShowing = false;
  }
  showCounter++;
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
  } else {
    firstCard.classList.toggle('hidden');
    secondCard.classList.toggle('hidden');

  }
  // if so: replace cards with a CHECK
  // else: hide cards again
}