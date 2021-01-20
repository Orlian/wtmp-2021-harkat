import LunchMenu from './sodexo-day-example.json';

const lunchArrayFi = [];
for(const val in LunchMenu.courses){
  lunchArrayFi.push(LunchMenu.courses[val].title_fi);
}

const lunchArrayEn = [];
for(const val in LunchMenu.courses){
  lunchArrayEn.push(LunchMenu.courses[val].title_en);
}

let sortedAsc = false;

function sortMenu(array, order) {
  if (!order) {
    sortedAsc = true;
    return array.sort();
  } else {
    sortedAsc = false;
    return array.sort().reverse();
  }
}

function randomizeMeal(languageFi) {
  if(languageFi){
    return Math.floor(Math.random() * lunchArrayFi.length);
  } else {
    return Math.floor(Math.random() * lunchArrayEn.length);
  }
}

const SodexoTools = {lunchArrayFi, lunchArrayEn, sortMenu, randomizeMeal, sortedAsc};

export default SodexoTools;
