//Внешний вид кнопок "Открыть меню" и "Закрыть меню"

import React from "react";
import s from "./nav-menu-button-view.module.css";

export function IconOpen () {
    return(
        <div className={s.responsiveMenu__openIcon}>
                <div></div>
                <div></div>
                <div></div>
        </div>
    )
}

export function IconClose () {
    return <div className={s.responsiveMenu__closeIcon}></div>;
}