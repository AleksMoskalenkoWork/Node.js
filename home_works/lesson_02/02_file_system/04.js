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

module.exports = (folderName) => {
  const folderPath = path.resolve(__dirname, folderName);

  if (!fs.existsSync(folderPath)) return false;
  const files = fs.readdirSync(folderPath);

  return files.map((file) => ({
    ext: path.extname(file).slice(1),
    name: path.basename(file, path.extname(file)),
  }));
};
