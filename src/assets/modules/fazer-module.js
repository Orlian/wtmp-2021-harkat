import MenuFi from './fazer-fin.json';
import MenuEn from './fazer-en.json';

const getWeekday = () => {
  const date = new Date();
  let weekday = date.getDay() - 1;
  if (weekday === -1) {
    weekday = 6;
  }
  return weekday;
};

const daymenuFi = MenuFi.LunchMenus[getWeekday()].SetMenus;
const daymenuEn = MenuEn.LunchMenus[getWeekday()].SetMenus;
let dailyMeals = [];
let mealString;
const printMenu = (languageFi) => {
  dailyMeals = [];
  if (languageFi) {
    for (const setMenu of daymenuFi) {
      mealString = '';
      for (let i = 0; i < setMenu.Meals.length; i++) {
        if (i === setMenu.Meals.length - 1) {
          mealString += setMenu.Meals[i].Name + '.';
        } else {
          mealString += setMenu.Meals[i].Name + ', ';
        }
      }
      dailyMeals.push(mealString);
    }
  } else {
    for (const setMenu of daymenuEn) {
      mealString = '';
      for (let i = 0; i < setMenu.Meals.length; i++) {
        if (i === setMenu.Meals.length - 1) {
          mealString += setMenu.Meals[i].Name + '.';
        } else {
          mealString += setMenu.Meals[i].Name + ', ';
        }
      }
      dailyMeals.push(mealString);
    }
  }
  return dailyMeals;
};

const randomizeDish = (readyMenu) => {
  const randomIndex = Math.floor(Math.random() * readyMenu.length);
  return readyMenu[randomIndex];
};

const FazerTools = {printMenu, randomizeDish};

export default FazerTools;
