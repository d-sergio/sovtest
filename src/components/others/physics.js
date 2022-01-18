/**Время до полной остановки под действием силы трения объекта, движущегося по инерции
 * 
 * Принимаемые параметры:
 * @param {object} conditions имеет следующие поля:
 *      @param {number} speed - начальная скорость объекта
 *      @param {number} friction - коэффициент трения
 *      @param {number} g - ускорение свободного падения
 */

export function fullDecelerationTime(conditions) {
    const speed = conditions.speed;
    const friction = conditions.friction;
    const g = conditions.g;

    return Math.abs(speed) / (friction * g);
}

/**Расстояние до полной остановки под действием силы трения объекта, движущегося по инерции
 * 
 * Принимаемые параметры:
 * @param {object} conditions имеет следующие поля:
 *      @param {number} speed - начальная скорость объекта
 *      @param {number} friction - коэффициент трения
 *      @param {number} g - ускорение свободного падения
 */

export function distanceToFullBraking(conditions) {
    const speed = conditions.speed;
    const friction = conditions.friction;
    const g = conditions.g;

    return Math.pow(speed, 2) / (2 * friction * g);
}