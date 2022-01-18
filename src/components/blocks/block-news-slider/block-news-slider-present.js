/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import NewsCardForSlider from "../../cards/card-news/news-card-for-slider";
import Slider from "../../slider/slider";
import {ArrowLeftSpace, ArrowRightSpace} from "../../arrows/arrows";
import s from "./block-news-slider.module.css";
import o from "../../classes/slider-outer.module.css";

const sliderProps = {
    visible: 2,
    prev: <ArrowLeftSpace/>,
    next: <ArrowRightSpace/>
};

export default (props) => (
    <div className={[s.blockNewsSlider__gallery, o.slider__outer].join(" ")}>
        <MakeListFor src={props.srcData} handler={<NewsCardForSlider/>}>
            <Slider sliderProps={sliderProps}/>
        </MakeListFor>
    </div>
);