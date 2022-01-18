/** Карточка для слайдера актуальных новостей
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
import CardActualPresent from "../card-actual/card-actual-present";

export default (props) => {
    return(
        <DynamicImport src={props.raw.titlePhoto.slice(1)}>
            <CardActualPresent raw={props.raw}/>
        </DynamicImport>
    )
};