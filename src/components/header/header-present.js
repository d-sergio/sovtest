/**Здесь только передаём нужные параметры в меню навигации <NavWithSwitcher>
 * 
 * Изменять/добавлять/удалять ссылки меню можно через файлы JSON этого компонента.
 * 
 * Props:
 * @param {array} srcData - импортированные из JSON ссылки меню
*/

import React from "react";
import { Link } from "gatsby";
import NavWithSwitcher from "../nav-with-switcher/nav-with-switcher";
import NavMenuButton from "../nav-menu-button/nav-menu-button";
import MobileMenu from "../mobile-menu/mobile-menu";
import {IconOpen, IconClose} from "../nav-menu-button/nav-menu-button-view";
import NavLinkDesktop from "../nav-link/nav-link-desktop";
import NavLinkMobile from "../nav-link/nav-link-mobile";
import s from "./header.module.css";


export default (props) => {

    const logo = (
        <Link to="/" className={s.header__logo}></Link>
    )

    //Создаём меню для десктопа (данные из пропсов, ранее импортированные из JSON)
    let menuItemsDesktop = [];

    for (let menuItem of props.srcData){
        menuItemsDesktop.push(<NavLinkDesktop name={menuItem.name} link={menuItem.link}/>);
    }

    //Создаём меню для мобильных (данные из пропсов, ранее импортированные из JSON)
    let menuItemsMobile = [];

    for (let menuItem of props.srcData){
        menuItemsMobile.push(<NavLinkMobile name={menuItem.name} link={menuItem.link}/>);
    }

    const mobileMenu = (
        <MobileMenu height="29.375rem">
            {menuItemsMobile}
        </MobileMenu>
    );

    //Кнопка мобильного меню
    const mobileButton = (
        <NavMenuButton mobileMenu={menuItemsMobile} iconOpen={<IconOpen/>} iconClose={<IconClose/>}>
            {mobileMenu}
        </NavMenuButton>
    );

    const navProps = {
        logo: logo,
        mobileButton: mobileButton,
        maxMobileSize: 1024,
        langSwitchMobileShift: -100,
        langSwitchShift: 56
    }

    return(
        <header>
            <NavWithSwitcher navProps={navProps}>
                {menuItemsDesktop}
            </NavWithSwitcher>
        </header>
    )
};