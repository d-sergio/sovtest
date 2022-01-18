/**Обработчик событий мыши для Slider
 * 
 * Принимаемые параметры:
 * @param {object} должен содержать следующие поля:
 *      @param {node} carousel - лента слайдов
 *      @param {node} viewport - родительский блок ленты слайдов
 *      @param {function} callback - необязательная функция, которой будет передано значение
 *      начальной скорости движения ленты слайдов
 *      @param {event} event - событие мыши
*/
export default function sliderMouseHandler({carousel, viewport, callback, event}) {

    //Внутренние параметры
    let startMoveX = event.pageX;
    let currentMoveX = startMoveX;
    let startTime = Date.now();
    let shift = 0;  //К предыдущему слайду: shift > 0; К следующему слайду shift < 0
    let speed = 0;
    
    event.preventDefault();
    window.addEventListener('mouseup', sliderMouseUpHandler);
    window.addEventListener('mousemove', sliderMouseMoveHandler);

    //Двигаем ленту слайдов
    function sliderMouseMoveHandler(event){
        try{
            carousel.style.cursor = 'grabbing';

            currentMoveX = event.pageX;
            shift = currentMoveX - startMoveX;

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
            console.log('Slider Ошибка sliderMouseMoveHandler(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    //Вычисляем новую позицию
    function sliderMouseUpHandler() {
        window.removeEventListener('mouseup', sliderMouseUpHandler);
        window.removeEventListener('mousemove', sliderMouseMoveHandler);
        
        carousel.style.cursor = 'pointer';

        if (callback !== undefined && callback !== null) {
            callback(speed);
        }
    }
}