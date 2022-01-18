/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import ButtonMoreInfo from "../../buttons/button-info-series/button-info-series";
import {Link} from "gatsby";
import s from "./card-series.module.css";
import i from "../../classes/images.module.css";
import f from "../../classes/fonts.module.css";

export default (props) => {
    let series = null;

    switch(props.raw.series) {
        case 's-safe':
            series = (
                <>
                    <p className={f.fonts__series_big}>S-SAFE</p>
                    <p className={[f.font__H4up, f.font_uppercase, f.font_yellow].join(" ")}>Линейка шкафов<br/>
                        ЛВЖ S-SAFE<br/>
                        Series Safety
                    </p>
                </>
            );
            break;
    };

    return(
        <div className={s.series__container}>
            <div className={s.series__top}>
                <div className={s.series__image}>
                    <img src={props.srcData} className={i.images__scalable} alt="product"/>
                </div>
                <div className={[s.series__description,f.fonts__lineheight_halfScreen].join(" ")}>
                    <p className={[f.font_uppercase, f.font__H3low, f.font__series_name, s.series__name].join(" ")}>
                        {props.raw.name}
                    </p>
                    <p className={[s.series__info, f.font_yellow, f.font__series_info].join(" ")}>
                        {props.raw.short}
                    </p>
                    <Link to={props.raw.link}>
                        <ButtonMoreInfo/>
                    </Link>
                </div>
            </div>
            <div className={s.series__bottom}>
                <div>{series}</div>
            </div>
        </div>
    );
};