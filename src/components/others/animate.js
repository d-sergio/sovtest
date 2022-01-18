/** Функция анимации
 * 
 * Принимаемые параметры:
 * @param {function} timing - функция расчёта времени
 * @param {number} duration - длительность анимации
 * @param {function} draw - функция отрисовки
 * @param {node} element - анимируемый элемент
 * @param {string} property - изменяемое анимацией свойство стиля
 * @param {number} startValue - начальное значение, изменяемого свойства стиля
 * @param {number} finalValue - конечно значение, изменяемого свойства стиля
 * @param {string} units - единицы измерения
 */

export function animate(timing, duration, draw, element, property, startValue, finalValue, units = ''){
    let start = performance.now();
    let actualValue = startValue;

    requestAnimationFrame(function animate(time){
        let timeFraction = (time - start) / duration;

        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        actualValue = startValue + Math.abs(finalValue - startValue) * progress;

        draw(element, property, actualValue, units);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

/**Объект для анимации
 * 
 * Принимаемые параметры:
 * @param {object} animationProps - объект, содержащий следующие значения (в скобках - по умолчанию):
 * 
 *      @param {function} timing - функция расчёта времени (linear)
 *      @param {number} duration - длительность анимации (500)
 *      @param {function} draw - функция отрисовки (changeStyleProperty)
 *      @param {node} element - анимируемый элемент (document.body)
 *      @param {string} property - изменяемое анимацией свойство стиля ('opacity')
 *      @param {number} startValue - начальное значение, изменяемого свойства стиля (0)
 *      @param {number} finalValue - конечно значение, изменяемого свойства стиля (1)
 *      @param {string} units - единицы измерения (без единиц измерения)
 *      @param {function} callback - необязательный коллбэк, который выполнится
 *      как только завершится анимация
 * 
 * 
 * Как работает:
 * 1.   Создать объект анимации с параметрами по умолчанию:
 *      let obj = new CreateAnimation(animationProps);
 * 
 *      Без animationProps будет создана анимация по умолчанию, которую можно изменить в сеттере.
 * 
 * 2.   Изменить параметры анимации можно через сеттер:
 *      obj.set(animationProps);
 * 
 * 3.   Запустить анимацию:
 *      obj.start();
 * 
 * 4.   Отмена анимации:
 *      obj.cancel();
 * 
*/
export class Animation{
    constructor(animationProps) { 
        //Принимаемые параметры по умолчанию
        const defaults = {
            timing: linear,
            duration: 500,
            draw: changeStyleProperty,
            element: document.body,
            property: 'opacity',
            startValue: 0,
            finalValue: 1,
            units: '',
            callback: undefined
        }

        Object.assign(this, defaults, animationProps);

        if (this.duration < 0) {
            console.log(`Animation: время анимации duration не может быть отрицательным, поэтому ему будет присвоено значение 1.`);
            this.duration = 1;
        }

        //Внутренние параметры для анимации
        this.requestId = undefined;
        this.timeFraction = 0;
        this.progress = 0;
        this.actualValue = this.startValue;
        this.startTime = 0;

        //Методы
        this.set = this.set.bind(this);
        this.loop = this.loop.bind(this);
        this.continueLoop = this.continueLoop.bind(this);
        this.start = this.start.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    set(animationProps) {
        Object.assign(this, animationProps);
    }

    loop() {
        this.requestId = undefined;

        let curentTime = performance.now();

        this.timeFraction = (curentTime - this.startTime) / this.duration;

        if (this.timeFraction > 1) this.timeFraction = 1;

        this.progress = this.timing(this.timeFraction);

        this.actualValue = this.startValue + Math.abs(this.finalValue - this.startValue) * this.progress;

        this.draw(this.element, this.property, this.actualValue, this.units);

        if (this.timeFraction < 1) {
            this.continueLoop();
        
        } else if (this.callback !== undefined && this.callback !== null) {
            this.callback();    //коллбэк после завершения анимации
        }
    }

    continueLoop(){
        if (!this.requestId){
            this.requestId = requestAnimationFrame(this.loop);
        }
    }

    start() {
        this.startTime = performance.now();
        this.continueLoop();
    }

    cancel(){
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
            this.timeFraction = 0;
            this.progress = 0;
            this.actualValue = this.startValue;
        }
    }
}

/**Функции расчёта времени*/
export function linear(timeFraction) {
    return timeFraction;
}

export function invertedLinear(timeFraction) {
    return -timeFraction;
}

export function sliderDraw(timeFraction) {
    return 1 - Math.pow(1 - timeFraction, 4);
}

export function invertedSliderDraw(timeFraction) {
    return -(1 - Math.pow(1 - timeFraction, 4));
}

export function spoilerDraw(timeFraction) {
    return 1 - Math.pow(1 - timeFraction, 1.5);
}

export function invertedSpoilerDraw(timeFraction) {
    return -(1 - Math.pow(1 - timeFraction, 1.5));
}

/** Функция отрисовки, изменяющая значения свойства стиля элемента
 * 
 * @param {node} element - элемент, прозрачность которого меняем
 * @param {string} property - изменяемое анимацией свойство стиля
 * @param {number} actualValue - рассчитанное значение, полученое из animate()
 */
export function changeStyleProperty(element, property, actualValue, units) {
    element.style[property] = actualValue + units;
}

/** Функция отрисовки, изменяющая значения свойства стиля элемента по модулю
 * 
 * @param {node} element - элемент, прозрачность которого меняем
 * @param {string} property - изменяемое анимацией свойство стиля
 * @param {number} actualValue - рассчитанное значение, полученое из animate()
 * 
 * Например, в animate можно передать
 * property = 'opacity', startValue = -1, finalValue = 1.
 * 
 * Тогда анимируемый элемент сначала исчезнет (opacity от 1 до 0),
 * а затем снова появится (opacity от 0 до 1)
 */
export function changeStylePropertyAbs(element, property, actualValue, units) {
    element.style[property] = Math.abs(actualValue) + units;
}

/** Задержка, чтобы анимация исчезновения предыдущего слайда завершилась полностью,
 * прежде чем состояние компонента slides-viewer.js изменится и начнётся
 * следующая анимация
 */
export function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}