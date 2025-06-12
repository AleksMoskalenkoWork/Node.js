// Task 04

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — масив рядків і записує їх у файл file_04.txt у поточній теці. Кожен елемент масиву потрібно записати з нового рядка, використовуючи переноси рядків \r\n. Кодування файлу — UTF-8, для запису використовуйте прапор w.

const fs = require('fs');

module.exports = (arrayOfStrings) => {
  const fileName = 'file_04.txt';
  const string = arrayOfStrings.join('\r\n');

  return fs.writeFileSync(fileName, string, { encoding: 'utf-8', flag: 'w' });
};
