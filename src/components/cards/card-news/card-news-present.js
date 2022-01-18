/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import ButtonReadMore from "../../buttons/button-read-more/button-read-more";
import { Link } from "gatsby";
import f from "../../classes/fonts.module.css";
import s from "./card-news.module.css";
import truncate from "../../others/truncate";

export default (props) => {
    const truncateProps = {
        string: props.raw.description,
        maxLength: props.maxLength
    };

    let description = truncate(truncateProps);

    return(
        <div className={s.cardNews_marginTop}>
            <Link to={props.raw.link} className={[s.cardNews__container].join(" ")}>
                <Link to="/news" className={s.cardNews__title}>
                    <h3 className={[s.cardNews__center,f.font__H5up, f.font_uppercase, f.font__montserratBold].join(" ")}>
                        {props.raw.title}
                    </h3>
                </Link>

                <img className={s.cardNews__img} src={props.srcData} alt="photo"></img>

                <p className={s.cardNews__description}>{description}</p>

                <div className={s.cardNews__button}>
                    <ButtonReadMore/>
                </div>
            </Link>
        </div>
    );
};