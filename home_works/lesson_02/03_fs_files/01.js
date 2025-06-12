// Task 01

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — назву файлу. Модуль повертає вміст цього файлу.

// Приклад аргумента: 'test.file'

const fs = require('fs');

module.exports = (fileName) => {
  return fs.readFileSync(fileName, 'utf-8');
};
