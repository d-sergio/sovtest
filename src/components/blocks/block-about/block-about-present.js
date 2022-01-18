/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import logoSrc from "../../../images/logo.png";
import s from "./block-about.module.css";
import f from "../../../components/classes/fonts.module.css";


export default (props) => (
    <div className={s.aboutBlock__container}>

        <img src={logoSrc} alt="logo" className={s.aboutBlock__logo}/>

        <div className={[s.aboutBlock__safety, f.font__montserratBold, f.font__H5low, f.fonts__lineheight_mobile].join(" ")}>
            {props.srcData.text1}
            <span className={f.font_yellow}> SOVTEST </span>
            {props.srcData.text2}
        </div>

        <div className={[s.aboutBlock__item, s.aboutBlock__border].join(" ")}>
            {props.srcData.text3}
        </div>
    
    </div>
);