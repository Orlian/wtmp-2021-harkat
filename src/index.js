import LunchMenu from '../sodexo-day-example.json';
import FazerMenu from '../fazer.json';

console.log('FazerMenu objekti', FazerMenu);
const languageButton1 = document.querySelector('#language-button1');
const sortButton = document.querySelector('#sort-button1');
const randomButton = document.querySelector('#randomize-button1');
const menu1 = document.querySelector('#grid-menu1');
const randomMeal = document.querySelector('#random-meal1');
const regexInput = document.querySelector('#regex-input');
const regexForm = document.querySelector('#regex-form');
let languageFi = true;
let sortedAsc = false;
menu1.innerHTML = '';

const lunchArrayFi = [];
for (const val in LunchMenu.courses) {
  lunchArrayFi.push(LunchMenu.courses[val].title_fi);
}

const lunchArrayEn = [];
for (const val in LunchMenu.courses) {
  lunchArrayEn.push(LunchMenu.courses[val].title_en);
}

const dishList = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00},
];

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
  if (languageFi) {
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

const validateMeal = (string) => {
  console.log(/^[A-ZÖÄÅ]{1}[a-zöäåA-ZÄÖÅ0-9/\- ,()]{3,63}$/.test(string));
};

regexForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validateMeal(regexInput.value);
});

const sortPrice = () => {
  console.log('Lista ennen:', dishList);
  const sortedList = [...dishList].sort((a, b) => a.price - b.price);
  console.log('Lista jälkeen:', sortedList);
};

const sortingButton = document.querySelector('#sort-price');

sortingButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  sortPrice();
});

const filterPrice = () => {
  const filteredList = [...dishList].filter((dish) => dish.price < 5);
  console.log('Filtered list', filteredList);
};

const filterButton = document.querySelector('#filter-price');

filterButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  filterPrice();
});

const priceHike = () => {
  return dishList.map(dish => {
    return {
      name: dish.name,
      price: (dish.price * 1.15).toFixed(2),
    };
  });
};

const priceHikeButton = document.querySelector('#raise-price');

priceHikeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log(priceHike());
});

const sumPrices = () => {
  const priceSum = dishList.reduce((a, b) => ({price: a.price + b.price}));
  console.log('Hintojen summa:', priceSum);
};

const priceSumButton = document.querySelector('#sum-button');

priceSumButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  sumPrices();
});

const mondayDishes = FazerMenu.LunchMenus[0].SetMenus;
console.log('modayDishes', mondayDishes);
const veganButton = document.querySelector('#vegan-button');
console.log('object values', mondayDishes[0].Meals);

const sortVegan = (menuData) => {
  let veganMeals = [];
  for(const setMenu of menuData.LunchMenus[0].SetMenus){
    for(const meal of setMenu.Meals) {
      if(meal.Diets.includes('Veg')){
        veganMeals.push(meal.Name);
      }
    }
  }
  return veganMeals;
};

veganButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('Testaa vegaani sorttausta: ', sortVegan(FazerMenu));
});
