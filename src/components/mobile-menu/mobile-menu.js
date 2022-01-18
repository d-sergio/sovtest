/**Мобильное меню навигации по сайту
 * 
 * Props:
 * @param {boolean} isOpen - указывает состояние меню: открыто/закрыто (true/false)
 * @param {string} height - высота меню. Указывается с единицами измерения (например,
 * %, px, em, rem)
 */

import React from "react";
import s from "./mobileMenu.module.css";

class MobileMenu extends React.Component{
    constructor(props){
        super(props);

        this.update = this.update.bind(this);

        this.menuContainer = React.createRef();
        this.menuList = React.createRef();
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update(){
        const menuContainer = this.menuContainer.current;
        const menuList = this.menuList.current;

        if (this.props.isOpen === true) {
            menuList.style.display = "flex";
            menuContainer.style.height = this.props.height;
            
        } else {
            menuContainer.style.height = "0px";
            menuList.style.display = "none";
        }
    }

    render() {
        return (
            <>
                <div ref={this.menuContainer} className={s.mobileMenu__container}>
                    <div ref={this.menuList} className={s.mobileMenu__list}>
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}

export default MobileMenu;