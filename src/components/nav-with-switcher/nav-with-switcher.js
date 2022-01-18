/**Меню навигации
 * 
 * Props:
 * @param {node} children - элементы меню
 * @param {object} navProps - объект, содержащий следующие поля:
 *   @param {node} logo - логотип
 *   @param {node} mobileButton - кнопка мобильной навигации
 *   @param {number} maxMobileSize - максимальный размер окна, при котором
 *   навигация по сайту прячется в одну кнопку
 *   @param {number} langSwitchMobileShift - сдвиг кнопки переключения RU/EN
 *   относительно кнопки навигации в мобильном варианте
 *   @param {number} langSwitchShift - сдвиг кнопки переключения RU/EN
 *   относительно ссылок навигации в десктопном варианте
 * 
 * Methods:
 * @method setView() - в зависимости от размера окна, устанавливает
 * мобильный или десктопный вид меню
 * @method setLangSwitcherPosition() - вычисляет координаты <LangSwitcher>
 */

import React from "react";
import LangSwitcher from "../lang-switcher/lang-switcher";
import s from "./nav.module.css";

class NavWithSwitcher extends React.Component{
    constructor(props){
        super(props);

        this.nav = React.createRef();

        this.setLangSwitcherPosition = this.setLangSwitcherPosition.bind(this);
        this.setView = this.setView.bind(this);

        this.state = {
            langswitcherX: 0,
            mobileView: true
        }
    }

    componentDidMount() {
        this.setView();
        window.addEventListener('resize', this.setView);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setView);
    }

    setView() {
        const mobileView = (window.innerWidth <= this.props.navProps.maxMobileSize)
                     ? true
                     : false;

        const langswitcherX = this.setLangSwitcherPosition();

        this.setState({
            langswitcherX: langswitcherX,
            mobileView: mobileView
        });
    }

    setLangSwitcherPosition() {
        try{
            if (this.nav.current !== null){
                const nav = this.nav.current;

                let navCoords = nav.getBoundingClientRect();

                let langswitcherX = navCoords.left + navCoords.width;

                if (window.innerWidth <= this.props.navProps.maxMobileSize) {
                    langswitcherX += this.props.navProps.langSwitchMobileShift;
                } else {
                    langswitcherX += this.props.navProps.langSwitchShift;
                }

                return langswitcherX;
            } else {
                console.log(`NavWithSwitcher. setLangSwitcherPosition() остановлен. this.nav.current is ${this.nav.current}`);
            }
        } catch(e) {
            console.log(`LangSwitcher. Ошибка setLangSwitcherPosition(): ` + e.name + ":" + e.message + "\n" + e.stack);
            
            return this.state.langswitcherX;
        }
    }

    render() {
        const showMenu = this.state.mobileView
                        ?   (
                                <div className={s.nav__mobile}>
                                    {this.props.navProps.mobileButton}
                                </div>
                            )
                        : this.props.children;

        return(
            <>
                <nav ref={this.nav} className={s.nav__container}>
                    {this.props.navProps.logo}
                    {showMenu}
                </nav>
                <LangSwitcher langswitcherX={this.state.langswitcherX}></LangSwitcher>
            </>
        )
    }
}

export default NavWithSwitcher;