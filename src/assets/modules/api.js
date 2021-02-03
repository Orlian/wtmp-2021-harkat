'use strict';
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let date = currentDate.getDate();

if (date < 10) {
  date = '0' + date;
}

if (month < 10) {
  month = '0' + month;
}

currentDate = `${year}-${month}-${date}`;

const fetchSodexoData = async () => {
  let response;
  try {
    response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://sodexo.fi/ruokalistat/output/daily_json/152/${currentDate}`);
  } catch (e) {
    console.log('fetchSodexoData error:', e.message);
  }
  return await response.json();
};

const sodexoMenuLoad = async (lang) => {
  let response;
  let menu = [];
  try {
    response = await fetchSodexoData();
    let courses = Object.values(response.courses);
    for (let course of courses) {
      if (lang) {
        menu.push(course.title_fi);
      } else {
        menu.push(course.title_en);
      }
    }
    return menu;
  } catch (e) {
    console.log('sodexoMenuLoad error:', e.message);
  }
};

const fetchFazerData = async (lang) => {
  let response;
  try {
    response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://foodandco.fi/modules/json/json/Index?costNumber=3134&language=${lang ?
        'fi' :
        'en'}`);

  } catch (e) {
    console.log('fetchFazerData error:', e.message);
  }
  return await response.json();
};

const fazerMenuLoad = async (lang) => {
  let response;
  let menu;
  try {
    response = await fetchFazerData(lang);
    let menus = Object.values(response.MenusForDays);
    for (let day of menus) {
      if (currentDate === day.Date.slice(0, 10)) {
        menu = day.SetMenus[0].Components;
      }
    }
    return menu;
  } catch (e) {
    console.log('fazerMenuLoad error:', e.message);
  }
};

const ApiData = {currentDate, fazerMenuLoad, sodexoMenuLoad};

export default ApiData;
