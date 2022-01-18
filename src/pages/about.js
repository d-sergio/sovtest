import React from "react";
import Layout from "../components/layout/layout";
import LanguageContext from "../components/language-context/language-context";
import s from "../components/classes/about.module.css";
import mc from "../components/classes/main-containers.module.css";
import i from "../components/classes/images.module.css";
import f from "../components/classes/fonts.module.css";
import Mainimage from "../images/about/mn.png";
import imgProd1 from "../images/media/07_1_G-SAFE 90.2200.1300.png";
import imgProd2 from "../images/media/02_S-SAFE 90.850.650.png";
import imgProd3 from "../images/media/05_1_S-SAFE 90.1950.650.png";

const paragraph = 'paragraph';

class About extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData: null,
            text: null
        };

        this.createTextFromJSON = this.createTextFromJSON.bind(this);

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/about-page-${this.context.lang}.json`)
        //если компонент размонтирован - никаких действий не совершаем
        .then((jsonData) => {
            if (this.mounted) {
                this.setState({jsonData: jsonData.default})
            }
        });
    }

    componentDidUpdate() {
        if (!this.state.text) {
            this.createTextFromJSON();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    createTextFromJSON() {
        if (this.state.jsonData) {
            let text = [];

            for (let [key, value] of Object.entries(this.state.jsonData)) {
                if (key.includes(paragraph)) {
                    text.push(<><p>&nbsp;&nbsp;&nbsp;&nbsp;{value}</p></>);
                }
            }
        
            this.setState({text: text});
        } else {
            console.log(`About page: не удалось получить данные JSON`);
        }
    }

    render() {
        if (!this.state.jsonData && !this.state.text) {
            return null;
        } else {
            return(
                <Layout>
                    <div className={mc.main__container}>

                        <h1 className={[f.font__H3up, f.font_uppercase, f.font_marginH3].join(" ")}>
                            {this.state.jsonData.about}
                        </h1>

                        <img className={i.images__scalable} src={Mainimage} alt="mainimage"/>
                        
                        <div className={[f.fonts__lineheight_base, f.font_marginNews, s.about__text].join(" ")}>
                            {this.state.text}
                        </div>

                        <h3 className={[f.font__H4up, f.font_uppercase, s.about__production].join(" ")}>
                            {this.state.jsonData.production}
                        </h3>

                        <div className={s.about__photos}>
                            <img src={imgProd1} alt="prod1"/>
                            <img src={imgProd2} alt="prod1"/>
                            <img src={imgProd3} alt="prod1"/>
                        </div>

                    </div>
                </Layout>
            );
        }
  }
}

About.contextType = LanguageContext;

export default About;