'use strict';
import {fazerProxyUrl, sodexoProxyUrl} from '../../settings';

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
      `${sodexoProxyUrl}/ruokalistat/output/daily_json/152/${currentDate}`);
  } catch (e) {
    console.log('fetchSodexoData error:', e.message);
  }
  return await response.json();
};

const sodexoMenuLoad = async () => {
  let response;
  let menu = {};
  let menuFi = [];
  let menuEn = [];
  try {
    response = await fetchSodexoData();
    let courses = Object.values(response.courses);
    for (let course of courses) {
      menuFi.push(course.title_fi);
      menuEn.push(course.title_en);
    }
    menu = {'menu_fi': menuFi, 'menu_en': menuEn};
    console.log('menu object:', menu);
    return menu;
  } catch (e) {
    console.log('sodexoMenuLoad error:', e.message);
  }
};

const fetchFazerData = async (lang) => {
  let response;
  try {
    response = await fetch(
      `${fazerProxyUrl}/modules/json/json/Index?costNumber=3134&language=${lang.toString()}`);

  } catch (e) {
    console.log('fetchFazerData error:', e.message);
  }
  return await response.json();
};

const fazerMenuLoad = async () => {
  let responseFi;
  let responseEn;
  let menuFi = [];
  let menuEn = [];
  let menuObject = {};
  try {
    responseFi = await fetchFazerData('fi');
    responseEn = await fetchFazerData('en');
    let menus = Object.values(responseFi.MenusForDays);
    for (let day of menus) {
      if (currentDate === day.Date.slice(0, 10)) {
        menuFi = day.SetMenus[0].Components;
      }
    }
    menus = Object.values(responseEn.MenusForDays);
    for (let day of menus) {
      if (currentDate === day.Date.slice(0, 10)) {
        menuEn = day.SetMenus[0].Components;
      }
    }
    menuObject = {'menu_fi': menuFi, 'menu_en': menuEn};
    console.log('fazer menuObject:', menuObject);
    return menuObject;
  } catch (e) {
    console.log('fazerMenuLoad error:', e.message);
  }
};

export {fazerMenuLoad, sodexoMenuLoad};
