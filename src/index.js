import {sodexoMenuLoad, fazerMenuLoad} from './assets/modules/api';

'use strict';

const languageButton1 = document.querySelector('#language-button1');
const sortButton1 = document.querySelector('#sort-button1');
const randomButton1 = document.querySelector('#randomize-button1');
const randomButton2 = document.querySelector('#randomize-button2');
const menu1 = document.querySelector('#grid-menu1');
const randomMeal1 = document.querySelector('#random-meal1');
const menu2 = document.querySelector('#grid-menu2');
const randomMeal2 = document.querySelector('#random-meal2');
const navMenuButton = document.querySelector('#nav-burger-button');
const navBurgerMenu = document.querySelector('.nav-data-wrapper');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const restaurants = document.querySelectorAll('.grid-item');
let language = 'fi';
let sortedAsc = false;
menu1.innerHTML = '';
menu2.innerHTML = '';
let fazerMenu = {};
let sodexoMenu = {};

const initMenus = async () => {
  try {
    sodexoMenu = await sodexoMenuLoad();
    fazerMenu = await fazerMenuLoad();
    await printSodexoMenu(sodexoMenu, language);
    await printFazerMenu(fazerMenu, language);
  } catch (e) {
    console.log('initMenus error:', e.message);
  }
};
initMenus();

const printSodexoMenu = (menuObject, language) => {
  if (language.toString() === 'fi') {
    for (let course of menuObject.menu_fi) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  } else {
    for (let course of menuObject.menu_en) {
      menu1.innerHTML += `<li>${course}</li>`;
    }
  }
};

const printFazerMenu = (menuObject, language) => {
  if (language.toString() === 'fi') {
    for (let course of menuObject.menu_fi) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
  } else {
    for (let course of menuObject.menu_en) {
      menu2.innerHTML += `<li>${course}</li>`;
    }
  }
};

const sortMenus = (fazerObject, sodexoObject, language) => {
  let sortedFazer;
  let sortedSodexo;
  menu1.innerHTML = '';
  menu2.innerHTML = '';
  if (sortedAsc) {
    sortedFazer = (language === 'fi' ?
      fazerObject.menu_fi.sort().reverse() :
      fazerObject.menu_en.sort().reverse());
    sortedSodexo = (language === 'fi' ?
      sodexoObject.menu_fi.sort().reverse() :
      sodexoObject.menu_en.sort().reverse());
  } else {
    sortedFazer = (language === 'fi' ?
      fazerObject.menu_fi.sort() :
      fazerObject.menu_en.sort());
    sortedSodexo = (language === 'fi' ?
      sodexoObject.menu_fi.sort() :
      sodexoObject.menu_en.sort());
  }
  sortedAsc = !sortedAsc;
  for (let course of sortedFazer) {
    menu2.innerHTML += `<li>${course}</li>`;
  }
  for (let course of sortedSodexo) {
    menu1.innerHTML += `<li>${course}</li>`;
  }
};

const randomizeMeal = (object, language, evt) => {
  let random = Math.floor(Math.random() * (language === 'fi' ? object.menu_fi.length : object.menu_en.length));
  if(evt.target === randomButton1) {
    randomMeal1.innerHTML = `${language === 'fi' ? object.menu_fi[random] : object.menu_en[random]}`;
  } else {
    randomMeal2.innerHTML = `${language === 'fi' ? object.menu_fi[random] : object.menu_en[random]}`;
  }
};

const searchSite = (input) => {

};

languageButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomMeal1.innerHTML = '';
  randomMeal2.innerHTML = '';
  menu1.innerHTML = '';
  menu2.innerHTML = '';
  if (language.toString() === 'fi') {
    language = 'en';
    printSodexoMenu(sodexoMenu, language);
    printFazerMenu(fazerMenu, language);
  } else {
    language = 'fi';
    printSodexoMenu(sodexoMenu, language);
    printFazerMenu(fazerMenu, language);
  }
});

sortButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  sortMenus(fazerMenu, sodexoMenu, language);
});

randomButton1.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomizeMeal(sodexoMenu, language, evt);
});

randomButton2.addEventListener('click', (evt) => {
  evt.preventDefault();
  randomizeMeal(fazerMenu, language, evt);
});

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('.service-worker.js').
      then(registration => {
        console.log('SW registered:', registration);
      }).
      catch(registrationError => {
        console.log('SW registration failed:', registrationError);
      });
  });
}
 */

navMenuButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (navBurgerMenu.classList.contains('hidden')) {
    navBurgerMenu.classList.toggle('hidden');
  } else {
    navBurgerMenu.classList.toggle('hidden');
  }
});

window.addEventListener('resize', (evt) => {
  evt.preventDefault();
  if(window.innerWidth < 800) {
    navBurgerMenu.classList.add('hidden');
  } else {
    navBurgerMenu.classList.remove('hidden');
  }
});

searchButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  restaurants.forEach((restaurant) => {
    if(!restaurant.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
      restaurant.classList.add('hidden');
    } else {
      restaurant.classList.remove('hidden');
    }
  });
});
