/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import MakeListFor from "../../make-list-for/make-list-for";
import CardNews from "../../cards/card-news/card-news";
import Newsfeed from "../../news-feed/news-feed";
import s from "./block-newsfeed.module.css";
import mc from "../../classes/main-containers.module.css";

export default (props) => (
    <div className={[s.blockNewsfeed__container_mobile, mc.main__container].join(" ")}>
        <MakeListFor src={props.srcData} handler={<CardNews/>}>
            <Newsfeed/>
        </MakeListFor>
    </div>
);