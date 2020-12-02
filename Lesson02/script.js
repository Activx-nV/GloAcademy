let money = 1337;
let income = 'freelance';
let addExpenses = 'internet,food';
let deposit = true;
let mission = 20000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} евро`);

console.log(addExpenses.toLowerCase().split(''));

let budgetDay = (money / 30);
console.log(budgetDay);