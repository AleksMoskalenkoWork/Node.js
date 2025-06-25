// Task 02

// Створіть анонімний модуль у цьому файлі, який приймає повний шлях до теки та повертає true або false залежно від того, чи існує вказана тека.

const fs = require('fs');

module.exports = (folderPathAbsolute) => {
  return (
    fs.existsSync(folderPathAbsolute) &&
    fs.statSync(folderPathAbsolute).isDirectory()
  );
};
