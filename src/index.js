console.log('Hello console!');

const numberInput = document.querySelector('#number-input');
const numberButton = document.querySelector('#number-button');
const instructions = document.querySelector('#instructions');
const previousGuesses = document.querySelector('#previous-guesses');
const guessResult = document.querySelector('#guess-result');
let guessArray = [];

const maxNumber = 150;
const minNumber = 25;
const maxGuesses = 10;

instructions.innerHTML = `Peli arpoo numeron väliltä ${minNumber}-${maxNumber}, kokeile arvata se enintään ${maxGuesses} arvauksella.`;

let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);

const checkGuess = () => {
  if(Number(numberInput.value) < randomNumber) {
    guessResult.innerHTML = 'Arvauksesi oli liian pieni!';
    guessArray.push(numberInput.value);
    previousGuesses.innerHTML = 'Edellisiä arvauksia: ';
    for(let i = 0; i < guessArray.length; i++){
      if(i !== guessArray.length - 1) {
        previousGuesses.innerHTML += `${previousGuesses[i]}, `;
      }
      else {
        previousGuesses.innerHTML += `${previousGuesses[i]}.`;
      }
    }
  }
  else if(Number(numberInput.value) > randomNumber) {
    guessResult.innerHTML = 'Arvauksesi oli liian suuri!';
    guessArray.push(numberInput.value);
    previousGuesses.innerHTML = 'Edellisiä arvauksia: ';
    for(let i = 0; i < guessArray.length; i++){
      if(i !== guessArray.length - 1) {
        previousGuesses.innerHTML += `${previousGuesses[i]}, `;
      }
      else {
        previousGuesses.innerHTML += `${previousGuesses[i]}.`;
      }
    }
  }
};
