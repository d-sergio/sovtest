/**Компонент-обёртка для всех страниц.
 * 
 * Передаёт через контекст текущий язык сайта.
 * 
 * После загрузки:
 * - Если пользователь уже посещал сайт, то установленный в прошлый раз язык сайта
 * должен был сохраниться в localStorage.
 * - Если пользователь впервые зашёл на сайт, то берётся язык браузера.
 * 
 * Текущий язык сайта сохраняется в localStorage, чтобы запомнить выбор
 * пользователя для следующих посещений.
 */

import React from 'react';
import LanguageContext from "../language-context/language-context";

class RootLayout extends React.Component{
    constructor(props){
        super(props);
        this.initLanguage = this.initLanguage.bind(this);
        this.toggleLang = this.toggleLang.bind(this);
        this.checkLocalStorage = this.checkLocalStorage.bind(this);
        this.saveLanguage = this.saveLanguage.bind(this);

        this.state = {
            lang: 'ru',
            toggleLang: this.toggleLang
        };
    }

    componentDidMount() {
        this.initLanguage();
    }

    componentDidUpdate() {
        this.saveLanguage();
    }

    initLanguage() {
        const savedLanguage = this.checkLocalStorage();
        const browserLanguage = window.navigator.language.slice(0, 2);

        /*
        1. Язык сохранён с прошлого посещения и не совпадает с текущим
        2. Язык не сохранён, а текущий не совпадает с языком браузера
        */
        if (
            (savedLanguage && this.state.lang !== savedLanguage)    //1

            || (!savedLanguage && browserLanguage !== this.state.lang)  //2

        ) {
            this.toggleLang();
        } else {
            this.saveLanguage();
        }
    }

    checkLocalStorage() {
        const savedLanguage = localStorage.getItem("lang");

        return savedLanguage ? savedLanguage : false;
    }

    toggleLang() {
        this.setState(
            () => ({
                lang: this.state.lang === 'ru'
                        ? 'en'
                        : 'ru'
            })
        );
    }

    saveLanguage() {
        localStorage.setItem("lang", this.state.lang);
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <div key={this.state.lang}>{this.props.children}</div>
            </LanguageContext.Provider>
        );
    }
}

export default RootLayout;