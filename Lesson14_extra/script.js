'use strict';

let counterHorizontal = 0;
let counterVertical = 0;

const DomElement = function (selector, height, width, bg, fontSize, text) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
};

DomElement.prototype.createElement = function () {
    if (this.selector[0] === '.') {
        let div = document.createElement('div');

        div.classList.add(this.selector.slice(1));
        div.style.height = this.height + 'px';
        div.style.width = this.width + 'px';
        div.style.backgroundColor = this.bg;
        div.style.fontSize = this.fontSize + 'px';
        div.textContent = this.text;

        document.body.append(div);
    } else if (this.selector[0] === '#') {
        let p = document.createElement('p');

        p.setAttribute("id", this.selector.slice(1));
        p.style.height = this.height + 'px';
        p.style.width = this.width + 'px';
        p.style.backgroundColor = this.bg;
        p.style.fontSize = this.fontSize + 'px';
        p.textContent = this.text;

        document.body.append(p);
    }
};

DomElement.prototype.getContext = function (callback, inputElement) {
    let thisObj = this;
    return (function () {
        callback.apply(thisObj, inputElement);
    });
};




//use id selector - #divElement or class selector - .divElement

const DOMElement = new DomElement('#divElement', 100, 100, 'cyan', 20, 'Hello World');


let applied1 = DOMElement.getContext(DOMElement.createElement);

document.addEventListener('DOMContentLoaded', applied1);



document.addEventListener('keydown', (e) => {
    let p = document.getElementById('divElement');
    let div = document.querySelector('div');


    if (e.keyCode === 38) {
        // up arrow
        p.style.top = counterVertical + 'px';
        if (counterVertical < 0) {
            counterVertical = 0;
        }
        counterVertical -= 10;
    } else if (e.keyCode === 40) {
        // down arrow
        p.style.top = counterVertical + 'px';
        if (counterVertical > 850) {
            counterVertical = 850;
        }
        counterVertical += 10;
    } else if (e.keyCode === 37) {
        // left arrow
        p.style.left = counterHorizontal + 'px';
        if (counterHorizontal < 10) {
            counterHorizontal = 10;
        }
        counterHorizontal -= 10;
    } else if (e.keyCode === 39) {
        // right arrow
        p.style.left = counterHorizontal + 'px';
        if (counterHorizontal > 1820) {
            counterHorizontal = 1820;
        }
        counterHorizontal += 10;
    }
});