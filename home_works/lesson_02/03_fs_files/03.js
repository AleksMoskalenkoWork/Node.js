// Task 03

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — рядок тексту. Модуль має створити файл з ім’ям file_03.txt у поточній теці. У файл потрібно записати переданий текст у кодуванні UTF-8. Для запису використовуйте файловий прапор w.

const fs = require('fs');

module.exports = (string) => {
  const fileName = 'file_03.txt';
  return fs.writeFileSync(fileName, string, { encoding: 'utf-8', flag: 'w' });
};
