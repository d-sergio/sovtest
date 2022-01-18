/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import s from "../buttons.module.css";
import f from "../../classes/fonts.module.css";

export default (props) => (
    <button className={[s.button__base, s.button__size_read].join(" ")}>
        <p className={f.font__H5low}>{props.srcData.text}</p>
    </button>
);