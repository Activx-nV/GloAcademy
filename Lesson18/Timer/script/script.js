window.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(countTimer, 1000, '15 december 2020');

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
            timerHours.textContent = timerHours.textContent.padStart(2, 0);
            timerMinutes.textContent = timerMinutes.textContent.padStart(2, 0);
            timerSeconds.textContent = timerSeconds.textContent.padStart(2, 0);

            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(interval);
            }
        }
        updateClock();
    }
});
