/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import {Link} from 'gatsby';
import {onPointerDown, onPointerMove, onClick} from "../../others/move-or-click";
import f from "../../classes/fonts.module.css";
import s from "./card-also.module.css";
import i from "../../classes/images.module.css";


 export default function CardAlsoPresent(props) {

    return (
        <Link to={props.raw.link} className={s.also__spaceAround}
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}>

            <div className={s.also__content}>

                <p className={[s.also__name, f.font__montserratLight, f.font__H5up, f.font_uppercase].join(" ")}>
                    {props.raw.name}
                </p>

                <div className={s.also__img}>
                    <img className={i.images__scalable} src={props.srcData} alt="also"/>
                </div>

            </div>

        </Link>
    );
}