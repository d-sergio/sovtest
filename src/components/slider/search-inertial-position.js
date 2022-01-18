/**Рассчёт движения карусели по инерции при пролистывании мышью и свайпами
 * 
 * Принимаемые параметры:
 * @param {object} initialParams объект со следующими полями:
 *  @param {number} speed - начальная скорость карусели
 *  @param {number} friction - коэффициент трения для ленты слайдов. Чем больше
 *  значение, тем быстрее карусель остановится при быстром прокручивании мышью
 *  или свайпами (5 по умолчанию)
 *  @param {number} treshold - значение от 0 до 1, указывающее, что слайд
 *  показавшийся больше, чем на treshold будет автоматически вытянут до конца
 *  (0.2 по умолчанию)
 *  @param {number} duration - длительность анимации для управления стрелками
 *  и клавиатурой в мс (500 по умолчанию)
 *  @param {node} carousel - лента слайдов
 *  @param {node} viewport- окно просмотра слайдов
 *  @param {number} currentPosition - текущая позиция слайдера
 * 
 * Механика пошагово:
 * 1. Находим время анимации (движение до полной остановки из-за силы трения).
 * На маленькой скорости значение duration тоже будет очень маленьким. Обычно это
 * должно привести к незначительному сдвигу слайдов, но тут может сработать
 * treshold. Это проявится как очень быстрый переход к другому слайду, так как
 * время анимации останется прежним, а значение сдвига резко увеличится.
 * Для таких случаев duration берётся из props. В остальных случаях рассчитывается.
 * 2. Находим предполагаемый сдвиг карусели
 * 3. Находим целевую точку движения карусели (marginLeft)
 * 4. Корректируем целевую точку, если при прокрутке карусель выйдет за допустимые
 * пределы
 * 5. Если targetMarginLeft был скорректирован, то и время анимации надо
 * пропорционально скорректировать
 * 6. Вычисляем новую позицию
 */
import {fullDecelerationTime, distanceToFullBraking} from "../others/physics";

export default function searchInertialPosition(initialParams) {
    try{
        //значения по умолчанию
        const defaults = {
            speed: 0,
            friction: 5,
            treshold: 0.2,
            duration: 500,
            carousel: null,
            viewport: null,
            currentPosition: 0
        };

        const params = Object.assign({}, defaults, initialParams);
    
    
        if (params.carousel !== null){

            const conditions = {
                speed: params.speed,
                friction: params.friction,
                g: 0.001
            }

            //1.
            const animDuration = (Math.abs(params.speed) < 1)
                                ? params.duration
                                : fullDecelerationTime(conditions);
            
            //2.
            const directionSign = (params.speed < 0) ? -1 : 1;
            const shift = directionSign * distanceToFullBraking(conditions);

            //3.
            const currentMarginLeft = parseFloat(window.getComputedStyle(params.carousel).marginLeft);
            const targetMarginLeft = currentMarginLeft + shift;

            //4.
            const correctTargetMarginLeft = calcCorrectTargetMargin();

            //5.
            const correctAnimDuration = (correctTargetMarginLeft != targetMarginLeft)
                                        ? calcCorrectAnimDuration()
                                        : animDuration;

            //6.
            const newPosition = calcNewPosition();

            return {newPosition: newPosition, animDuration: correctAnimDuration};

            //4.
            function calcCorrectTargetMargin() {
                try{
                    if (params.carousel !== null && params.viewport !== null){
            
                        const carouselWidth = params.carousel.offsetWidth;
                        const viewportWidth = params.viewport.offsetWidth;
                
                        const maxCarouselPosition = -carouselWidth + viewportWidth;
                        
                        if (targetMarginLeft > 0) {
                            return 0;
                        } else if (targetMarginLeft < maxCarouselPosition) {
                            return maxCarouselPosition;
                        }
            
                        return targetMarginLeft;
                    } else {
                        console.log(`Slider. correctTargetMargin() остановлен. refs: params.viewport is ${params.viewport}, params.carousel is ${params.carousel}`);
                    }
                } catch(e) {
                    console.log('Slider Ошибка correctTargetMargin(): ' + e.name + ":" + e.message + "\n" + e.stack);
                }
            }

            //5.
            function calcCorrectAnimDuration() {
                    const correction = targetMarginLeft - correctTargetMarginLeft;

                    const correctDuration = animDuration - Math.abs(animDuration * correction / shift);
                    
                    //При возврате нового значения, учитываем, что оно не может быть отрицательным
                    return correctDuration > 0
                        ? correctDuration
                        : 1;
            }
            
            /**6. Рассчитаем новую позицию.
             * При движении вперёд (shift < 0): если следующий слайд показался больше, чем на treshold,
             * то вытягиваем его до конца. При этом fraction означает какая часть следующего слайда уже показалась
             * 
             * При движении назад (shift > 0): если предыдущий слайд показался больше, чем на treshold,
             * то вытягиваем его до конца. При этом (1 - fraction) означает какая часть предыдущего слайда уже
             * показалась
             * 
             * Внезапная остановка движения слайда (shift == 0): работает аналогично, но направление
             * движения ленты слайдов перед остановкой определяется сравнением новой calculatedPosition и
             * currentPosition, к которой лента двигалась
             * 
             * calculatedPosition > currentPosition движение к предыдущим слайдам
             * calculatedPosition < currentPosition движение к следующим слайдам
             */
            function calcNewPosition() {
                if (params.carousel !== null) {
                    const slideWidth = params.carousel.children[0].offsetWidth;
                    const calculatedPosition = Math.abs(correctTargetMarginLeft) / slideWidth;
                    const integer = Math.trunc(calculatedPosition); //округляем до целого вычисленную позицию
                    const fraction = calculatedPosition - integer; //дробная часть позиции(см. описание выше)
                    const treshold = params.treshold;
                    const currentPosition = params.currentPosition;
                        
                    if (shift < 0 && fraction > treshold) {
                        return integer + 1;
                    } else if (shift < 0 && fraction < treshold){
                        return integer;
                    } else if (shift > 0 && (1 - fraction) > treshold) {
                        return integer;
                    } else if (shift > 0 && (1 - fraction) < treshold) {
                        return integer + 1;
                    } else if (shift == 0 && calculatedPosition > currentPosition && (1 - fraction) > treshold) {
                        return integer;
                    } else if (shift == 0 && calculatedPosition > currentPosition && (1 - fraction) < treshold) {
                        return integer + 1;
                    }
                    else if (shift == 0 && calculatedPosition < currentPosition && fraction > treshold) {
                        return integer + 1;
                    } else if (shift == 0 && calculatedPosition < currentPosition && fraction < treshold) {
                        return integer;
                    } else {
                        return integer;  //например просто клик по неподвижному слайдеру
                    }
                } else {
                    console.log(`Slider. calcNewPosition() остановлен. refs: params.carousel is ${params.carousel}`);
                }
            }

        } else {
            console.log(`Slider. searchInertialPosition() остановлен. refs: params.carousel is ${params.carousel}`);
        }
    } catch(e) {
        console.log('Slider Ошибка searchInertialPosition(): ' + e.name + ":" + e.message + "\n" + e.stack);
    }
}