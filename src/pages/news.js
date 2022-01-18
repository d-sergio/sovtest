import React from "react";
import Layout from "../components/layout/layout";
import CardTopNews from "../components/cards/card-topnews/card-topnews";
import BlockActualNews from "../components/blocks/block-actual-news/block-actual-news";
import f from "../components/classes/fonts.module.css";
import mc from "../components/classes/main-containers.module.css";
import s from "../components/classes/news.module.css";
import LanguageContext from "../components/language-context/language-context";

class News extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData: null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/news-page-${this.context.lang}.json`)
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
            return(
                <Layout>
                    <div className={mc.main__container}>

                        <h1 className={[f.font__H3up, f.font_uppercase, f.font_marginH3].join(" ")}>
                            {this.state.jsonData.news}
                        </h1>

                        <CardTopNews/>

                        <h2 className={[s.news__actualTitle, f.font__H5up, f.font_uppercase].join(" ")}>
                            {this.state.jsonData.actual}
                        </h2>
                        
                    </div>
                    <BlockActualNews/>
                </Layout>
            );
        }
    }
}

News.contextType = LanguageContext;

export default News;
