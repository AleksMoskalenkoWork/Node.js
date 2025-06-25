// Task 05

// Створіть анонімний модуль у цьому файлі, який приймає аргументи — вихідний файл і кінцевий файл. Модуль має зчитати вміст вихідного файлу (текст) та записати його у кінцевий файл. Кодування — UTF-8, для запису використовуйте прапорець w. Якщо вхідного файла немає, то виконання завершується (return;)

const fs = require('fs');

module.exports = (readFile, writeFile) => {
  if (!fs.existsSync(readFile)) {
    return;
  } else {
    const inputData = fs.readFileSync(readFile, 'utf-8');
    fs.writeFileSync(writeFile, inputData, {
      encoding: 'utf-8',
      flag: 'w',
    });
  }
};
