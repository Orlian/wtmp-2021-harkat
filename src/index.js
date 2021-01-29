import SodexoData from './assets/modules/sodexo-module';
import FazerData from './assets/modules/fazer-module';

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
const navMenuButton = document.querySelector('#nav-burger-button');
const navBurgerMenu = document.querySelector('.nav-hamburger');
let languageFi1 = true;
let languageFi2 = true;
let sortedAsc1 = SodexoData.sortedAsc;
let sortedAsc2 = false;
menu1.innerHTML = '';
menu2.innerHTML = '';

for (const course of SodexoData.lunchArrayFi) {
  menu1.innerHTML += `<li>${course}</li>`;
}

for (const course of FazerData.printMenu(languageFi2)) {
  menu2.innerHTML += `<li>${course}</li>`;
}
languageFi2 = false;

languageButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal1.innerHTML = '';
  menu1.innerHTML = '';
  if (languageFi1) {
    for (const course of SodexoData.lunchArrayEn) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    languageFi1 = false;
  } else {
    for (const course of SodexoData.lunchArrayFi) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    console.log(SodexoData.lunchArrayFi);
    languageFi1 = true;
  }
});

languageButton2.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal2.innerHTML = '';
  menu2.innerHTML = '';
  for (const course of FazerData.printMenu(languageFi2)) {
    menu2.innerHTML += `<li>${course}</li>`;
  }
  console.log(FazerData.printMenu(languageFi2));
  languageFi2 = !languageFi2;
});

sortButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal1.innerHTML = '';
  if (languageFi1) {
    menu1.innerHTML = '';
    for (const course of SodexoData.sortMenu(SodexoData.lunchArrayFi,
      sortedAsc1)) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc1 = !sortedAsc1;
  } else {
    menu1.innerHTML = '';
    for (const course of SodexoData.sortMenu(SodexoData.lunchArrayEn,
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
    for (const course of FazerData.printMenu(!languageFi2).sort()) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc2 = !sortedAsc2;
  } else {
    menu2.innerHTML = '';
    for (const course of FazerData.printMenu(!languageFi2).sort().reverse()) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
    sortedAsc2 = !sortedAsc2;
  }
});

randomButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (languageFi1) {
    randomMeal1.innerHTML = `Kokeile tätä: ${SodexoData.lunchArrayFi[SodexoData.randomizeMeal(
      languageFi1)]}`;
  } else {
    randomMeal1.innerHTML = `Kokeile tätä: ${SodexoData.lunchArrayEn[SodexoData.randomizeMeal(
      languageFi1)]}`;
  }
});

randomButton2.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal2.innerHTML = '';
  let dishList = [];
  for(const dish of menu2.childNodes) {
    dishList.push(dish.innerHTML);
  }
  randomMeal2.innerHTML = 'Kokeile tätä:' + FazerData.randomizeDish(dishList);
});

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('.service-worker.js').then(registration => {
      console.log('SW registered:', registration);
    }).catch(registrationError => {
      console.log('SW registration failed:', registrationError);
    });
  });
}

navMenuButton.addEventListener('click' , (evt) => {
  evt.preventDefault();
  if(navBurgerMenu.style.display !== 'flex') {
    navBurgerMenu.style.display = 'flex';
  } else {
    navBurgerMenu.style.display = 'none';
  }
});
