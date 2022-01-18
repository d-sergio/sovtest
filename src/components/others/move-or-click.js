/**Требуется при пролистывании слайдеров свайпами или мышью, чтобы событие
 * click не вызвало ненужный переход по ссылкам внутри слайдера.
 * 
 * Использование:
 * Назначить элементам соответствующие обработчики событий onPointerDown,
 * onPointerMove, onClick
*/

let isMoved = false;
let isPointerDown = false;

export function onPointerDown() {
    isPointerDown = true;
}

export function onPointerMove() {
    if (isPointerDown) {
        isMoved = true;
    }
}

export function onClick(e) {
    if (isMoved) {
        e.preventDefault();
    }

    isPointerDown = false;
    isMoved = false;
}