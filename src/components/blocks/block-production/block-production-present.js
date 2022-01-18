/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import CardProduct from "../../cards/card-product/card-product";

export default (props) => (
    <MakeListFor src={props.srcData} handler={<CardProduct/>}>
        <div></div>
    </MakeListFor>
);