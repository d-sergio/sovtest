import React from 'react';
import ButtonReadMore from "../../buttons/button-read-more/button-read-more";
import {Link} from 'gatsby';
import DynamicImport from "../../dynamic-import/dynamic-import";
import ImportImage from "../../dynamic-import/import-image";
import f from "../../classes/fonts.module.css";
import s from "./card-topnews.module.css";

export default(props) => {
    //берём последнюю новость из posts-ru/en.json
    const topnews = props.srcData.slice(-1)[0];

    return(
        <div className={s.cardTopnews__container}>

            <div className={s.cardTopnews__left}>
                <DynamicImport src={topnews.titlePhoto.slice(1)}>
                    <ImportImage/>
                </DynamicImport>
            </div>

            <div className={s.cardTopnews__right}>
                <div className={[f.fonts__lineheight_halfScreen, f.font_black, s.cardTopnews__text].join(" ")}>
                    <p className={[f.font__montserratBold, f.font__H4low, s.cardTopnews__margin].join(" ")}>
                        {topnews.title}
                    </p>

                    <p className={s.cardTopnews__margin}>
                        {topnews.description}
                    </p>
                </div>

                <div>
                    <Link to={topnews.link}>
                        <ButtonReadMore/>
                    </Link>
                </div>
            </div>
            <div className={s.cardTopnews__clear}></div>
        </div>
    );
}