/** Генерирует элементы каталога
 * Props:
 * @param {string} raw.name
 * @param {string} raw.link
 * @param {string} raw.id
 * 
 * Возвращает элементы <li>. Не забудь обернуть в <ul> в месте вставки!
 */

import React from "react";
import {Link} from "gatsby";
import f from "../classes/fonts.module.css";
import s from "./catalog.module.css";

export default(props) => (
    <li key={props.raw.id} className={[s.catalog__link, f.font__H5up, f.font__montserratLight].join(" ")}>
        <Link to={props.raw.link}>{props.raw.name}</Link>
    </li>
);