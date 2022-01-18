import React from "react"
import Layout from "../components/layout/layout"
import BlockAbout from "../components/blocks/block-about/block-about"; 
import BlockVideo from "../components/blocks/block-video/block-video";
import BlockWellcome from "../components/blocks/block-wellcome/block-wellcome";
import BlockNews from "../components/blocks/block-news/block-news";
import BlockSeries from "../components/blocks/block-series/block-series";
import LanguageContext from "../components/language-context/language-context";
import s from "../components/classes/main.css";
import x from "../components/classes/index.module.css";
import mc from "../components/classes/main-containers.module.css";
import f from "../components/classes/fonts.module.css";

class Index extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData:null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/index-page-${this.context.lang}.json`)
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

                    <BlockSeries/>

                    <div className={mc.main__container}>
                        <BlockAbout/>
                        
                        <div className={x.index__blockVideo}>
                            <BlockVideo/>
                        </div>
                    </div>

                    <BlockWellcome/>

                    <div className={mc.main__container}>
                        <h2 className={[f.font__H2up, f.font_uppercase, f.font_yellow].join(" ")}>
                            {this.state.jsonData.news}
                        </h2>
                    </div>
                    
                    <BlockNews/>

                </Layout>
            );
        }
    }
}

Index.contextType = LanguageContext;

export default Index;