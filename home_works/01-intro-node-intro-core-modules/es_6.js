import { clearArray } from './task_09.js';
import reversedArray from './task_10.js';

// Task 09
const mixArray = ['qa', 12, 13, 14, true, false, null, {}, []];
console.log('task_09', clearArray(mixArray));

// Task 10
const array = [12, 13, 14, 15, 16, 17, 18, 19];
console.log('task_10 reversed array', reversedArray(array));
console.log('task_10 initial array', reversedArray(array));
