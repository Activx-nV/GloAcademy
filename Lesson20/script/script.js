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
            menu = document.querySelector('menu');
        // closeBtn = document.querySelector('.close-btn'),
        // menuItems = menu.querySelectorAll('ul>li');
        let count = 0;

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                menu.style.transform = `translate(0)`;
                let flyInterval;
                const flyAnimate = function() {
                    flyInterval = requestAnimationFrame(flyAnimate);
                    count += 20;
                    if (count < 1000 && document.documentElement.clientWidth > 1900) {
                        menu.style.left = count + 'px';
                    } else if (count < 700 && document.documentElement.clientWidth < 1900 &&
                        document.documentElement.clientWidth > 1200) {
                        menu.style.left = count + 'px';
                    } else if (count < 550 && document.documentElement.clientWidth < 1920 &&
                        document.documentElement.clientWidth > 1000) {
                        menu.style.left = count + 'px';
                    } else if (count < 850 && document.documentElement.clientWidth < 1920 &&
                        document.documentElement.clientWidth >= 1600) {
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
        // closeBtn.addEventListener('click', handlerMenu);
        // menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
        menu.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('ul')) {
                handlerMenu();
            }
        });
    };

    toggleMenu();

    const togglePopUp = () => {
        let opacityIn = 0;
        let opacityOut = 1;
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        //popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth >= 768) {
                    opacityIn = 0;
                    popUp.style.display = 'block';
                    let opacityInterval;
                    const opacityAnimate = function() {
                        opacityInterval = requestAnimationFrame(opacityAnimate);
                        opacityIn += 0.01;
                        if (opacityIn < 1.01) {
                            popUp.style.opacity = opacityIn;
                        } else if (opacityIn >= 1) {
                            cancelAnimationFrame(opacityInterval);
                        }
                    };
                    opacityInterval = requestAnimationFrame(opacityAnimate);
                } else {
                    popUp.style.display = 'block';
                }
            });
            popUp.addEventListener('click', event => {
                let target = event.target;

                if (target.classList.contains('popup-close')) {
                    if (document.documentElement.clientWidth >= 768) {
                        let opacityInterval;
                        opacityOut = 1;
                        const opacityAnimate = function() {
                            opacityInterval = requestAnimationFrame(opacityAnimate);
                            opacityOut -= 0.01;
                            if (opacityOut > 0.01) {
                                popUp.style.opacity = opacityOut;
                            } else {
                                popUp.style.display = 'none';
                                cancelAnimationFrame(opacityInterval);
                            }
                        };
                        opacityInterval = requestAnimationFrame(opacityAnimate);
                    } else {
                        popUp.style.display = 'none';
                    }
                    //popUp.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');
                    if (!target) {
                        if (document.documentElement.clientWidth >= 768) {
                            let opacityInterval;
                            opacityOut = 1;
                            const opacityAnimate = function() {
                                opacityInterval = requestAnimationFrame(opacityAnimate);
                                opacityOut -= 0.01;
                                if (opacityOut > 0.01) {
                                    popUp.style.opacity = opacityOut;
                                } else {
                                    popUp.style.display = 'none';
                                    cancelAnimationFrame(opacityInterval);
                                }
                            };
                            opacityInterval = requestAnimationFrame(opacityAnimate);
                        } else {
                            popUp.style.display = 'none';
                        }

                        //popUp.style.display = 'none';
                    }
                }

            });
        });

        // popUpClose.addEventListener('click', () => {
        //     let opacityInterval;
        //     opacityOut = 1;
        //     const opacityAnimate = function () {
        //         opacityInterval = requestAnimationFrame(opacityAnimate);
        //         opacityOut -= 0.01;
        //         if (opacityOut > 0.01) {
        //             popUp.style.opacity = opacityOut;
        //         } else {
        //             popUp.style.display = 'none';
        //             cancelAnimationFrame(opacityInterval);
        //         }
        //     };
        //     opacityInterval = requestAnimationFrame(opacityAnimate);
        // });
    };
    togglePopUp();
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        tabContent.forEach((item, index) => {
            if (index !== 0) {
                item.classList.add('d-none');
            }
        });

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                // eslint-disable-next-line no-loop-func
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();


    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotParent = document.querySelector('.portfolio-dots');


        let currentSlide = 0,
            interval;

        const createDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');
                dotParent.append(li);
            }
        };
        createDots();
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();
});
