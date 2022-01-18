/**Заглушка, которая рендерится, пока не импортированы изображения для карточек.
 * Она имеет те же размеры, что и сама карточка. Это позволяет слайдеру правильно
 * рассчитать размеры слайдов, сразу как только он их получит, не дожидаясь
 * окончания импорта
 */

import React from "react";
import s from "./card-also.module.css";

export default () => (
    <div className={s.also__spaceAround}>
        <div className={s.also__content}>
        </div>
    </div>
);