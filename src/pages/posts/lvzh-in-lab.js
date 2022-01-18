import React from "react";
import PostTemplate from "../../components/post-template/post-template";
import i from "../../components/classes/images.module.css";
import imgSrc from "../../images/posts/lvzh-in-lab-TITLE.jpg";
import imgSrc2 from "../../images/posts/lvzh-in-lab-1.jpg";

export default() => {
    const title = "Правильное хранение ЛВЖ в лабораториях.";
    const text = (
        <>
            <p>
                Самые распространенные ЛВЖ в лабораториях — это органические растворители.
                Они легко воспламеняются, быстро горят и с трудом тушатся.
            </p>

            <p>
                Пары низкокипящих органических растворителей (например, диэтилового эфира
                или сероуглерода) способны опускаться вниз и «растекаться» по горизонтальным
                поверхностям, например, по поверхности рабочего стола. При этом взрывоопасные
                концентрации неожиданно для экспериментатора создаются сравнительно далеко
                — на расстоянии до 3–5 м от места работы с ЛВЖ.
            </p>

            <div style={{textAlign: 'center'}}>
                <img className={i.images__scalable} src={imgSrc} alt="lvzh-in-lab-TITLE"/>
            </div>

            <p>
                Бутыли с ЛВЖ, снабжённые большими этикетками с названиями,  и горючие вещества,
                к которым относятся практически все органические растворители, а также многие
                неорганические реактивы, хранятся в специальных металлических шкафах. В случае
                пожара в лаборатории такие шкафы в течение определенного времени поддерживают
                внутри безопасную температуру.
            </p>

            <p>
                Эти шкафы, в свою очередь, размещаются вдали от источников тепла (отопительных
                приборов, прямых лучей солнца) и окислителей (хлоратов, нитратов, азотной кислоты,
                перекисей, перманганатов).
            </p>

            <div style={{textAlign: 'center'}}>
                <img className={i.images__scalable} src={imgSrc2} alt="lvzh-in-lab-TITLE"/>
            </div>

            <p>
                Шкафы делают из сварной стали. Пространство между двумя камерами (внешней и
                внутренней) для огнестойкости заполняют специальным изоляционным слоем.
                В случае пожара шкафы поддерживают внутри безопасную температуру в течение
                30 или 90 минут, защищая лабораторию от взрыва. Шкафы для ЛВЖ нужно
                подключать к вентиляции, для этого в противоположных стенках шкафа
                предусмотрены отверстия с пламегасителями.
            </p>

            <p>
                Нижняя полка шкафа должна быть сделана в виде поддона с высокими бортиками,
                чтобы в случае разлива растворителя, он оставался внутри шкафа.
            </p>

            <p>
                Компания «Совтест АТЕ» предлагает надежные шкафы для хранения ЛВЖ объемом
                от 123л до 854л которые можно разместить как в самых скромных по размеру
                лабораториях, так и в больших практикумах, где требуется значительный
                расход реактивов для ежедневной работы.
            </p>
        </>
    );

    return (
        <PostTemplate title={title} text={text}/>
    );
};