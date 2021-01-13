import LunchMenu from '../sodexo-day-example.json';
console.log('lunch menu object', LunchMenu);
const languageButton1 = document.querySelector('#language-button1');
const sortButton = document.querySelector('#sort-button1');
const randomButton = document.querySelector('#randomize-button1');
const menu1 = document.querySelector('#grid-menu1');
const randomMeal = document.querySelector('#random-meal1');
let languageFi = true;
let sortedAsc = false;
menu1.innerHTML = '';

const lunchArrayFi = [];
for(const val in LunchMenu.courses){
  lunchArrayFi.push(LunchMenu.courses[val].title_fi);
}

const lunchArrayEn = [];
for(const val in LunchMenu.courses){
  lunchArrayEn.push(LunchMenu.courses[val].title_en);
}

for (const course of lunchArrayFi) {
  menu1.innerHTML += `<li>${course}</li>`;
}

languageButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal.innerHTML = '';
  menu1.innerHTML = '';
  if (languageFi) {
    for (const course of lunchArrayEn) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi = false;
  } else {
    for (const course of lunchArrayFi) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi = true;
  }
});

function sortMenu(array, order) {
  if (!order) {
    sortedAsc = true;
    return array.sort();
  } else {
    sortedAsc = false;
    return array.sort().reverse();
  }
}

sortButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal.innerHTML = '';
  if (languageFi) {
    menu1.innerHTML = '';
    for (const course of sortMenu(lunchArrayFi, sortedAsc)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  } else {
    menu1.innerHTML = '';
    for (const course of sortMenu(lunchArrayEn, sortedAsc)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  }
});

function randomizeMeal() {
  if(languageFi){
    const random = Math.floor(Math.random() * lunchArrayFi.length);
    randomMeal.innerHTML = `Kokeile tätä: ${lunchArrayFi[random]}`;
  } else {
    const random = Math.floor(Math.random() * lunchArrayEn.length);
    randomMeal.innerHTML = `Try this: ${lunchArrayEn[random]}`;
  }
}

randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomizeMeal();
});
