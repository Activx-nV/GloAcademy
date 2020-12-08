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

        document.body.prepend(div);
    } else if (this.selector[0] === '#') {
        let p = document.createElement('p');

        p.setAttribute("id", this.selector.slice(1));
        p.style.height = this.height + 'px';
        p.style.width = this.width + 'px';
        p.style.backgroundColor = this.bg;
        p.style.fontSize = this.fontSize + 'px';
        p.textContent = this.text;

        document.body.prepend(p);
    }
};

DomElement.prototype.moveBlock = function (element) {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 38) {
            document.body.firstChild.style.top = counterVertical + 'px';
            if (counterVertical < 0) {
                counterVertical = 0;
            }
            counterVertical -= 10;
        } else if (e.keyCode === 40) {
            document.body.firstChild.style.top = counterVertical + 'px';
            if (counterVertical > 850) {
                counterVertical = 850;
            }
            counterVertical += 10;
        } else if (e.keyCode === 37) {
            document.body.firstChild.style.left = counterHorizontal + 'px';
            if (counterHorizontal < 10) {
                counterHorizontal = 10;
            }
            counterHorizontal -= 10;
        } else if (e.keyCode === 39) {
            document.body.firstChild.style.left = counterHorizontal + 'px';
            if (counterHorizontal > 1820) {
                counterHorizontal = 1820;
            }
            counterHorizontal += 10;
        }
    });
};

const DOMElement = new DomElement('#divElement', 100, 100, 'cyan', 20, 'Hello World');

document.addEventListener('DOMContentLoaded', DOMElement.createElement.apply(DOMElement));
DOMElement.moveBlock();
