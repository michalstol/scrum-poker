import { throttle } from 'throttle-debounce';
import SimpleEventer from 'simple-eventer';

import CardFigures from './card-figures';

const $body = document.body;
const maxRotation = 20;
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};
const classes = {
    changeFigure: 'change-figure',
    isVoted: 'show-results'
};

export default class CardHandler extends SimpleEventer {
    constructor($context = document.getElementById('card')) {
        super();
        
        this.initDOM($context);
        this.initData();
        this.initFigures();
        this.initObserver();
        this.initEvents();
        this.initOrientation();
    }

    initDOM($context) {
        this.dom = {
            $context,
            $cardFrame: $context.querySelector('.card__frame'),
            $cardFigures: $context.querySelector('.card-figures'),
            $cardNumber: $context.querySelector('.card__number'),
            $cardPoints: $context.querySelectorAll('.card__number-point'),
            $cardSmallText: $context.querySelectorAll('.card__svg-text'),
            $cardBtn: $context.querySelector('.card-btn')
        };
    }

    initData() {
        this.data = {
            observerTimeout: false,
            eventTimeout: false,
            eventPrevent: false
        };
    }

    initObserver() {
        const options = {...observerOptions, root: this.dom.$cardNumber};

        this.observer = new IntersectionObserver(this.observerCallback.bind(this), options);
        this.dom.$cardPoints.forEach(el => this.observer.observe(el));
    }

    observerCallback(entries, observer) {
        const { observerTimeout } = this.data;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!!observerTimeout) {
                    clearTimeout(this.data.observerTimeout);
                }

                this.data.observerTimeout = setTimeout(() => {
                    const text = entry.target.textContent.trim();
                    const value = parseInt(text);
                    
                    this.points = text;
                    this.figuresHandler.create(isNaN(value) || value === 0 ? 1 : value);
                    
                    for (let $smallText of this.dom.$cardSmallText) {
                        $smallText.textContent = text;
                    }

                    if (!this.data.eventPrevent) {
                        this.clearEventTimeout(this.data.eventTimeout);
                        this.dom.$context.classList.remove(classes.changeFigure);
                    }
                }, 500);
            }
        });
    }

    initFigures() {
        this.figuresHandler = new CardFigures(this.dom.$cardFigures);
    }

    initEvents() {
        const { $cardNumber, $context, $cardBtn } = this.dom;
        const { changeFigure, isVoted } = classes;

        $cardNumber.addEventListener('scroll', throttle(300, e => {
            this.clearEventTimeout(this.data.eventTimeout);
        }));
        $cardNumber.addEventListener('touchstart', () => {
            this.data.eventPrevent = true;
            this.dom.$context.classList.add(changeFigure);
        });
        $cardNumber.addEventListener('touchend', () => {
            this.clearEventTimeout();

            this.data.eventPrevent = false;
            this.data.eventTimeout = setTimeout(() => $context.classList.remove(changeFigure), 1000);
        });

        $cardBtn.addEventListener('click', () => {
            $body.classList.add(isVoted);
            this.savePoints();
        });
    }

    clearEventTimeout(timeout) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = false;
        }
    }

    initOrientation() {
        window.addEventListener('deviceorientation', e => {
            const { $context } = this.dom;
            const x = this.parseData(Math.round(e.beta)) / 90 * 45;
            const y = Math.round(e.gamma) / 90 * 45;

            $context.style.setProperty('--x-deg', x);
            $context.style.setProperty('--y-deg', y);

            // console.log({x, y});
            // console.log(Math.round(e.gamma), Math.round(e.beta));
        }, true);
    }

    parseData(x) {
        if (x > 90) {
            x = 90 * 2 - x;
        } else if (x < -90) {
            x = -90 * 2 - x;
        }

        return x;
    }
    
    savePoints() {
        this.fire('save-points', this.points);
    }
    
    reset() {
        const { isVoted, changeFigure } = classes;
        
        if ($body.getAttribute('class').indexOf(isVoted) !== -1) {
            $body.classList.remove(isVoted);
            
            this.dom.$context.classList.add(changeFigure);
            this.dom.$cardNumber.scrollTop = 0;
            
            setTimeout(() => this.dom.$context.classList.remove(changeFigure), 1500);
        }
    }
}