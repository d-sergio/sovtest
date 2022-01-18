import React from "react";
import Layout from "../../components/layout/layout";
import mc from "../../components/classes/main-containers.module.css";
import f from "../../components/classes/fonts.module.css";
import s from "./post-template.module.css";

export default(props) => (
    <Layout>
        <div className={mc.main__container}>
            <h1 className={[f.font_marginH3, f.font__H3up, f.font_uppercase].join(" ")}>
                {props.title}
            </h1>
            <div className={[f.font_black, f.fonts__lineheight_base, s.postTemplate_marginNews].join(" ")}>
                {props.text}
            </div>
            {/*<div className={[f.font__montserratBold, f.font_textRight, f.font_black, f.font_marginNews, f.fonts__lineheight_base].join(" ")}>
                <p>Подпись автора</p>
                <p>дата</p>
            </div>*/}
        </div>
    </Layout>
);