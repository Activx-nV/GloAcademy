window.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(countTimer, 1000, '16 december 2020');

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours');
        const timerMinutes = document.querySelector('#timer-minutes');
        const timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60);
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor(timeRemaining / 60 / 60);
            //let day = Math.floor(timeRemaining / 60 / 60 / 24);
            return {
                hours,
                minutes,
                seconds,
                timeRemaining
            };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            timerHours.textContent = String(timer.hours).padStart(2, '0');
            timerMinutes.textContent = String(timer.minutes).padStart(2, '0');
            timerSeconds.textContent = String(timer.seconds).padStart(2, '0');

            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(interval);
            }
        }
        updateClock();
    }

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        let count = 0;

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                menu.style.transform = `translate(0)`;
                let flyInterval;
                const flyAnimate = function() {
                    flyInterval = requestAnimationFrame(flyAnimate);
                    count += 20;
                    if (count < 1000 && document.documentElement.clientWidth >= 1900) {
                        menu.style.left = count + 'px';
                    } else if (count < 900 && document.documentElement.clientWidth < 1900 &&
                        document.documentElement.clientWidth > 1200) {
                        menu.style.left = count + 'px';
                    } else if (count < 550 && document.documentElement.clientWidth < 1920 &&
                        document.documentElement.clientWidth > 1000) {
                        menu.style.left = count + 'px';
                    } else if (document.documentElement.clientWidth > 768) {
                        cancelAnimationFrame(flyInterval);
                    }
                };
                flyInterval = requestAnimationFrame(flyAnimate);
            } else {
                count = 0;
                menu.style.transform = `translate(-100%)`;
                menu.style.left = "";
            }
            //menu.classList.toggle('active-menu');

        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });
    };
    togglePopUp();
});
