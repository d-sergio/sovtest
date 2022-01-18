import React from "react";
import Layout from "../components/layout/layout";
import BlockProduction from "../components/blocks/block-production/block-production";
import LanguageContext from "../components/language-context/language-context";
import mc from "../components/classes/main-containers.module.css";
import f from "../components/classes/fonts.module.css";

class Production extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            jsonData: null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/production-page-${this.context.lang}.json`)
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

                        <h1 className={[f.font__H3up, f.font_marginH3, f.font_uppercase].join(" ")}>
                            {this.state.jsonData.production}
                        </h1>
                        
                        <BlockProduction/>
                    </div>
                </Layout>
            );
        }
    }
}

Production.contextType = LanguageContext;

export default Production;