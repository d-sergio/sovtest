/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import ButtonInfoMobile from "../../buttons/button-info-mobile/button-info-mobile";
import s from "./card-product-mobile.module.css";
import f from "../../classes/fonts.module.css";
import { Link } from "gatsby";

export default (props) => (
    <div className={s.product__container_mobile}>
        <div className={[f.font__H4low, f.font_uppercase].join(" ")}>
            {props.raw.name}
        </div>
        <div className={s.product__photo}>
            <img src={props.srcData} alt="product"/>
        </div>
        <p className={s.product__description}>{props.raw.short}</p>
        <div className={s.product__button}>
            <Link to={props.raw.link}>
                <ButtonInfoMobile/>
            </Link>
        </div>
    </div>
);