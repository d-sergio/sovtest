/** Карточка товара для слайдера "Вас также могут заинтересовать"
 * 
 *  Props:
 *  @param {object} raw
 * 
 *  Объект raw:
 *  raw.photo - имя файла
 *  raw.name - название продукта
 *  raw.link - ссылка на страницу продукта
 * 
 */

import React from "react";
import DynamicImport from "../../dynamic-import/dynamic-import";
import CardAlsoPresent from "./card-also-present";
import CardAlsoDummy from "./card-also-dummy";

export default (props) => {
    return(
        <DynamicImport src={props.raw.photo} dummy={<CardAlsoDummy/>}>
            <CardAlsoPresent raw={props.raw}/>
        </DynamicImport>
    )
};