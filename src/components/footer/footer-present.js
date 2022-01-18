/** Props:
 * @param {array} srcData - импортированные данные из JSON
 */

import React from "react";
import s from "./footer.module.css";
import SubscribeForm from "../subscribe-form/subscribe-form";
import f from "../classes/fonts.module.css";

export default (props) => (
    <footer>
        <div className={[s.footer__container, f.font__H4low, f.font_footerLetterSpacing, f.font__montserratBold].join(" ")}>
            <div className={s.footer__links}>
                {props.srcData.contact}
                <div className={s.footer__contact}>
                    <a href="https://yandex.ru/maps/org/sovtest_ate/1697647460/?ll=36.162275%2C51.801700" target="_blank"  rel="noreferrer">
                        {props.srcData.address}
                    </a>
                    <a href="tel:84712545417">
                        {props.srcData.phone}
                    </a>
                    <a href="tel:84712545424">
                        {props.srcData.fax}
                    </a>
                    <a href="mailto:info@sovtest-ate.com">
                        {props.srcData.email}
                    </a>
                </div>
            </div>

            <div className={s.footer__projects}>
                {props.srcData.projects}
                    <div className={s.footer__linksBundle}>
                        <div className={s.footer__links}>
                            <a href="http://sovtest-ate.com" target="_blank" rel="noreferrer">
                                {props.srcData.project1}
                            </a>
                            <a href="http://kp-sovtest.ru" target="_blank" rel="noreferrer">
                                {props.srcData.project2}
                            </a>
                            <a href="http://holterlive.ru" target="_blank" rel="noreferrer">
                                {props.srcData.project3}
                            </a>
                            <a href="http://dg-store.ru" target="_blank" rel="noreferrer">
                                {props.srcData.project4}
                            </a>
                        </div>
                        <div className={s.footer__links}>
                            <a href="http://sovtest-ndt.ru" target="_blank" rel="noreferrer">
                                {props.srcData.project5}
                            </a>
                            <a href="http://cecd.ru" target="_blank" rel="noreferrer">
                                {props.srcData.project6}
                            </a>
                            <a href="http://цифровоймикроскоп.рф" target="_blank" rel="noreferrer">
                                {props.srcData.project7}
                            </a>
                            <a href="http://sovtestmicro.com" target="_blank" rel="noreferrer">
                                {props.srcData.project8}
                            </a>
                        </div>
                    </div>
                </div>
                <SubscribeForm/>
        </div>
    </footer>
)