console.log('Hello console!');

const numberInput = document.querySelector('#number-input');
const numberButton = document.querySelector('#number-button');
const instructions = document.querySelector('#instructions');
const previousGuesses = document.querySelector('#previous-guesses');
const guessResult = document.querySelector('#guess-result');
const resetButton = document.querySelector('#reset-button');
const playButton = document.querySelector('#algorithm-button');
const statistics = document.querySelector('#statistics');
let guessArray = [];

const maxNumber = 100;
const minNumber = 1;
const algorithmArray = [];
const maxGuesses = 10;
let guesses = 0;
const repeats = 2000;
const startTime = Date.now();

playButton.innerHTML = `Juoksuta ${repeats} kertaa!`;

for (let i = minNumber; i <= maxNumber; i++) {
  algorithmArray.push(i);
}

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

//Week2 task1
//Paras strategia on mennä aina puoleen väliin minimin (tai edellisen arvauksen) ja maksimiluvun (tai minimiluvun) väliltä
// riippuen oliko arvaus liian suuri vai pieni.

// Einstein-algoritmi //
/**
 *
 * @param {*[]} array
 * @returns {number}
 */

const playGame = (array) => {
  /** Arvotaan algoritmille satunnainen etsittävä numero
   * ennalta määritetyltä väliltä **/
  let randomNumber = Math.floor(
    Math.random() * (maxNumber - minNumber) + minNumber);
  /** Määritellään aloitus ja lopetus indeksit jonolle **/
  let startIndex = 0;
  let maxIndex = array.length - 1;
  guessArray = [];
  guesses = 0;

  while (startIndex <= maxIndex) {
    /** Lasketaan jonon keskipiste **/
    const middlepoint = startIndex + Math.floor((maxIndex - startIndex) / 2);

    /** Palautetaan vastaus jos se on oikea **/
    if (randomNumber === array[middlepoint]) {
      guessArray.push(array[middlepoint]);
      guesses++;
      return array[middlepoint];
    }

    /** Valitaan kumpaan suuntaan lähdetään riippuen arvauksesta **/
    if (array[middlepoint] < randomNumber) {
      startIndex = middlepoint + 1;
      guesses++;
      guessArray.push(array[middlepoint]);
    } else {
      maxIndex = middlepoint - 1;
      guesses++;
      guessArray.push(array[middlepoint]);
    }
  }

  /** Jos mitään ei löydy jostain syystä **/
  return -1;
};

const algorithmStats = (repeats) => {
  let avgGuesses = 0;
  let maxGuesses = 1;
  let minGuesses = 1;

  for (let i = 1; i <= repeats; i++) {
    playGame(algorithmArray);
    avgGuesses += guesses;
    if (maxGuesses < guesses) {
      maxGuesses = guesses;
    }
    if (minGuesses > guesses) {
      minGuesses = guesses;
    }
  }
  avgGuesses = (avgGuesses / repeats).toFixed(2);
  console.log('Repeats:', repeats, '\nAverage guess number:', avgGuesses,
    '\nMaximum guess number in a round:', maxGuesses,
    '\nMinimum guess number in a round:', minGuesses);
};

/** 2000 toistolla arvauslukumäärän keskiarvo leijailee melko tarkasti 5,8 paikkeilla
 * Maksimi arvaus käytännössä ja teoriassa on 7 ja minimi 1 **/

playButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  algorithmStats(repeats);
});
