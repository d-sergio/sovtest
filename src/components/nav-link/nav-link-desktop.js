/**Пункт меню навигации с подсветкой (для десктопа)
 * 
 * Props:
 * @param {string} name - название пункта навигации
 * @param {string} link - куда ведёт нажатие пункта навигации
 */

import React from "react";
import { Link } from "gatsby";
import s from "./nav-link.module.css";
import f from "../classes/fonts.module.css";

export default(props) => (
    <Link to={props.link} className={s.navlink__links}>
        <span className={[f.font__base_up, f.font_uppercase].join(" ")}>
            <span className={f.font__H5up}>{props.name.slice(0, 1)}</span>{props.name.slice(1)}
        </span>
    </Link>
);