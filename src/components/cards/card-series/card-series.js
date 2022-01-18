/** Карточка продукта для главного слайдера
 * 
 *  Props:
 *  @param {object} raw
 * 
 *  Объект raw:
 * 
 *  raw.photo - имя файла
 *  raw.series - название линейки товаров
 *  raw.name - название продукта
 *  raw.description - краткое описание продукта
 *  raw.link - ссылка на страницу продукта
 * 
 */

import React from "react";
import CardSeriesPresent from "./card-series-present";
import DynamicImport from "../../dynamic-import/dynamic-import";

export default (props) => {
    return(
        <DynamicImport src={props.raw.photo}>
            <CardSeriesPresent raw={props.raw}/>
        </DynamicImport>
    );
};