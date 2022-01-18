/** Простой импорт фотографий в слайдер из JSON
 * 
 *  Props:
 *  @param {object} raw
 * 
 *  Объект raw:
 *  raw.photo - имя файла
 * 
 */

import React from "react";
import DynamicImport from "../../dynamic-import/dynamic-import";
import CardPhotoPresent from "./card-photo-present";

export default (props) => {
    return(
        <DynamicImport src={props.raw.photo}>
            <CardPhotoPresent raw={props.raw}/>
        </DynamicImport>
    )
};