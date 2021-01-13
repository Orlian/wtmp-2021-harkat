console.log('Hello console!');

const numberInput = document.querySelector('#number-input');
const numberButton = document.querySelector('#number-button');
const instructions = document.querySelector('#instructions');
const previousGuesses = document.querySelector('#previous-guesses');
const guessResult = document.querySelector('#guess-result');
const resetButton = document.querySelector('#reset-button');
const statistics = document.querySelector('#statistics');
const guessArray = [];

const maxNumber = 150;
const minNumber = 25;
const maxGuesses = 10;
let guesses = 0;
const startTime = Date.now();

instructions.innerHTML = `Peli arpoo numeron väliltä ${minNumber}-${maxNumber}, kokeile arvata se enintään ${maxGuesses} arvauksella.`;

let randomNumber = Math.floor(
  Math.random() * (maxNumber - minNumber) + minNumber);

const checkGuess = () => {
  if (Number(numberInput.value) < randomNumber && guesses < maxGuesses) {
    guessResult.style.display = 'block';
    guessResult.innerHTML = 'Arvauksesi oli liian pieni!';
    guessArray.push(Number(numberInput.value));
    previousGuesses.innerHTML = 'Edellisiä arvauksia: ';
    for (let i = 0; i < guessArray.length; i++) {
      if (i !== guessArray.length - 1) {
        previousGuesses.innerHTML += `${guessArray[i]}, `;
      } else {
        previousGuesses.innerHTML += `${guessArray[i]}.`;
      }
    }
    guesses++;
  } else if (Number(numberInput.value) > randomNumber && guesses < maxGuesses) {
    guessResult.innerHTML = 'Arvauksesi oli liian suuri!';
    guessResult.style.display = 'block';
    previousGuesses.innerHTML = 'Edellisiä arvauksia: ';
    guessArray.push(Number(numberInput.value));
    for (let i = 0; i < guessArray.length; i++) {
      if (i !== guessArray.length - 1) {
        previousGuesses.innerHTML += `${guessArray[i]}, `;
      } else {
        previousGuesses.innerHTML += `${guessArray[i]}.`;
      }
    }
    guesses++;
  } else if (isNaN(numberInput.value)) {
    guessResult.innerHTML = 'Arvauksesi ei ollut numero...';
    guessResult.style.display = 'block';
    previousGuesses.innerHTML = 'Edellisiä arvauksia: ';
    guessArray.push(Number(numberInput.value));
    for (let i = 0; i < guessArray.length; i++) {
      if (i !== guessArray.length - 1) {
        previousGuesses.innerHTML += `${guessArray[i]}, `;
      } else {
        previousGuesses.innerHTML += `${guessArray[i]}.`;
      }
    }
    guesses++;
  } else {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    if (guesses < maxGuesses) {
      guessResult.innerHTML = 'Voitit!';
      guessResult.style.backgroundColor = 'lightgreen';
      guessResult.style.display = 'block';
      numberButton.disabled = true;
      numberInput.disabled = true;
      statistics.innerHTML = `Aikaa kului ${timeElapsed} sekuntia. Käytit ${guesses +
      1} arvausta`;
      statistics.style.display = 'block';
    } else {
      guessResult.innerHTML = 'Liikaa arvauksia, hävisit!';
      guessResult.style.backgroundColor = 'red';
      guessResult.style.color = 'white';
      guessResult.style.display = 'block';
      numberButton.disabled = true;
      numberInput.disabled = true;
      statistics.innerHTML = `Aikaa kului ${timeElapsed} sekuntia.`;
      statistics.style.display = 'block';
    }
  }
};

const resetGame = () => {
  location.reload();
};

numberButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  checkGuess();
});

resetButton.addEventListener('click', resetGame);
