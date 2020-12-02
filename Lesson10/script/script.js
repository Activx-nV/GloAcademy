'use strict';

const list = document.querySelectorAll('ul'),
    books = document.querySelectorAll('.book'),
    advertisment = document.querySelector('.adv');

advertisment.remove();

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

books[4].firstElementChild.innerHTML = "<a href=\"https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes\" target=\"_blank\">Книга 3. this и Прототипы Объектов</a>";

const secondBook1 = list[0].children[0].cloneNode(true);
const secondBook2 = list[0].children[1].cloneNode(true);
const secondBook3 = list[0].children[2].cloneNode(true);
const secondBook4 = list[0].children[3].cloneNode(true);
const secondBook5 = list[0].children[4].cloneNode(true);
const secondBook6 = list[0].children[5].cloneNode(true);
const secondBook7 = list[0].children[6].cloneNode(true);
const secondBook8 = list[0].children[7].cloneNode(true);
const secondBook9 = list[0].children[8].cloneNode(true);
const secondBook10 = list[0].children[9].cloneNode(true);
const secondBook11 = list[0].children[10].cloneNode(true);

const fifthBook1 = list[5].children[0].cloneNode(true);
const fifthBook2 = list[5].children[1].cloneNode(true);
const fifthBook3 = list[5].children[2].cloneNode(true);
const fifthBook4 = list[5].children[3].cloneNode(true);
const fifthBook5 = list[5].children[4].cloneNode(true);
const fifthBook6 = list[5].children[5].cloneNode(true);
const fifthBook7 = list[5].children[6].cloneNode(true);
const fifthBook8 = list[5].children[7].cloneNode(true);
const fifthBook9 = list[5].children[8].cloneNode(true);
const fifthBook10 = list[5].children[9].cloneNode(true);
const fifthBook11 = list[5].children[10].cloneNode(true);


list[0].children[2].outerHTML = secondBook4.outerHTML;
list[0].children[3].outerHTML = secondBook7.outerHTML;
list[0].children[4].outerHTML = secondBook9.outerHTML;
list[0].children[5].outerHTML = secondBook5.outerHTML;
list[0].children[6].outerHTML = secondBook6.outerHTML;
list[0].children[7].outerHTML = secondBook8.outerHTML;
list[0].children[8].outerHTML = secondBook10.outerHTML;
list[0].children[9].outerHTML = secondBook3.outerHTML;

list[5].children[2].outerHTML = fifthBook10.outerHTML;
list[5].children[5].outerHTML = fifthBook3.outerHTML;
list[5].children[8].outerHTML = fifthBook6.outerHTML;
list[5].children[9].outerHTML = fifthBook9.outerHTML;

list[2].children[list[2].children.length - 2].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');


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