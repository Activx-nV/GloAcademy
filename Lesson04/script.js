'use strict';

let money = 120000;
let income = 'freelance';
let addExpenses = 'internet,food';
let deposit = true;
let mission = 100000;
let period = 12;

let showTypeOf = function() {
    console.log(typeof money);
    console.log(typeof income);
    console.log(typeof deposit);
};



money = +prompt('Ваш месячный доход?');
let budgetDay = (money / 30);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.toLowerCase().split(',');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt(`Во сколько это обойдется? (${expenses1})`);
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt(`Во сколько это обойдется? (${expenses2})`);



if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay === 0) {
    console.log('У вас нет дохода');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
}


//Lesson 4

let getExpensesMonth = function() {
    return (amount1 + amount2);
};

let getAccumulatedMonth = function() {
    return (money - (amount1 + amount2));
};

let accumulatedMonth = function() {
    return getAccumulatedMonth();
};

let getTargetMonth = function() {
    console.log(`Цель будет достигнута за: ${Math.round(mission / accumulatedMonth())} месяц/а`);
};

let getStatusIncome = function() {
    console.log(income);
};


budgetDay = (Math.round(accumulatedMonth() / 30));


showTypeOf();
console.log(getExpensesMonth());
console.log(addExpenses);
getTargetMonth();
console.log(budgetDay);
getStatusIncome();


