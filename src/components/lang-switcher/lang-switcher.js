/**Языковой переключатель
 * 
 * Имеет absolute позиционирование. Координаты получает от NavWithSwitcher
 * через props.
 * 
 * Props:
 * @param {number} langswitcherX - относительные координаты по оси X
 * 
 */

import React from "react";
import LanguageContext from "../language-context/language-context";
import f from "../classes/fonts.module.css";
import s from "./langswitcher.module.css";

class LangSwitcher extends React.Component{
    constructor(props){
        super(props);
    }

    render() {

        return(
            <div onClick={this.context.toggleLang} style={{left: this.props.langswitcherX + 'px'}} className={s.langswitcher}>
                <span className={f.font__montserratBold}>{this.context.lang.toUpperCase()}</span>
            </div>
        )
    }
}

LangSwitcher.contextType = LanguageContext;

export default LangSwitcher;