/** Карточка для слайдера новостей
 * 
 *  Props:
 *  @param {object} raw
 *  Объект raw:
 *  raw.titlePhoto - главное фото
 *  raw.title - название статьи
 *  raw.description - краткое описание
 *  raw.link - ссылка на страницу статьи
 * 
 *  @param {number} maxLength - максимальное число символов в описании, больше которого строка
 *  усекается с добавлением троеточия "..." в конце (180 по умолчанию)
 * 
 */

import React from "react";
import DynamicImport from "../../dynamic-import/dynamic-import";
import CardNewsPresent from "../card-news/card-news-present";

export default (props) => {
    const {maxLength = 180} = props;
    
    return(
        <DynamicImport src={props.raw.titlePhoto.slice(1)}>
            <CardNewsPresent raw={props.raw} maxLength={maxLength}/>
        </DynamicImport>
    )
};