// Task 05

// Створіть іменований модуль randomSymbol, який отримує рядок і повертає випадковий символ з цього рядка.
// Якщо передано порожній рядок — повертає порожній рядок.
// Використовуйте синтаксис CommonJS.

function randomSymbol(string) {
  if (string === '') {
    return string;
  } else {
    const randomIndex = Math.floor(Math.random() * string.length);
    return string[randomIndex];
  }
}

module.exports = { randomSymbol };
