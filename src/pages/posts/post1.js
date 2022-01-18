import React from "react";
import Layout from "../../components/layout/layout";
import Slider from "../../components/slider/slider";
import MakeListFor from "../../components/make-list-for/make-list-for";
import CardPhoto from "../../components/cards/card-photo/card-photo";
import {ArrowLeftSpace, ArrowRightSpace} from "../../components/arrows/arrows";
import imgTitle from "../../images/publication/aurelien-romain-DB_q6rPFnBM-unsplash.png";
import gallery from "./post1.json";
import mc from "../../components/classes/main-containers.module.css";
import i from "../../components/classes/images.module.css";
import f from "../../components/classes/fonts.module.css";

export default() => {
  const visible = {
      0: 1,
      768: 2,
      1024: 3
  }

  const sliderProps = {
    prev: <ArrowLeftSpace/>,
    next: <ArrowRightSpace/>,
    space: 10,
    visible: visible
  };

  return(
      <Layout>
        <div className={mc.main__container}>
          <h1 className={[f.font_marginH3, f.font__H3up, f.font_uppercase].join(" ")}>Уникальная технология производства S-SAFE 90.1950.1300</h1>
          <img src={imgTitle} alt="Title photo" className={i.images__scalable}/>
          <div className={[f.font_black, f.fonts__lineheight_base].join(" ")}>
              <p className={[f.font__montserratBold, f.font_marginNews].join(" ")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
                ultrices gravida. Risus commodo viverra maecenas accumsan lacus
                vel
              </p>
              <p className={f.font_marginNews}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
              </p>
              <p className={f.font_marginNews}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                gravida. Risus commodo viverra maecenas accumsan lacus vel
                facilisis.
              </p>
              <p className={f.font_marginNews}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum suspendisse
                ultrices gravida. Risus commodo viverra maecenas accumsan
                lacusvel facilisis.
              </p>
          </div>
          <div className={[f.font__montserratBold, f.font_textRight, f.font_black, f.font_marginNews, f.fonts__lineheight_base].join(" ")}>
            <p>Подпись автора</p>
            <p>дата</p>
          </div>
        </div>
        <div style={{marginTop: '50px'}} className={mc.main__container_gallery}>
            <MakeListFor src={gallery} handler={<CardPhoto/>}>
                <Slider sliderProps={sliderProps}/>
            </MakeListFor>
        </div>
      </Layout>
    )
}