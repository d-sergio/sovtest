/**Создать и вернуть объект анимации
 * 
 * Функция "ловит" текущий currentMarginLeft ленты слайдов и создаёт объект
 * анимации для прокрутки до currentPosition(новой позиции). Для этого
 * вычисляется targetMarginLeft.
 * 
 * Props:
 *  @param {object} - объект со следующими полями:
 *      @param {number} currentPosition - текущая позиция, до которой происходит прокрутка
 *      @param {node} carousel - лента слайдов
 *      @param {function} callback - необязательный коллбэк выполнится после анимации
 *      @param {number} animDuration - длительность анимации
 */

import {Animation, sliderDraw, invertedSliderDraw, changeStyleProperty} from "../others/animate";

export default function createAnimationObject({animDuration, carousel, callback, currentPosition}) {
    try{
        if (carousel !== null){
            const slideWidth = carousel.children[0].offsetWidth;

            const currentMarginLeft = parseFloat(window.getComputedStyle(carousel).marginLeft);
            const targetMarginLeft = -currentPosition * slideWidth;

            const timing = (targetMarginLeft < currentMarginLeft)
                            ? invertedSliderDraw //если листаем к следующему слайду
                            : sliderDraw; //если листаем к предыдущему слайду

            const animationProps = {
                timing: timing,
                duration: animDuration,
                draw: changeStyleProperty,
                element: carousel,
                property: 'marginLeft',
                startValue: currentMarginLeft,
                finalValue: targetMarginLeft,
                units: 'px',
                callback: callback
            }

            return new Animation(animationProps);
        } else {
            console.log(`Slider. animate-move() остановлен. refs: this.carousel.current is ${this.carousel.current}`);
        }
    } catch(e) {
        console.log('Slider Ошибка animate-move(): ' + e.name + ":" + e.message + "\n" + e.stack);
    }
}