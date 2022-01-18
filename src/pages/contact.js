import React from "react";
import Layout from "../components/layout/layout";
import LanguageContext from "../components/language-context/language-context";
import ButtonRequest from "../components/buttons/button-request/button-request";
import mc from "../components/classes/main-containers.module.css";
import f from "../components/classes/fonts.module.css";
import imgGeo from "../images/contact/geo.png";
import imgEnvelope from "../images/contact/envelope.png";
import imgFax from "../images/contact/fax.png";
import imgPhone from "../images/contact/phone-call.png";
import YandexMaps from "../components/yandex-maps/yandex-maps";
import s from "../components/classes/contact.module.css";

class Contact extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData: null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../json/page-localization/contact-page-${this.context.lang}.json`)
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
                                {this.state.jsonData.contact}
                            </h1>

                            <div className={[s.contact__geo, f.font__H5low].join(" ")}>
                                <img className={s.contact__icon_geo} src={imgGeo} alt="geo"/>
                                <span className={f.font_black}>
                                    {this.state.jsonData.address}
                                </span>
                            </div>

                            <YandexMaps/>

                            <div className={[f.font_black, s.contact__details].join(" ")}>
                                
                                <div>
                                    <img className={s.contact__icon_phone} src={imgPhone} alt="phone"/>
                                    <span className={[f.font__H5low, f.fonts__lineheight_base].join(" ")}>
                                        {this.state.jsonData.phone}
                                    </span>
                                    <div className={s.contact__numbers}>
                                        <div>
                                            <div>
                                                {this.state.jsonData.federal}
                                            </div>
                                            <div>
                                                8 (800) 200-54-17 &nbsp;&nbsp; {this.state.jsonData.add}6646, 6633
                                            </div>
                                        </div>
                                        
                                        <div className={s.contact__details_margins}>
                                            <div>{this.state.jsonData.kursk}</div>
                                            <div>+7 (4712) 54-54-17</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={[s.contact__email, s.contact__numbers].join(" ")}>
                                    <div>

                                        <img className={s.contact__icon_envelope} src={imgEnvelope} alt="envelope"/>
                                        <span className={[f.font__H5low, f.fonts__lineheight_base].join(" ")}>
                                            {this.state.jsonData.email}
                                        </span>
                                        <div>
                                            <a className={f.font_black} href="mailto:LVDJ@sovtest-ate.com" target="_blank" rel="noreferrer">
                                                info@sovtest-ate.com
                                            </a>
                                        </div>

                                    </div>
                                    <div className={s.contact__details_margins}>
                                        
                                        <div>{this.state.jsonData.corporate}</div>
                                        <div>
                                            <a className={f.font_black} href="mailto:info@sovtest-ate.com" target="_blank" rel="noreferrer">
                                                info@sovtest-ate.com
                                            </a>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                <div>
                                    <img className={s.contact__icon_fax} src={imgFax} alt="fax"/>
                                    
                                    <span className={[f.font__H5low, f.fonts__lineheight_base].join(" ")}>
                                        {this.state.jsonData.fax}
                                    </span>

                                    <div>
                                        <a className={f.font_black} href="mailto:info@sovtest-ate.com" target="_blank" rel="noreferrer">
                                            8(4712)54-54-24
                                        </a>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className={s.contact__button}>
                                <ButtonRequest/>
                            </div>

                    </div>
                </Layout>
            );
        }
    }
}

Contact.contextType = LanguageContext;

export default Contact;