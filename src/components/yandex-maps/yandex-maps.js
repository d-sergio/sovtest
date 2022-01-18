import React from "react";
import LanguageContext from "../language-context/language-context";
import s from "./yandex-maps.module.css";


class YandexMaps extends React.Component{
    constructor(props) {
        super(props);

        this.mounted = true;
    }

    componentDidMount(){
        let lang = 'ru_RU';

        if (this.context.lang !== 'ru') {
            lang = 'en_US';
        }

        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=aea5a531-f621-4384-bc6f-f63cda6a6eb2&lang=${lang}`;
        document.head.appendChild(script);

        script.onload = () => {
            //ничего не выполняется, если компонент размонтирован
            if (this.mounted) {
                window.ymaps.ready(init);
            }

            function init(){
                try{
                        var myMap = new window.ymaps.Map("map", {
                            center: [51.801700, 36.162275],
                            zoom: 15
                        });

                        var myPlacemark = new window.ymaps.Placemark([51.801700, 36.162275], {}, {
                            preset: 'islands#redIcon'
                        });
                        myMap.geoObjects.add(myPlacemark);
                } catch(e) {
                    console.log(`yandex-maps: Скрипт загружен, но не выполнен.\n ${e.name}: ${e.message}\n ${e.stack}`);
                }
            }
        };
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    render() {
        return(
            <div id="map" className={s.yamaps__container}></div>
        )
    }
}

YandexMaps.contextType = LanguageContext;

export default YandexMaps;