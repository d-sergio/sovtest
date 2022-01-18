import React from "react";
import ButtonWellcome from "../../buttons/button-wellcome/button-wellcome";
import s from "./block-wellcome.module.css";
import mc from "../../classes/main-containers.module.css";
import f from "../../classes/fonts.module.css";

export default () => (
        <div className={s.wellcometo__container}>
            <div className={mc.main__container}>
                <div className={s.wellcometo__teamContainer}>
                    <p className={[s.wellcometo__team, f.font_uppercase, s.font__wellcome_team].join(" ")}>
                        Приглашаем <span className={f.font__montserratBold}>в команду<br/>дистрибьюторов</span><br/> по всему миру
                    </p>
                </div>
                <div className={s.wellcometo__button_mobile}>
                     <ButtonWellcome>
                        <p className={[f.font__H5low, f.font_uppercase].join(" ")}>
                            Присоединиться
                        </p>
                    </ButtonWellcome>
                </div>
                <p className={[s.wellcometo__enterprises, f.font_uppercase, f.font_yellow, s.font__wellcome_team].join(" ")}>
                    С нами уже более<br/>
                    <span className={s.font__wellcome_number}>160</span>
                    <span className={f.font__montserratBold}> ведущих мировых </span><br/>
                    предприятий
                </p>
                <div className={s.wellcometo__button}>
                    <ButtonWellcome/>
                </div>
            </div>
        </div>
)