// Task 03

// Створіть анонімний модуль у цьому файлі, який приймає назву файлу та повертає його розмір. Якщо файл не існує — повертає 0.

// Приклад аргумента 'test_folder/one.txt'

const fs = require('fs');

module.exports = (fileName) => {
  try {
    const filePath = path.resolve(__dirname, fileName);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      return stats.size;
    }
    return 0;
  } catch (error) {
    return 0;
  }
};
