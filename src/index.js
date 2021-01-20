import SodexoTools from './assets/modules/sodexo-module';
import FazerTools from './assets/modules/fazer-module';

const languageButton1 = document.querySelector('#language-button1');
const sortButton1 = document.querySelector('#sort-button1');
const randomButton1 = document.querySelector('#randomize-button1');
const menu1 = document.querySelector('#grid-menu1');
const randomMeal1 = document.querySelector('#random-meal1');
const languageButton2 = document.querySelector('#language-button2');
const menu2 = document.querySelector('#grid-menu2');
const sortButton2 = document.querySelector('#sort-button2');
const randomMeal2 = document.querySelector('#random-meal2');
const randomButton2 = document.querySelector('#randomize-button2');
let languageFi1 = true;
let languageFi2 = true;
let sortedAsc1 = SodexoTools.sortedAsc;
let sortedAsc2 = false;
menu1.innerHTML = '';
menu2.innerHTML = '';

for (const course of SodexoTools.lunchArrayFi) {
  menu1.innerHTML += `<li>${course}</li>`;
}

for (const course of FazerTools.printMenu(languageFi2)) {
  menu2.innerHTML += `<li>${course}</li>`;
}
languageFi2 = false;

languageButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal1.innerHTML = '';
  menu1.innerHTML = '';
  if (languageFi1) {
    for (const course of SodexoTools.lunchArrayEn) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi1 = false;
  } else {
    for (const course of SodexoTools.lunchArrayFi) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi1 = true;
  }
});

languageButton2.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal2.innerHTML = '';
  menu2.innerHTML = '';
  for (const course of FazerTools.printMenu(languageFi2)) {
    menu2.innerHTML += `<li>${course}</li>`;
  }
  languageFi2 = !languageFi2;
});

sortButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal1.innerHTML = '';
  if (languageFi1) {
    menu1.innerHTML = '';
    for (const course of SodexoTools.sortMenu(SodexoTools.lunchArrayFi,
      sortedAsc1)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc1 = !sortedAsc1;
  } else {
    menu1.innerHTML = '';
    for (const course of SodexoTools.sortMenu(SodexoTools.lunchArrayEn,
      sortedAsc1)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc1 = !sortedAsc1;
  }
});

sortButton2.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!sortedAsc2) {
    menu2.innerHTML = '';
    for (const course of FazerTools.printMenu(!languageFi2).sort()) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc2 = !sortedAsc2;
  } else {
    menu2.innerHTML = '';
    for (const course of FazerTools.printMenu(!languageFi2).sort().reverse()) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc2 = !sortedAsc2;
  }
});

randomButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (languageFi1) {
    randomMeal1.innerHTML = `Kokeile tätä: ${SodexoTools.lunchArrayFi[SodexoTools.randomizeMeal(
      languageFi1)]}`;
  } else {
    randomMeal1.innerHTML = `Kokeile tätä: ${SodexoTools.lunchArrayEn[SodexoTools.randomizeMeal(
      languageFi1)]}`;
  }
});

randomButton2.addEventListener('click', (evt) => {
  evt.preventDefault();

});
