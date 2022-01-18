/** Карточка для слайдера новостей
 * 
 *  Карточки имеют гибкие адаптирующиеся размеры, но в слайдере сохраняют одинаковую
 *  высоту. Высота блоков с заголовком и описанием вычисляется
 *  на основе ширины символа и максимального допустимого числа символов (берутся
 *  их props).
 * 
 *  Props:
 *  @param {object} raw
 *  Объект raw:
 *  raw.titlePhoto - главное фото
 *  raw.title - название статьи
 *  raw.description - краткое описание
 *  raw.link - ссылка на страницу статьи
 */

import React from "react";
import DynamicImport from "../../dynamic-import/dynamic-import";
import NewsForSliderPresent from "../card-news/news-card-for-slider-present";

export default (props) => {
    return(
        <DynamicImport src={props.raw.titlePhoto.slice(1)}>
            <NewsForSliderPresent raw={props.raw}/>
        </DynamicImport>
    )
};