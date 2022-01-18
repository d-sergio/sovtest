/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import Catalog from "../../catalog/catalog";

export default (props) => (
    <MakeListFor src={props.srcData} handler={<Catalog/>}>
        <ul></ul>
    </MakeListFor>
);