// Task 03

// Створіть анонімний модуль, який реалізує функцію, що отримує масив чисел та повертає кількість елементів, які є більшими або дорівнюють нулю.
// Використовуйте синтаксис CommonJS.

module.exports = (numbers) => {
  const result = numbers.filter((number) => number >= 0).length;
  return result;
};
