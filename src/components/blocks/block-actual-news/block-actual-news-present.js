/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import CardActual from "../../cards/card-actual/card-actual";
import Slider from "../../slider/slider";
import {ArrowLeftSpace, ArrowRightSpace} from "../../arrows/arrows";
import f from "../../classes/fonts.module.css";
import o from "../../classes/slider-outer.module.css";
import s from "./block-actual-news.module.css";

export default (props) => {
    const visible = {
        0: 1,
        768: 2,
        1270: 3
    }

    const sliderProps = {
        prev: <ArrowLeftSpace/>,
        next: <ArrowRightSpace/>,
        space: 20,
        visible: visible
    }

    return(
        <div className={[s.blockActualNews__container, o.slider__outer, f.font_black].join(" ")}>
            <MakeListFor src={props.srcData} handler={<CardActual/>}>
                <Slider sliderProps={sliderProps}/>
            </MakeListFor>
        </div>
    )
};