const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const lives = document.querySelectorAll('.tries img');
let missed = 0;
var letter;

let phrasesArr = [
    "Its a sunny day",
    "Im a front end developer",
    "I love fruits",
    "Happy Coding",
    "Its raining"
];

// listen for the start game button to be pressed

startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// listen for the try again button to be pressed when the game has to be reseted

startGame.addEventListener('click', () => {
    if (startGame.textContent == 'Try again') {
        resetKeyboard();
        resetLives();
        const split = getRandomPhraseAsArray(phrasesArr);
        addPhraseToDisplay(split);
    }
});

// generate a random phrase from the array 

const split = getRandomPhraseAsArray(phrasesArr);
    addPhraseToDisplay(split);
function getRandomPhraseAsArray(arr) {
	var randomNumber = Math.floor(Math.random() * arr.length);
    var randomPhrase = arr[randomNumber];
    var splitPhraseArray = randomPhrase.split('');
    
    return splitPhraseArray;
}

// adds the letter of a string to the display 

function addPhraseToDisplay(arr) {
    clearPhrase();

    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const ul = document.getElementById('ulPhrase');
        let character = arr[i];
        li.textContent = character;

        if(li.textContent !== ' ') {
            li.className = "letter";
        }   else {
            li.className = "space";
        }

        ul.appendChild(li);
    }
    letter = document.querySelectorAll('.letter');
}

// check if the game has been won or lost

function checkWin() {
    const show = document.querySelectorAll('.show');
    let title = document.querySelector('.title');
    overlay.classList.remove('win');
    overlay.classList.remove('lose');
    if (letter.length === show.length) {
		overlay.classList.add('win');
		title.textContent = "You've won!";
		overlay.style.display = "flex";
        startGame.textContent = 'Try again';
	} else if (missed > 4) {
		overlay.classList.add('lose');
		title.textContent = "You've lost!";
		overlay.style.display = "flex";
        startGame.textContent = 'Try again';
	} 
}

//  this function reset the keyboard and it's called when the game has been reseted

function resetKeyboard() {
    const keys = document.getElementsByTagName('button');
    for(let i = 0; i < keys.length; i++) {
        keys[i].className = '';
        keys[i].disabled = false;
    }
}

// check if a letter is in the phrase

function checkLetter(button) {
  let matchFound = null;
  for (i = 0; i < letter.length; i++) {
    if ( button === letter[i].textContent.toLowerCase()) {
     letter[i].classList.add('show');
     letter[i].style.transition = '.5s ease-out'; 
     matchFound = button;
   }
 }
 return matchFound;
}

// listen for the onscreen keyboard to be clicked
keyboard.addEventListener('click', (e) => {
 if (e.target.tagName === 'BUTTON') {
    e.target.className = 'chosen';
    e.target.disabled = true;
	var match = checkLetter(e.target.textContent.toLowerCase());

  if (match === null) {
      lives[missed].src = 'images/lostHeart.png';
      missed++;
  }
  checkWin();
}
});

// this function clear a phrase

function clearPhrase() {
var list = document.getElementById("ulPhrase");
list.innerHTML = "";
}

// this function lets heart images appear again when the game has been reseted

function resetLives() {
    missed = 0;
    for (let i = 0; i < lives.length; i++) {
        lives[i].src = 'images/liveHeart.png';
    }
}
