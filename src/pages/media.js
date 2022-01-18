import React from "react";
import Layout from "../components/layout/layout";
import BlockVideo from "../components/blocks/block-video/block-video";
import Slider from "../components/slider/slider";
import CardPhoto from "../components/cards/card-photo/card-photo";
import MakeListFor from "../components/make-list-for/make-list-for";
import LanguageContext from "../components/language-context/language-context";
import mc from "../components/classes/main-containers.module.css";
import s from "../components/classes/media.module.css";
import {ArrowLeftSpace, ArrowRightSpace} from "../components/arrows/arrows";
import jsonManuf from "../json/media-page-sliders/media-manufacture.json";
import jsonProd from "../json/media-page-sliders/media-production.json";
import f from "../components/classes/fonts.module.css";

class Media extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData: null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/media-page-${this.context.lang}.json`)
        //если компонент размонтирован - никаких действий не совершаем
        .then((jsonData) => {
            if (this.mounted) {
                this.setState({jsonData: jsonData.default})
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (!this.state.jsonData) {
            return null;
        } else {
            const mutationsManufacture = {
                1: 1,
                768: 2
            };
        
            const mutationsProduction = {
                0: 1,
                500: 2,
                900: 3
            };
        
            const propsManufacture = {
                prev: <ArrowLeftSpace/>,
                next: <ArrowRightSpace/>,
                space: 20,
                visible: mutationsManufacture
            };

            const propsProduction = {
                prev: <ArrowLeftSpace/>,
                next: <ArrowRightSpace/>,
                space: 20,
                visible: mutationsProduction
            };

            return(
                <Layout>
                    <div className={mc.main__container}>
                        <BlockVideo/>
                    </div>

                    <p className={[s.media__title, f.font__H4up, f.font_uppercase, mc.main__container].join(" ")}>
                        {this.state.jsonData.manufacture}
                    </p>

                    <div className={mc.main__container_gallery}>
                        <MakeListFor src={jsonManuf} handler={<CardPhoto/>}>
                            <Slider sliderProps={propsManufacture}/>
                        </MakeListFor>
                    </div>

                    <p className={[s.media__title, f.font__H4up, f.font_uppercase, mc.main__container].join(" ")}>
                        {this.state.jsonData.production}
                    </p>
                    
                    <div className={mc.main__container_gallery}>
                        <MakeListFor src={jsonProd} handler={<CardPhoto/>}>
                            <Slider sliderProps={propsProduction}/>
                        </MakeListFor>
                    </div>
                </Layout>
            );
        }
    }
}

Media.contextType = LanguageContext;

export default Media;