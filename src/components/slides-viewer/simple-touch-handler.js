/**Простой обработчик touch-событий для SlidesViewer
 * 
 * Принимаемые параметры:
 * @param {number} currentPosition - текущая позиция слайдера
 * @param {function} setNewPosition - метод, изменяющий состояние
 * currentPosition в слайдере
 * @param {number} step - сколько слайдов пролистывается за один свайп
 * @param {event} event - событие touch
*/
export function simpleTouchHandler(currentPosition, setNewPosition, step, event) {
    const startX = event.touches[0].clientX;

    window.addEventListener('touchend', simpleEndHandler);

    function simpleEndHandler(event) {
        window.removeEventListener('touchend', simpleEndHandler);
    
        const endX = event.changedTouches[0].clientX;
    
        if (endX > startX) {
            setNewPosition(currentPosition - step);
        } else if (endX < startX) {
            setNewPosition(currentPosition + step);
        } else {
            return;
        }
    }
}