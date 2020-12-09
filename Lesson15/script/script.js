'use strict';

const calculate = document.querySelector('#start'),
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
    inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodRange = document.querySelector('.period-select'),
    inputPeriodRangeCounter = document.querySelector('.period-amount'),
    inputIncomeAmount = document.querySelectorAll('.income-amount'),
    inputExpensesAmount = document.querySelectorAll('.expenses-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    inputIncomeItem = document.querySelectorAll('.income-items');


const regExp = /^[а-яА-Я., ]/;
const numberRegExp = /^[0-9]/;

let isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
let checkSalary = () => {
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





class AppData {
    constructor() {
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
    }
    start() {
        this.budget = +inputSalaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }

    checkInputForValidString(inputElement) {
        if (inputElement.value !== '') {
            if (inputElement.value[inputElement.value.length - 1].match(regExp)) {
                inputElement.value = inputElement.value;
            } else {
                inputElement.value = inputElement.value.substr(0, inputElement.value.length - 1);
            }
        }
    }

    checkInputForNumber(inputElement) {
        if (inputElement.value !== '') {
            if (inputElement.value[inputElement.value.length - 1].match(numberRegExp)) {
                inputElement.value = inputElement.value;
            } else {
                inputElement.value = inputElement.value.substr(0, inputElement.value.length - 1);
            }
        }
    }

    getContext(callback, inputElement) {
        let thisObj = this;
        return (() => {
            callback.apply(thisObj, inputElement);
        });
    }

    reset() {
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

        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });

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
        //NB
        //let reset = new AppData(); -PS! Можно ли как-то обнулить все this'ы перекопированием класса, как мы это делали с Object.assign?
        //Просто получается мы использовали appData в прошлом вариаенте, а тут нужно как то универсально указать обнуляемый класс
        //Я пытался что-то поделать, но не удалось. Хотел бы узнать у вас, если можно, то как это сделать :)
        //Object.assign(this, reset);

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

        inputPeriodRangeCounter.textContent = '1';
        inputPeriodRange.value = 1;
    }

    showResult() {
        showBudgetDayValue.value = this.budgetDay;
        showBudgetMonthValue.value = this.budgetMonth;
        showExpensesMonthValue.value = this.expensesMonth;
        showAdditionalExpensesValue.value = this.addExpenses.join(', ');
        showAdditionalIncomeValue.value = this.addIncome.join(', ');
        showTargetMonthValue.value = Math.ceil(this.getTargetMonth());
        showIncomePeriodValue.value = this.calcSavedMoney();
    }

    addExpensesBlock() {
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
    }

    addIncomeBlock() {
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
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getAddExpenses() {
        let addExpenses = inputAdditionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getIncome() {
        inputIncomeItem.forEach((item) => {

            let itemIncome = item.querySelector('.income-title').value;

            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddIncome() {
        inputAdditionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += parseFloat(this.expenses[key]);
        }
        return this.expensesMonth;
    }

    getBudget() {
        this.budgetDay = Math.round(this.budget / 30);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        return this.budgetMonth;
    }

    getTargetMonth() {
        return inputTargetAmount.value / this.getBudget();
    }

    getRangeLevel() {
        inputPeriodRangeCounter.textContent = inputPeriodRange.value;
    }

    getStatusIncome() {
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
    }

    summaryList() {
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
    }

    getInfoDeposit() {
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
    }

    calcSavedMoney() {
        return this.budgetMonth * inputPeriodRange.value;
    }

    eventListeners() {

        const applied1 = this.getContext(this.checkInputForValidString, [inputIncomeTitle[0]]);
        inputIncomeTitle[0].addEventListener('input', applied1);

        const applied2 = this.getContext(this.checkInputForValidString, [inputAdditionalIncomeItem[0]]);
        inputAdditionalIncomeItem[0].addEventListener('input', applied2);

        const applied3 = this.getContext(this.checkInputForValidString, [inputAdditionalIncomeItem[1]]);
        inputAdditionalIncomeItem[1].addEventListener('input', applied3);

        const applied4 = this.getContext(this.checkInputForValidString, [inputExpensesTitle[0]]);
        inputExpensesTitle[0].addEventListener('input', applied4);

        const applied5 = this.getContext(this.checkInputForNumber, [inputIncomeAmount[0]]);
        inputIncomeAmount[0].addEventListener('input', applied5);

        const applied6 = this.getContext(this.checkInputForNumber, [inputExpensesAmount[0]]);
        inputExpensesAmount[0].addEventListener('input', applied6);

        const applied7 = this.getContext(this.checkInputForNumber, [inputTargetAmount]);
        inputTargetAmount.addEventListener('input', applied7);

        calculate.addEventListener('click', () => {
            //appData.start.apply(appData);
            this.start();
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

        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        inputPeriodRange.addEventListener('change', this.getRangeLevel);
        inputPeriodRange.addEventListener('change', () => {
            showIncomePeriodValue.value = this.calcSavedMoney();
        });
        cancel.addEventListener('click', this.reset);
        cancel.addEventListener('click', checkSalary);

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
    }
}

let appData = new AppData();

appData.eventListeners();