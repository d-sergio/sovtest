/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import ButtonInfoDesktop from "../../buttons/button-info-desktop/button-info-desktop";
import s from "./card-product-desktop.module.css";
import f from "../../classes/fonts.module.css";
import { Link } from "gatsby";

export default (props) => (
    <div className={s.product__container}>

        <div className={s.product__border}>

            <div className={s.product__photo}>
                <img src={props.srcData} alt="product"/>
            </div>

            <div className={s.product__info}>
                <p className={[f.font__H4low, f.font_uppercase, s.product__name].join(" ")}>
                    {props.raw.name}
                </p>

                <p className={s.product__description}>
                    {props.raw.short}
                </p>

                <div className={s.product__button}>
                    <Link to={props.raw.link}>
                        <ButtonInfoDesktop/>
                    </Link>
                </div>
            </div>

        </div>

    </div>
);