/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import Slider from "../../slider/slider";
import MakeListFor from "../../make-list-for/make-list-for";
import CardAlso from "../../cards/card-also/card-also";
import {ArrowLeftSpace, ArrowRightSpace} from "../../arrows/arrows";

const sliderProps = {
    visible: 0,
    prev: <ArrowLeftSpace/>,
    next: <ArrowRightSpace/>,
    space: 20
};

export default (props) => (
    <MakeListFor src={props.srcData} handler={<CardAlso/>}>
        <Slider sliderProps={sliderProps}/>
    </MakeListFor>
);