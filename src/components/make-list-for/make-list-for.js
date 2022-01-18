/** MakeListFor
 * 
 * 1. передаёт данные из src (массив или json, содержащий массив) компоненту
 * handler
 * 2. handler создаёт карточки на их основе
 * 3. MakeListFor принимает назад готовые карточки и отдаёт их все в компонент
 * consumer, которому они предназначены (например, слайдеру).
 * 
 * Props:
 * @param {JSON, array} src - JSON или массив
 * @param {component} handler - обработчик данных (например, создаёт карточку из них).
 * @param {node} consumer - берётся из props.children (только один! иначе ошибка). Можно указать пустой div.
 */

import React from "react";

function MakeListFor(props) {

    const data = props.src;
    const handler = props.handler;

    const consumer = React.Children.only(props.children);
        
    const list = data.map(item => 
        <>{React.cloneElement(handler, {raw: item})}</>
    );

    return(
        <>{React.cloneElement(consumer, {children: list})}</>
    );
}

export default MakeListFor;