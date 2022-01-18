/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import CardSeries from "../../cards/card-series/card-series";
import Slider from "../../slider/slider";
import {ArrowLeftSeries, ArrowRightSeries} from "../../arrows/arrows";
import s from "./block-series.module.css";

const sliderProps = {
    visible: 1,
    prev: <ArrowLeftSeries/>,
    next: <ArrowRightSeries/>,
    treshold: 0.05
};

export default (props) => (
    <div className={s.bs__outer}>
        <div className={s.bs__container}>
            <MakeListFor src={props.srcData} handler={<CardSeries/>}>
                <Slider sliderProps={sliderProps}/>
            </MakeListFor>
        </div>
    </div>
)