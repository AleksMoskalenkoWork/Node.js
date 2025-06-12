// Task 02

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — назву файлу. Модуль зчитує вміст файлу та повертає суму чисел, що в ньому містяться.

// Приклад аргумента: 'num.dat'
// Приклад поверненного результата: 25

const fs = require('fs');

module.exports = (fileName) => {
  let sum = 0;
  const content = fs.readFileSync(fileName, 'utf-8');
  const normalizeContent = content.split(/\s+/);

  for (item of normalizeContent) {
    const num = Number(item);
    sum += num;
  }

  return sum;
};
