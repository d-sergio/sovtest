/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import {Link} from "gatsby";
import ButtonReadMore from "../../buttons/button-read-more/button-read-more";
import TruncableTextBlock from "../../truncable-text-block/truncable-text-block";
import {onPointerDown, onPointerMove, onClick} from "../../others/move-or-click";
import f from "../../classes/fonts.module.css";
import s from "./card-actual.module.css";

export default function CardActualPresent(props) {

    const titleProps = {
        titleMode: true,
        textMaxLength: 70,
        symbolWidth: 14
    };
    
    const descProps = {
        textMaxLength: 180,
        symbolWidth: 12
    };

    return (
        <Link to={props.raw.link} className={s.cardActual__container}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}>

            <Link to="/news"
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}>
                <div className={[s.cardActual__title, s.cardActual__center,f.font__H5low, f.font__montserratBold].join(" ")}>
                    <TruncableTextBlock blockProps={titleProps}>
                        {props.raw.title}
                    </TruncableTextBlock>
                </div>
            </Link>

            <img className={s.cardActual__img} src={props.srcData} alt="actual news"></img>

            <div className={s.cardActual__description}>
                <TruncableTextBlock blockProps={descProps}>
                    {props.raw.description}
                </TruncableTextBlock>
            </div>

            <div className={s.cardActual__button}>
                <ButtonReadMore/>
            </div>
        </Link>
    );
}