// Task 04

// Створіть анонімний модуль, який приймає назву теки та повертає її вміст у форматі масиву з об'єктами. Приклад масиву наведено нижче. Якщо теки не існує — повертає false. Якщо тека порожня — повертає порожній масив.

// Приклад об'єкту
// [
//     {name : "one", ext : "txt"},
//     {name : "doc", ext  : "dat"}
// ]

// Приклад аргумента 'test_folder'

const path = require('path');
const fs = require('fs');
const getAbsolutePath = require('./01');

module.exports = (folderName) => {
  const data = [];
  const folderPath = getAbsolutePath(folderName);
  const isExists = fs.existsSync(folderPath);

  if (isExists === true) {
    const files = fs.readdirSync(folderPath);
    if (files.length > 0) {
      for (file of files) {
        const ext = path.extname(file).slice(1);
        const name = path.basename(file, path.extname(file));
        const obj = { name, ext };
        data.push(obj);
      }
      // console.log('not empty folder', data);
      return data;
    } else {
      // console.log('empty folder', data);
      return data;
    }
  } else {
    // console.log('not exists folder', false);
    return false;
  }
};
