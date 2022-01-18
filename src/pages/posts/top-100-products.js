import React from "react";
import PostTemplate from "../../components/post-template/post-template";
import i from "../../components/classes/images.module.css";
import imgSrc from "../../images/posts/top-100-products.png";

export default() => {
    const title = "Шкафы ЛВЖ «Совтест АТЕ» в числе «100 лучших товаров России»";
    const text = (
        <>
            <img style={{maxWidth: '300px'}} src={imgSrc} className={i.images__post_floatLeft} alt="top-100-products"/>

            <p>
                Всероссийский Конкурс Программы "100 лучших товаров России" проводится с 1998
                года и приобрел статус важнейшего общероссийского мероприятия, которое
                мотивирует на повышение качества товаров и конкурентосостоятельности
                предприятий в условиях современной рыночной экономики.
            </p>
            
            <p>
                Ежегодно в этом Конкурсе участвуют свыше 2000 видов продукции и услуг, а среди
                участников проекта - предприятия 70 субъектов РФ. В их числе <b>ООО Совтест АТЕ</b>,
                продукция которого уже несколько лет подряд входит в «золотую сотню» России.
                Пандемия короновируса повлияла на формат вручения наград Конкурса, очная церемония
                не проводилась, а дипломы были направлены по почте.
            </p>
            
            <p>
                По итогам 2020 года <b>шкафы для хранения легковоспламеняющихся жидкостей (ЛВЖ) </b>
                производства «Совтест АТЕ» были удостоены звания лауреата конкурса «100 лучших товаров России».
            </p>

            <p>
                В 2017 году шкафы ЛВЖ компании «Совтест АТЕ» уже входили в каталог «100 лучших товаров России».
            </p>

            <p>
                Повторно подтвердив свой высокий статус на Конкурсе, предприятие «Совтест АТЕ»
                получило право использовать логотип Программы «100 лучших товаров России»
                на документации и на самих шкафах ЛВЖ.
            </p>
        </>
    );

    return (
        <PostTemplate title={title} text={text}/>
    );
};