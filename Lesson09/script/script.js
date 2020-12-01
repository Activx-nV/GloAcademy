const   calculate = document.querySelector('#start'),
        addIncome = document.getElementsByTagName('button')[0],
        addExpenses = document.getElementsByTagName('button')[1],
        checkbox = document.querySelector('#deposit-check'),
        input_AdditionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        show_budgetMonth = document.getElementsByClassName('budget_month-value'),
        show_budgetDay = document.getElementsByClassName('budget_day-value'),
        show_expensesMonth = document.getElementsByClassName('expenses_month-value'),
        show_additionalIncome = document.getElementsByClassName('additional_income-value'),
        show_additionalExpenses = document.getElementsByClassName('additional_expenses-value'),
        show_incomePeriod = document.getElementsByClassName('income_period-value'),
        show_targetMonth = document.getElementsByClassName('target_month-value'),
        input_salaryAmount = document.querySelector('.salary-amount'),
        input_IncomeTitle = document.querySelectorAll('input.income-title'),
        input_IncomeAmount = document.querySelectorAll('input.income-amount'),
        input_ExpensesTitle = document.querySelectorAll('input.expenses-title'),
        input_ExpensesAmount = document.querySelectorAll('input.expenses-amount'),
        input_AdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
        input_targetAmount = document.querySelector('.target-amount'),
        input_periodRange = document.querySelector('.period-select'),
        input_periodRangeCounter = document.querySelector('.period-amount');


// console.log(calculate);
// console.log(addIncome);
// console.log(addExpenses);
// console.log(checkbox);
// console.log(show_budgetMonth[0]);
// console.log(show_budgetDay[0]);
// console.log(show_expensesMonth[0]);
// console.log(show_additionalIncome[0]);
// console.log(show_additionalExpenses[0]);
// console.log(show_incomePeriod[0]);
// console.log(show_targetMonth[0]);
// console.log(input_salaryAmount);
// console.log(input_IncomeTitle);
// console.log(input_IncomeAmount);
// console.log(input_AdditionalIncomeItem);
// console.log(input_ExpensesTitle);
// console.log(input_ExpensesAmount);
// console.log(input_AdditionalExpensesItem);
// console.log(input_targetAmount);
// console.log(input_periodRange);
// console.log(input_periodRangeCounter);