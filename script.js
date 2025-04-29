"use strict";
class Pinterest {
    constructor() {
        this.imageContainer = document.getElementsByClassName('mainsection__content')[0];
        this.imageArray = [];
        this.loadImage();
        this.initiateEventListener();
        this.throttleLoad = throttle.call(this, this.loadImage, 1000);
    }
    initiateEventListener() {
        document.addEventListener('scroll', (event) => {
            const imageContainer = document.getElementsByClassName('mainsection__content')[0];
            if ((imageContainer.scrollHeight - window.scrollY) < 1200) {
                this.loadImage();
            }
        });
    }
    generateRandom() {
        let min = 300;
        let max = 700;
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }
    loadImage() {
        console.log('load');
        for (let i = 0; i < 40; i++) {
            const img = document.createElement("img");
            const imageHeight = this.generateRandom();
            const imageWidth = this.generateRandom();
            img.height = imageHeight;
            img.width = imageWidth;
            img.style.backgroundColor = 'grey';
            img.src = `https://picsum.photos/${imageHeight}/${imageWidth}`;
            img.alt = "image";
            img.loading = "lazy";
            img.height = imageHeight;
            img.width = imageWidth;
            img.classList.add('mainsection__content__image');
            img.onload = () => {
                img.style.backgroundColor = '';
            };
            this.imageContainer.appendChild(img);
        }
    }
    loadNextImages() {
        const observer = new IntersectionObserver(entries => {
            const lastimg = entries[0];
            if (!lastimg.isIntersecting) {
                return;
            }
            this.loadImage();
            observer.unobserve(lastimg.target);
            observer.observe(document.querySelector('.mainsection__content__image:last-child'));
        }, {
            rootMargin: "50px"
        });
        observer.observe(document.querySelector('.mainsection__content__image:last-child'));
    }
}
function throttle(func, duration) {
    let flag = true;
    return function (...args) {
        if (flag) {
            func.apply(this, ...args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, duration);
        }
    };
}
document.addEventListener('DOMContentLoaded', (event) => {
    new Pinterest();
});
