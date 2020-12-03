'use strict';

let calculate = document.querySelector('#start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    showBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    showBudgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    showExpensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    showAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    showAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    showIncomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    showTargetMonthValue = document.getElementsByClassName('target_month-value')[0],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelectorAll('input.income-title'),
    inputExpensesTitle = document.querySelectorAll('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodRange = document.querySelector('.period-select'),
    inputPeriodRangeCounter = document.querySelector('.period-amount'),
    inputIncomeItem = document.querySelectorAll('.income-items');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

inputSalaryAmount.addEventListener('input', () => {
    if (inputSalaryAmount !== '' && isNumber(inputSalaryAmount.value)) {
        calculate.removeAttribute('disabled', "true");
    }
});

if (inputSalaryAmount.value === '') {
    calculate.setAttribute('disabled', "true");
}

inputSalaryAmount.addEventListener('input', () => {
    if (inputSalaryAmount.value === '') {
        calculate.setAttribute('disabled', "true");
    }
});


let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {

        appData.budget = +inputSalaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function () {
        showBudgetDayValue.value = appData.budgetDay;
        showBudgetMonthValue.value = appData.budgetMonth;
        showExpensesMonthValue.value = appData.expensesMonth;
        showAdditionalExpensesValue.value = appData.addExpenses.join(', ');
        showAdditionalIncomeValue.value = appData.addIncome.join(', ');
        showTargetMonthValue.value = Math.ceil(appData.getTargetMonth());
        showIncomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = inputIncomeItem[0].cloneNode(true);
        inputIncomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        inputIncomeItem = document.querySelectorAll('.income-items');
        if (inputIncomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function () {
        let addExpenses = inputAdditionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getIncome: function () {
        inputIncomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddIncome: function () {
        inputAdditionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += parseFloat(appData.expenses[key]);
        }
        return appData.expensesMonth;
    },
    getBudget: function () {
        appData.budgetDay = Math.round(appData.budget / 30);
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        return appData.budgetMonth;
    },
    getTargetMonth: function () {
        return inputTargetAmount.value / appData.getBudget();
    },
    getRangeLevel: function () {
        inputPeriodRangeCounter.textContent = inputPeriodRange.value;
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay === 0) {
            return 'У вас нет дохода';
        } else if (appData.budgetDay < 0) {
            return 'Что-то пошло не так';
        }
    },
    summaryList: function () {
        console.log('Наша программа включает в себя данные:');
        for (let key in appData) {
            if (typeof appData[key] === 'number' || typeof appData[key] === 'string' && appData[key] !== '') {
                console.log(`${key} - ${appData[key]}`);
            } else if (key === 'expenses') {
                for (let key2 in appData[key]) {
                    console.log(`Обязательные расходы: ${key2}`);
                }
            }
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }

            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * inputPeriodRange.value;
    }
};

calculate.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
inputPeriodRange.addEventListener('change', appData.getRangeLevel);
inputPeriodRange.addEventListener('change', () => {
    showIncomePeriodValue.value = appData.calcSavedMoney();
});


// if (appData.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяц/а');
// } else {
//     console.log('Цель не будет достигнута');
// }

//console.log(appData.getStatusIncome());
//appData.summaryList();


//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
