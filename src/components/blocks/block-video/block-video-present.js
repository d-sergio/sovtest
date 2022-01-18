/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import v from "../../classes/video.module.css";
import s from "./block-video.module.css";
import f from "../../classes/fonts.module.css";
import ButtonDownload from "../../buttons/button-download/button-download";

export default (props) => (
    <>
        <h1 className={[f.font_marginH3, f.font__H3up, f.font_uppercase].join(" ")}>
            {props.srcData.safety}
        </h1>

        <div className={v.video__container}>
            <iframe src="https://www.youtube.com/embed/UMmyGGdr07M" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className={s.blockVideo__download}>
            <ButtonDownload/>
        </div>
    </>
);