/**Шаблон страницы продукта
 * 
 * Props:
 *  @param {Object} info - объект, содержащий следующие поля
 *      @param {String, node} name - название модели
 *      @param {Array} photos - массив изображений <img>. Изображения выводятся в том же порядке в котором
 *      они идут в массиве
 *      @param {String, Number, node} volume - объём шкафа
 *      @param {String, Number, node} shelves - количество полок
 *      @param {String, Number, node} size - размеры
 *      @param {String, node} description - описание
 *      @param {node} specifications - основные характеристики. Должны быть получены в виде списка <li>,
 *      но без обёртки <ul>. Список будет встроен в <ul> компонентом.
 * 
 */

import React from "react";
import Layout from "../layout/layout";
import SlidesViewer from "../slides-viewer/slides-viewer";
import ButtonGreenDetails from "../buttons/button-green-details/button-green-details";
import ButtonYellowDetails from "../buttons/button-yellow-details/button-yellow-details";
import {ArrowDown, ArrowUp} from "../arrows/arrows";
import BlockCatalog from "../blocks/block-catalog/block-catalog";
import Spoiler from "../spoiler/spoiler";
import BlockAlso from "../blocks/block-also/block-also";
import mc from "../classes/main-containers.module.css";
import s from "./product-template.module.css";
import o from "../classes/slider-outer.module.css";
import f from "../classes/fonts.module.css";

export default (props) => {
    //Описание (заголовок)
    const descriptionTitle = <p className={f.font__H3low}><span className={f.font__H2low}>О</span>ПИСАНИЕ</p>;

    //Описание (сам текст)
    const descriptionBody = (
        <div className={[s.product__descText, f.fonts__lineheight_base].join(" ")}>
            {props.info.description}
        </div>
    );
    
    //Основные характеристики (заголовок)
    const specificationsTitle = (
        <p className={f.font__H3low}><span className={f.font__H2low}>О</span>СНОВНЫЕ ХАРАКТЕРИСТИКИ</p>
    );
    
    //Основные характеристики (сам текст)
    const specificationsBody = (
        <ul className={s.font__specifications}>
            {props.info.specifications}
        </ul>
    );

    //Пока отключено
    const recommendation = (
        <div className={s.product__colors}>
            <p className={[f.font__H5up, f.font_uppercase].join(" ")}>
                Рекомендации по выбору цвета:
            </p>
            <ul className={f.fonts__lineheight_base}>
                <li className={[f.font__lowH, f.font_uppercase].join(" ")}>
                    <span style={{color: '#ffcb00'}}>
                        Желтый цвет
                    </span> — легковоспламеняющиеся жидкости.
                </li>
                <li className={[f.font__lowH, f.font_uppercase].join(" ")}>
                    <span style={{color: '#ff0000'}}>
                        Красный цвет
                    </span> — горючие материалы.
                </li>
                <li className={[f.font__lowH, f.font_uppercase].join(" ")}>
                    <span style={{color: '#000fa0'}}>
                        Синий цвет
                    </span> — кислоты и токсичные вещества.
                </li>
            </ul>
        </div>
    );
    
    return (
        <Layout>
            <div className={mc.main__container}>

                <div className={f.font__H2low}>
                    {props.info.name}
                </div>

                <SlidesViewer>
                    {props.info.photos}
                </SlidesViewer>

                <div className={s.product__main}>

                    <ul className={s.product__sizes}>
                        <li className={f.font__H4_geometry}>
                            <span className={[f.font__montserratBold, f.font_uppercase].join(" ")}>
                                Объём
                            </span> - {props.info.volume}
                        </li>
                        <li className={f.font__H4_geometry}>
                            <span className={[f.font__montserratBold, f.font_uppercase].join(" ")}>
                                Количество полок
                            </span> - {props.info.shelves}
                        </li>
                        <li className={f.font__H4_geometry}>
                            <span className={[f.font__montserratBold, f.font_uppercase].join(" ")}>
                                Размер
                            </span> - {props.info.size}
                        </li>
                    </ul>

                    <div className={s.product__buttons}>
                        <ButtonGreenDetails/>
                        <ButtonYellowDetails/>
                    </div>

                </div>

                <div className={s.product__description}>
                    <Spoiler title={descriptionTitle} body={descriptionBody} open={<ArrowDown/>} close={<ArrowUp/>} isOpen={true}/>
                </div>

                <div className={s.product__specifications}>
                    <Spoiler title={specificationsTitle} body={specificationsBody} open={<ArrowDown/>} close={<ArrowUp/>} isOpen={true}/>
                </div>

                {/*recommendation*/}
                
                <div className={s.product__also}>
                    <p className={[f.font__H4up, f.font__montserratBold, f.font_uppercase].join(" ")}>
                        Вас также могут заинтересовать
                    </p>
                </div>

                <div className={s.product__catalog}>
                    <p className={[f.font__H4up, f.font_uppercase].join(" ")}>Каталог</p>
                        <BlockCatalog/>
                </div>

            </div>

            <div className={[s.product__gallery, o.slider__outer].join(" ")}>
                <BlockAlso/>
            </div>

        </Layout>
    );
}