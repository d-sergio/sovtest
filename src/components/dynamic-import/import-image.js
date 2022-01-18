/**Вспомогательный компонент для импорта изображений
 * 
 * Изображение автоматически масштабируется под родителя с сохранением
 * пропорций.
 * 
 * Пример использования:
 * 
 *   <DynamicImport src={link}>
 *      <ImportImage/>
 *   </DynamicImport
 */

import React from 'react';
import i from  "../classes/images.module.css";

export default function ImportImage(props) {
    return(
        <img src={props.srcData} className={i.images__scalable} alt="Imported photo"/>
    );
}