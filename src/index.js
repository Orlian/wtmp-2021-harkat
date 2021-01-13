const coursesEn = [
  'Hamburger, cream sauce and poiled potates',
  'Goan style fish curry and whole grain rice',
  'Vegan Chili sin carne and whole grain rice',
  'Broccoli puree soup, side salad with two napas',
  'Lunch baguette with BBQ-turkey filling',
  'Cheese / Chicken / Vege / Halloum burger and french fries'];

const coursesFi = [
  'Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa',
  'Goalaista kalacurrya ja täysjyväriisiä',
  'vegaani Chili sin carne ja täysjyväriisi',
  'Parsakeittoa,lisäkesalaatti kahdella napaksella',
  'Lunch baguette with BBQ-turkey filling',
  'Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset'];

const languageButton1 = document.querySelector('#language-button1');
const sortButton = document.querySelector('#sort-button1');
const randomButton = document.querySelector('#randomize-button1');
const menu1 = document.querySelector('#grid-menu1');
const randomMeal = document.querySelector('#random-meal1');
let languageFi = true;
let sortedAsc = false;
menu1.innerHTML = '';

for (const course of coursesFi) {
  menu1.innerHTML += `<li>${course}</li>`;
}

languageButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal.innerHTML = '';
  menu1.innerHTML = '';
  if (languageFi) {
    for (const course of coursesEn) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi = false;
  } else {
    for (const course of coursesFi) {
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
    for (const course of sortMenu(coursesFi, sortedAsc)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  } else {
    menu1.innerHTML = '';
    for (const course of sortMenu(coursesEn, sortedAsc)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  }
});

function randomizeMeal() {
  if(languageFi){
    const random = Math.floor(Math.random() * coursesFi.length);
    randomMeal.innerHTML = `Kokeile tätä: ${coursesFi[random]}`;
  } else {
    const random = Math.floor(Math.random() * coursesEn.length);
    randomMeal.innerHTML = `Try this: ${coursesEn[random]}`;
  }
}

randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomizeMeal();
});
