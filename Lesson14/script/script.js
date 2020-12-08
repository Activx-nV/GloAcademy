'use strict';

let calculate = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
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
    inputIncomeItem = document.querySelectorAll('.income-items'),
    inputIncomeAmount = document.querySelectorAll('.income-amount'),
    inputExpensesAmount = document.querySelectorAll('.expenses-amount');


let regExp = /^[а-яА-Я., ]/;
let numberRegExp = /^[0-9]/;
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};





const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

const appData = new AppData();

AppData.prototype.start = function () {
    this.budget = +inputSalaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.checkInputForValidString = function (inputElement, callback) {
    if (inputElement.value !== '') {
        if (inputElement.value[inputElement.value.length - 1].match(regExp)) {
            inputElement.value = inputElement.value;
        } else {
            inputElement.value = inputElement.value.substr(0, inputElement.value.length - 1);
        }
    }
};

AppData.prototype.checkInputForNumber = function (inputElement, callback) {
    if (inputElement.value !== '') {
        if (inputElement.value[inputElement.value.length - 1].match(numberRegExp)) {
            inputElement.value = inputElement.value;
        } else {
            inputElement.value = inputElement.value.substr(0, inputElement.value.length - 1);
        }
    }
};

AppData.prototype.getContext = function (callback, inputElement) {
    let thisObj = this;
    return (function () {
        callback.apply(thisObj, inputElement);
    });
};

AppData.prototype.checkSalaryInput = function () {
    inputSalaryAmount.addEventListener('input', () => {
        if (inputSalaryAmount !== '' && isNumber(inputSalaryAmount.value)) {
            calculate.removeAttribute('disabled', "true");
        }
    });

    if (inputSalaryAmount.value === '') {
        calculate.setAttribute('disabled', "true");
    }

    inputSalaryAmount.addEventListener('input', () => {
        if (inputSalaryAmount.value === '' || parseFloat(inputSalaryAmount) === 'NaN') {
            calculate.setAttribute('disabled', "true");
        }
    });
};

AppData.prototype.reset = function () {
    inputIncomeItem.forEach((item, i) => {
        if (i !== 0) {
            item.remove();
        }
    });
    expensesItems.forEach((item, i) => {
        if (i !== 0) {
            item.remove();
        }
    });

    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';

    inputIncomeItem.innerHTML = '';
    calculate.style.display = "block";
    cancel.style.display = "none";
    inputSalaryAmount.removeAttribute('disabled', "true");

    for (let i = 0; i < inputIncomeItem.length; i++) {
        inputIncomeItem[i].firstElementChild.removeAttribute('disabled', "true");
        inputIncomeItem[i].lastElementChild.removeAttribute('disabled', "true");
    }
    for (let j = 0; j < inputIncomeAmount.length; j++) {
        inputIncomeAmount[j].removeAttribute('disabled', "true");
    }

    for (let k = 0; k < inputAdditionalIncomeItem.length; k++) {
        inputAdditionalIncomeItem[k].removeAttribute('disabled', "true");
    }

    for (let l = 0; l < inputExpensesTitle.length; l++) {
        inputExpensesTitle[l].removeAttribute('disabled', "true");
    }

    expensesItems.forEach((item) => {
        item.firstElementChild.removeAttribute('disabled', "true");
        item.lastElementChild.removeAttribute('disabled', "true");
    });

    incomePlus.removeAttribute('disabled', "true");
    expensesPlus.removeAttribute('disabled', "true");
    inputAdditionalExpensesItem.removeAttribute('disabled', "true");
    inputTargetAmount.removeAttribute('disabled', "true");

    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    showBudgetDayValue.value = '';
    showBudgetMonthValue.value = '';
    showExpensesMonthValue.value = '';
    showAdditionalExpensesValue.value = '';
    showAdditionalIncomeValue.value = '';
    showTargetMonthValue.value = '';
    showIncomePeriodValue.value = '';
    inputSalaryAmount.value = '';

    for (let i = 0; i < inputIncomeItem.length; i++) {
        inputIncomeItem[i].firstElementChild.value = '';
        inputIncomeItem[i].lastElementChild.value = '';
    }

    for (let j = 0; j < inputIncomeAmount.length; j++) {
        inputIncomeAmount[j].value = '';
    }

    for (let k = 0; k < inputAdditionalIncomeItem.length; k++) {
        inputAdditionalIncomeItem[k].value = '';
    }

    for (let l = 0; l < inputExpensesTitle.length; l++) {
        inputExpensesTitle[l].value = '';
    }

    expensesItems.forEach((item) => {
        item.firstElementChild.value = '';
        item.lastElementChild.value = '';
    });

    inputAdditionalExpensesItem.value = '';
    inputTargetAmount.value = '';

    appData.checkSalaryInput();

};
AppData.prototype.showResult = function () {

    showBudgetDayValue.value = this.budgetDay;
    showBudgetMonthValue.value = this.budgetMonth;
    showExpensesMonthValue.value = this.expensesMonth;
    showAdditionalExpensesValue.value = this.addExpenses.join(', ');
    showAdditionalIncomeValue.value = this.addIncome.join(', ');
    showTargetMonthValue.value = Math.ceil(this.getTargetMonth());
    showIncomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.firstElementChild.value = '';
    cloneExpensesItem.lastElementChild.value = '';

    cloneExpensesItem.firstElementChild.addEventListener('input', () => {
        if (cloneExpensesItem.firstElementChild.value !== '') {
            if (cloneExpensesItem.firstElementChild.value[cloneExpensesItem.firstElementChild.value.length - 1].match(regExp)) {
                cloneExpensesItem.firstElementChild.value = cloneExpensesItem.firstElementChild.value;
            } else {
                cloneExpensesItem.firstElementChild.value = cloneExpensesItem.firstElementChild.value.substr(0, cloneExpensesItem.firstElementChild.value.length - 1);
            }
        }
    });

    cloneExpensesItem.lastElementChild.addEventListener('input', () => {
        if (cloneExpensesItem.lastElementChild.value !== '') {
            if (cloneExpensesItem.lastElementChild.value[cloneExpensesItem.lastElementChild.value.length - 1].match(numberRegExp)) {
                cloneExpensesItem.lastElementChild.value = cloneExpensesItem.lastElementChild.value;
            } else {
                cloneExpensesItem.lastElementChild.value = cloneExpensesItem.lastElementChild.value.substr(0, cloneExpensesItem.lastElementChild.value.length - 1);
            }
        }
    });

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = inputIncomeItem[0].cloneNode(true);
    cloneIncomeItem.firstElementChild.value = '';
    cloneIncomeItem.lastElementChild.value = '';

    cloneIncomeItem.firstElementChild.addEventListener('input', () => {
        if (cloneIncomeItem.firstElementChild.value !== '') {
            if (cloneIncomeItem.firstElementChild.value[cloneIncomeItem.firstElementChild.value.length - 1].match(regExp)) {
                cloneIncomeItem.firstElementChild.value = cloneIncomeItem.firstElementChild.value;
            } else {
                cloneIncomeItem.firstElementChild.value = cloneIncomeItem.firstElementChild.value.substr(0, cloneIncomeItem.firstElementChild.value.length - 1);
            }
        }
    });

    cloneIncomeItem.lastElementChild.addEventListener('input', () => {
        if (cloneIncomeItem.lastElementChild.value !== '') {
            if (cloneIncomeItem.lastElementChild.value[cloneIncomeItem.lastElementChild.value.length - 1].match(numberRegExp)) {
                cloneIncomeItem.lastElementChild.value = cloneIncomeItem.lastElementChild.value;
            } else {
                cloneIncomeItem.lastElementChild.value = cloneIncomeItem.lastElementChild.value.substr(0, cloneIncomeItem.lastElementChild.value.length - 1);
            }
        }
    });

    inputIncomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    inputIncomeItem = document.querySelectorAll('.income-items');
    if (inputIncomeItem.length === 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getIncome = function () {
    const _this = this;
    inputIncomeItem.forEach(function (item) {

        let itemIncome = item.querySelector('.income-title').value;

        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }

};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    inputAdditionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += parseFloat(this.expenses[key]);
    }
    return this.expensesMonth;
};

AppData.prototype.getBudget = function () {
    this.budgetDay = Math.round(this.budget / 30);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    return this.budgetMonth;
};

AppData.prototype.getTargetMonth = function () {
    return inputTargetAmount.value / this.getBudget();
};

AppData.prototype.getRangeLevel = function () {
    inputPeriodRangeCounter.textContent = inputPeriodRange.value;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (this.budgetDay === 0) {
        return 'У вас нет дохода';
    } else if (this.budgetDay < 0) {
        return 'Что-то пошло не так';
    }
};

AppData.prototype.summaryList = function () {
    console.log('Наша программа включает в себя данные:');
    for (let key in this) {
        if (typeof this[key] === 'number' || typeof this[key] === 'string' && this[key] !== '') {
            console.log(`${key} - ${this[key]}`);
        } else if (key === 'expenses') {
            for (let key2 in this[key]) {
                console.log(`Обязательные расходы: ${key2}`);
            }
        }
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
        while (!isNumber(this.percentDeposit)) {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        }

        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while (!isNumber(this.moneyDeposit)) {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
    }
};

AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * inputPeriodRange.value;
};

AppData.prototype.eventListeners = function () {

    appData.checkSalaryInput();

    let applied1 = appData.getContext(appData.checkInputForValidString, [inputIncomeTitle[0]]);
    inputIncomeTitle[0].addEventListener('input', applied1);

    let applied2 = appData.getContext(appData.checkInputForValidString, [inputAdditionalIncomeItem[0]]);
    inputAdditionalIncomeItem[0].addEventListener('input', applied2);

    let applied3 = appData.getContext(appData.checkInputForValidString, [inputAdditionalIncomeItem[1]]);
    inputAdditionalIncomeItem[1].addEventListener('input', applied3);

    let applied4 = appData.getContext(appData.checkInputForValidString, [inputExpensesTitle[0]]);
    inputExpensesTitle[0].addEventListener('input', applied4);

    let applied5 = appData.getContext(appData.checkInputForNumber, [inputIncomeAmount[0]]);
    inputIncomeAmount[0].addEventListener('input', applied5);

    let applied6 = appData.getContext(appData.checkInputForNumber, [inputExpensesAmount[0]]);
    inputExpensesAmount[0].addEventListener('input', applied6);

    let applied7 = appData.getContext(appData.checkInputForNumber, [inputTargetAmount]);
    inputTargetAmount.addEventListener('input', applied7);

    calculate.addEventListener('click', () => {
        appData.start.apply(appData);

        calculate.style.display = "none";
        cancel.style.display = "block";
        inputSalaryAmount.setAttribute('disabled', "true");

        for (let i = 0; i < inputIncomeItem.length; i++) {
            inputIncomeItem[i].firstElementChild.setAttribute('disabled', "true");
            inputIncomeItem[i].lastElementChild.setAttribute('disabled', "true");
        }

        for (let j = 0; j < inputIncomeAmount.length; j++) {
            inputIncomeAmount[j].setAttribute('disabled', "true");
        }

        for (let k = 0; k < inputAdditionalIncomeItem.length; k++) {
            inputAdditionalIncomeItem[k].setAttribute('disabled', "true");
        }

        for (let l = 0; l < inputExpensesTitle.length; l++) {
            inputExpensesTitle[l].setAttribute('disabled', "true");
        }

        expensesItems.forEach((item) => {
            item.firstElementChild.setAttribute('disabled', "true");
            item.lastElementChild.setAttribute('disabled', "true");
        });

        incomePlus.setAttribute('disabled', "true");
        expensesPlus.setAttribute('disabled', "true");
        inputAdditionalExpensesItem.setAttribute('disabled', "true");
        inputTargetAmount.setAttribute('disabled', "true");
    });

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    inputPeriodRange.addEventListener('change', appData.getRangeLevel);
    inputPeriodRange.addEventListener('change', () => {
        showIncomePeriodValue.value = appData.calcSavedMoney();
    });
    cancel.addEventListener('click', appData.reset);
};

appData.eventListeners();