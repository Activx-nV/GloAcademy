'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
let income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 12;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

let showTypeOf = function(item) {
    console.log(typeof item);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


let expenses = [];
// let expenses1Amount= +prompt(`Во сколько это обойдется? (${expenses1})`);
// let expenses2Amount = +prompt(`Во сколько это обойдется? (${expenses2})`);

console.log(addExpenses.toLowerCase().split(','));

let monthAmount = 0;

let getExpensesMonth = function() {
    let sum;
    for (let i = 0; i < 2; i++) {
            
        expenses[i] = prompt('Введите обязательную статью расходов');

        do{
            sum = prompt('Во сколько это обойдется?(цифры)');
        }
        while (!isNumber(sum));
        monthAmount += parseFloat(sum);
    }
    console.log(expenses);
    return monthAmount;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function() {
    return (money - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
    return mission / accumulatedMonth;
};

let budgetDay = accumulatedMonth / 30;

if (getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяц/а');
} else {
    console.log('Цель не будет достигнута');
}


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay === 0) {
        return 'У вас нет дохода';
    } else if (budgetDay < 0) {
        return 'Что-то пошло не так';
    }
};

console.log(getStatusIncome());
