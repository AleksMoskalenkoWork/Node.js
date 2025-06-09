// Task 04

// Створіть іменований модуль prepareString, який отримує рядок, видаляє пробіли на початку та в кінці, переводить текст у нижній регістр і робить першу літеру великою.
// Модуль повинен повертати опрацьований рядок. Використовуйте синтаксис CommonJS.

// Ці дії дуже корисні під час обробки інформації перед збереженням у базу даних,
// наприклад, під час збереження імен. Подумайте, які додаткові вимоги ви б додали до цього завдання в реальному проєкті.

function prepareString(string) {
  const formatString = string.trim().toLowerCase();
  const firstLatterToUpperCase = formatString.charAt(0).toUpperCase();
  const result = firstLatterToUpperCase + formatString.slice(1);
  return result;
}
module.exports = { prepareString };
