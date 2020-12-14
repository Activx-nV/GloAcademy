'use strict';

let today;
const week = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let dayOfTheWeek;
let hours;
const main = document.querySelector('.main');


function getDayOfTheWeek() {
    for (let i = 0; i < week.length; i++) {
        if (today.getDay() === i) {
            dayOfTheWeek = week[i];
        } else {
            continue;
        }
    }
}

function getFormattedTime() {
    let hours = new Date().getHours();
    hours = (hours + 24 - 2) % 24;
    let mid = 'AM';
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours %= 12;
        mid = 'PM';
    }
    return {
        hours,
        mid
    };
}

function daysCheck(days) {
    if (days === 1 || days === 21 || days === 31 || days === 41 || days === 51 || days === 61) {
        return 'день';
    } else if (days === 2 || days === 3 || days === 4) {
        return 'дня';
    } else {
        return 'дней';
    }
}


function updateDate() {
    today = new Date();
    const time = today.toLocaleTimeString();
    hours = today.getHours();
    let messageOfTheDay;
    const amPm = getFormattedTime();
    getDayOfTheWeek();
    getFormattedTime();
    const dateStop = new Date('01 january 2021').getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;
    const day = Math.floor(timeRemaining / 60 / 60 / 24);
    daysCheck(day);
    if (hours < 12 && hours > 6) {
        messageOfTheDay = 'Доброе утро';
    } else if (hours > 12 && hours < 18) {
        messageOfTheDay = 'Добрый день';
    } else if (hours > 18 && hours < 24) {
        messageOfTheDay = 'Добрый вечер';
    } else {
        messageOfTheDay = 'Доброй ночи';
    }

    if (day > 0) {
        main.innerHTML = `${messageOfTheDay}<br>Сегодня: ${dayOfTheWeek}<br>Текущее время: ${time} ${amPm.mid}
    <br>До нового года осталось: ${day} ${daysCheck(day)}`;
    } else {
        clearInterval(updateInterval);
        return;
    }


}

const updateInterval = setInterval(updateDate, 1000);
