// Task 06

//Створіть іменований модуль integerPart, який отримує десятковий дріб і повертає його цілу частину.
// Використовуйте синтаксис CommonJS.

function integerPart(number) {
  const result = Math.trunc(number);
  return result;
}

module.exports = { integerPart };
