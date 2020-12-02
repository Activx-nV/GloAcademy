'use strict';

const list = document.querySelectorAll('ul'),
    books = document.querySelectorAll('.book'),
    advertisment = document.querySelector('.adv');


advertisment.remove();

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

list[0].innerHTML = "<li>Предисловие</li>\n<li>Введение</li>\n<li>Глава 1: Что такое область видимости?</li>\n<li> Глава 2: Лексическая область видимости </li>\n<li> Глава 3: Область видимости: функции против блоков </li>\n<li>Глава 4: Поднятие переменных(Hoisting)</li>\n<li>Глава 5: Замыкание области видимости</li>\n<li>Приложение A: Динамическая область видимости</li>\n<li>Приложение B: Полифиллинг блочной области видимости</li>\n<li>Приложение C: Лексический this </li>\n<li>Приложение D: Благодарности!</li>\n";

list[1].innerHTML = "<li class=\"chapter\">Предисловие</li>\n<li class=\"chapter\">Введение</li>\n<li class=\"chapter\">Глава 1: Введение в программирование</li>\n<li class=\"chapter\">Глава 2: Введение в JavaScript</li>\n<li class=\"chapter\">Глава 3: Введение в \"Вы не знаете JavaScript\"</li>\n<li class=\"chapter\">Приложение A: Благодарности!</li>\n";

list[2].innerHTML = "<li>Предисловие</li>\n<li>Введение</li>\n<li>Глава 1: ES: современность и будущее</li>\n<li>Глава 2: Синтаксис</li>\n<li>Глава 3: Структура</li>\n            <li>Глава 4: Управление асинхронными операциями</li>\n<li>Глава 5: Коллекции</li>\n<li>Глава 6: Дополнения к API</li>\n<li>Глава 7: Метапрограммирование</li>\n<li>Глава 8: За пределами ES6</li>\n                       <li>Приложение A: Благодарности!</li>\n";

list[3].innerHTML = "<li>Предисловие</li>\n<li>Введение</li>\n<li>Глава 1: Типы</li>\n<li>Глава 2: Values</li>\n<li>Глава 3: Natives</li>\n<li>Глава 4: Coercion</li>\n            <li>Глава 5: Grammar</li>\n<li>Приложение A: Mixed Environment JavaScript</li>\n<li>Приложение B: Благодарности!</li>\n";

books[4].firstElementChild.innerHTML = "<a href=\"https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes\" target=\"_blank\">Книга 3. this и Пропопипы Объектов</a>";

list[4].innerHTML = "<li>Предисловие</li>\n<li>Введение</li>\n<li>Глава 1: <em>this</em> Or That?</li>\n<li>Глава 2: <em>this</em> теперь приобретает смысл!</li>\n            <li>Глава 3: Объекты</li>\n<li>Глава 4: Смешивая объекты \"классов\"</li>\n<li>Глава 5: Прототипы</li>\n<li>Глава 6: Делегирование поведения</li>\n<li>Приложение A: ES6 <em>классы</em></li>\n<li>Приложение B: Благодарности!</li>\n";

list[5].innerHTML = "<li>Предисловие</li>\n<li>Введение</li>\n<li>Глава 1: Асинхронность: Сейчас и Тогда</li>\n<li>Глава 2: Колбеки</li>\n<li>Глава 3: Обещания</li>\n<li>Глава 4: Генераторы</li>\n<li>Глава 5: Производительность программы</li>\n<li>Глава 6: Бенчмаркинг и настройка</li>\n<li>Приложение A: Библиотека: asynquence</li>\n<li>Приложение B: Расширенные асинхронные шаблоны</li>\n<li>Приложение C: Благодарности!</li>\n";


const book1 = books[1].cloneNode(true);
const book2 = books[0].cloneNode(true);
const book3 = books[4].cloneNode(true);
const book4 = books[3].cloneNode(true);
const book5 = books[5].cloneNode(true);
const book6 = books[2].cloneNode(true);



books[1].replaceWith(book2);
books[0].replaceWith(book1);
books[2].replaceWith(book3);
books[4].replaceWith(book5);
books[5].replaceWith(book6);