'use strict';

let money = 120000;
let income = 'freelance';
let addExpenses = 'internet,food';
let deposit = true;
let mission = 2000000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей/долларов/гривен/юаней`);

console.log(addExpenses.toLowerCase().split(','));



money = +prompt('Ваш месячный доход?');
let budgetDay = (money / 30);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

//console.log(money);
//console.log(addExpenses);
//console.log(deposit);

let expenses1 = prompt('Введите обязательную статью расходов');
let expenses2 = prompt('Введите доп. обязательную статью расходов');
let amount1 = +prompt(`Во сколько обойдется первая статья расходов? (${expenses1})`);
let amount2 = +prompt(`Во сколько обойдется вторая статья расходов? (${expenses2})`);

//console.log(expenses1);
//console.log(expenses2);
//console.log(amount1);
//console.log(amount2);

let budgetMonth = money - (amount1 + amount2);
console.log(`Бюджет на месяц: ${budgetMonth}`)

console.log(`Цель будет достигнута за: ${Math.round(mission / budgetMonth)} месяц/а`);
console.log(`Бюджет на день: ${Math.round(budgetDay)}`);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
} else if (budgetDay == 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay == 0) {
    console.log('У вас нет дохода');
}