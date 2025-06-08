// У цьому файлі ви підключаєте модулі для перевірки їхньої роботи.
// Після перевірки модуль можна закоментувати, щоб його вивід не заважав.

// Перше завдання реалізовано як приклад підключення та виконання.
// Після ознайомлення можна або видалити підключення, або закоментувати його.

// Завдання розміщені у відповідних файлах.

const string = ' random strING ';

// Task 01
const task_01 = require('./task_01');
console.log('task_01', task_01);

// Task 02
const task_02 = require('./task_02');
console.log('task_02 return 1', task_02(1, 1, 1, 1));
console.log('task_02 return 4', task_02(1, 1, 4, 1));

// Task 03
const task_03 = require('./task_03');
const array = [1, 1, 1, 1, -1, 0];
console.log('task_03', task_03(array));

// Task 04
const { prepareString } = require('./task_04');
console.log('task_04', prepareString(string));

// Task 05
const { randomSymbol } = require('./task_05');
console.log('task_05', randomSymbol(string));

// Task 06
const { integerPart } = require('./task_06');
console.log('task_05', integerPart(12.0892));

// Task 07
const task_07 = require('./task_07');
console.log('task_07', task_07(string));

// Task 08
const { string_check } = require('./task_08');
console.log('task_08', string_check(string));
