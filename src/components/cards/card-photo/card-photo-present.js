/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import s from "./card-photo.module.css";
import i from "../../classes/images.module.css";

export default (props) => (
    <div className={s.photogallery}>
        <img src={props.srcData} alt="photo" className={i.images__scalable}></img>
    </div>
);