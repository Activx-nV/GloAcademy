'use strict';

const list = document.querySelectorAll('ul'),
    books = document.querySelectorAll('.book'),
    advertisment = document.querySelector('.adv'),
    list2 = books[0].children[1].children,
    list5 = books[5].children[1].children;


advertisment.remove();

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

books[4].firstElementChild.innerHTML = "<a href=\"https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes\" target=\"_blank\">Книга 3. this и Прототипы Объектов</a>";

list2[1].after(list2[3]);
list2[2].after(list2[6]);
list2[3].after(list2[8]);
list2[4].after(list2[6]);
list2[9].after(list2[6]);

list[2].children[list[2].children.length - 2].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');

list5[1].after(list5[9]);
list5[2].after(list5[4]);
list5[3].after(list5[5]);
list5[8].after(list5[6]);


books[1].after(books[0]);
books[0].after(books[4]);
books[5].after(books[2]);
