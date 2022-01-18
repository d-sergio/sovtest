/**Обработчик touch-событий для Slider
 * 
 * Принимаемые параметры:
 * @param {object} должен содержать следующие поля:
 *      @param {node} carousel - лента слайдов
 *      @param {node} viewport - родительский блока ленты слайдов
 *      @param {function} callback - необязательная функция, которой будет передано значение
 *      начальной скорости движения ленты слайдов
 *      @param {number} disableScrollingOn - если пользователь сдвинул карусель больше, чем
 *      на указанное количество пикселей, то вертикальная прокрутка страницы блокируется
 *      @param {event} event - событие touch
*/
export default function sliderTouchHandler({carousel, viewport, callback, disableScrollingOn, event}) {

    //Внутренние параметры
    let startMoveX = event.touches[0].pageX;
    let currentMoveX = startMoveX;
    let startTime = Date.now();
    let shift = 0;  //К предыдущему слайду: shift > 0; К следующему слайду shift < 0
    let speed = 0;

    const overflow = window.getComputedStyle(document.body).overflow;
    
    //event.preventDefault();
    window.addEventListener('touchcancel', sliderTouchEndHandler);
    window.addEventListener('touchend', sliderTouchEndHandler);
    window.addEventListener('touchmove', sliderTouchMoveHandler);

    //Двигаем ленту слайдов
    function sliderTouchMoveHandler(event){
        try{
            currentMoveX = event.changedTouches[0].pageX;
            shift = currentMoveX - startMoveX;

            if (disableScrollingOn !== undefined
                && disableScrollingOn !== null
                && disableScrollingOn !== false
                && Math.abs(shift) > disableScrollingOn) {

                document.body.style.overflow = 'hidden';
                
            }

            const currentMarginLeft = parseFloat(window.getComputedStyle(carousel).marginLeft);
            const targetMarginLeft = currentMarginLeft + shift;

            const carouselWidth = carousel.offsetWidth;
            const maxCarouselPosition = -carouselWidth + viewport.offsetWidth;

            requestAnimationFrame(function move(){
                if (targetMarginLeft <= 0 && targetMarginLeft >= maxCarouselPosition) { //допустимые границы движения ленты слайдов
                    carousel.style.marginLeft = targetMarginLeft + 'px';
                }
            });

            let movementTime = Date.now() - startTime;

            if (movementTime < 1) movementTime = 1;

            speed = shift / movementTime;

            startMoveX = currentMoveX;  //Последняя точка текущего движения становится стартовой для нового движения
            startTime = Date.now(); //Время последней точки становится стратовым временем следующей точки

        } catch(e) {
            console.log('Slider Ошибка sliderTouchMoveHandler(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    //Завершаем работу. Передаём слайдеру скорость, которая была в последний момент
    function sliderTouchEndHandler() {
        document.body.style.overflow = overflow;

        window.removeEventListener('touchcancel', sliderTouchEndHandler);
        window.removeEventListener('touchend', sliderTouchEndHandler);
        window.removeEventListener('touchmove', sliderTouchMoveHandler);

        if (callback !== undefined && callback !== null) {
            callback(speed);
        }
    }
}