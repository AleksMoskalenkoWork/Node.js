// Task 05

// Створіть анонімний модуль у цьому файлі, який приймає назву теки та повертає кількість файлів у ній (теки не враховуємо).

// Приклад аргумента 'test_folder'

const path = require('path');
const fs = require('fs');
const getAbsolutePath = require('./01');

const folderName = 'test_folder';

module.exports = () => {
  const data = [];
  const folderPath = getAbsolutePath(folderName);
  const files = fs.readdirSync(folderPath);

  for (file of files) {
    const stats = fs.statSync(path.join(folderPath, file));
    if (stats.isFile()) {
      const ext = path.extname(file).slice(1);
      const name = path.basename(file, path.extname(file));
      const obj = { name, ext };
      data.push(obj);
    }
  }

  return data.length;
};
