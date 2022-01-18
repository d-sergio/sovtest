/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import ButtonReadMore from "../../buttons/button-read-more/button-read-more";
import {Link} from "gatsby";
import TruncableTextBlock from "../../truncable-text-block/truncable-text-block";
import {onPointerDown, onPointerMove, onClick} from "../../others/move-or-click";
import f from "../../classes/fonts.module.css";
import s from "./card-news.module.css";

const titleProps = {
    titleMode: true,
    textMaxLength: 70,
    symbolWidth: 16
};

const descProps = {
    textMaxLength: 180,
    symbolWidth: 12
};

export default (props) => (
    <Link to={props.raw.link} className={s.cardNews__container_slider}
    onClick={onClick}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}>

        <Link to="/news" className={s.cardNews__title}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}>

            <div className={[s.cardNews__center,f.font__H5up, f.font_uppercase, f.font__montserratBold].join(" ")}>
                <TruncableTextBlock blockProps={titleProps}>
                    {props.raw.title}
                </TruncableTextBlock>
            </div>

        </Link>

        <img className={s.cardNews__img} src={props.srcData} alt="photo"></img>

        <div className={s.cardNews__description}>
            <TruncableTextBlock blockProps={descProps}>
                {props.raw.description}
            </TruncableTextBlock>
        </div>

        <ButtonReadMore/>
    </Link>
);