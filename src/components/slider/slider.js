/** Адаптивный слайдер
 * 
 *   Особенности:
 *   -Ширина адаптируется под родителя
 *   -Высота адаптируется под контент
 *   -Каждый слайд автоматически помещается в <div> (является inline-flex)
 *   одинаковой
 *   ширины (элементы frame в методе render). Слайд размещается по центру
 *   горизонтальной оси <div>
 *
 *
 *   Props:
 *   @param {Object} sliderProps - объект со следующими полями:
 *       visible может иметь значения:
 *          1. @param {Number} visible - количество одновременно видимых слайдов
 *          (1 по умолчанию).
 *          2. @param {Number} visible === 0 устанавливает автоматическое определение
 *          количества видимых слайдов на основе их размеров. Авто-visible работает
 *          только со слайдами фиксированной ширины.
 *          3. @param {Object} visible - например:
 * 
 *              {
 *                  0: 1,
 *                  768: 2,
 *                  1024: 3,
 *                  ...
 *              }
 * 
 *          Что значит:
 *              один слайд при размере окна от 0px, 
 *              два слайда при размере окна от 768px,
 *              три слайда при размере окна от 1024px
 * 
 *          Значение для 0px желательно указывать всегда.
 * 
 *       @param {Node} prev - вид кнопки для прокрутки назад
 *       @param {Node} next - вид кнопки для прокрутки вперёд
 *       @param {Node} children - слайды
 *       @param {Number} duration - длительность анимации для управления стрелками
 *       и клавиатурой в мс (500 по умолчанию)
 *       @param {Number} treshold - значение от 0 до 1, указывающее, что слайд
 *       показавшийся больше, чем на treshold будет автоматически вытянут до конца
 *       (0.2 по умолчанию)
 *       @param {Number} friction - коэффициент трения для ленты слайдов. Чем больше
 *       значение, тем быстрее карусель остановится при быстром прокручивании мышью
 *       или свайпами (5 по умолчанию)
 *       @param {Number} disableScrollingOn - для touch-событий. Если пользователь
 *       сдвинул карусель больше, чем на указанное количество пикселей, то
 *       вертикальная прокрутка страницы блокируется (10 по умолчанию). Можно
 *       отключить, указав false/undefined/null.
 *       @param {Number} initPosition - начальная позиция слайдера (0 по умолчанию).
 *       @param {Function} callback - необязательный колбэк, который получает
 *       текущую позицию слайдера
 *
 *   Свойства анимации:
 *      @param {Object} this.animate - хранит объект анимации. Разные методы должны
 *      иметь возможность останавливать текущую анимацию, поэтому он доступен всем.
 * 
 *      @param {Number} this.animDuration - время анимации. Доступно всем методам,
 *      так как может отличаться в зависимости от способа управления слайдером:
 *      - фиксированное значение для стрелок и клавиатуры (берётся из пропсов)
 *      - вычисляемое значение из скорости пролистывания мышью или свайпом
 *      Значение 0 указывает, что анимация вызываться не будет.
 *
 *   Refs:
 *       @param {Node} this.viewport - окно просмотра
 *       @param {Node} this.carousel - лента слайдов
 *
 *
 *   Навигация по методам:
 *   @method render() - каждый элемент из children заворачивается в <div>. Для
 *   каждого <div> будет вычислена (см. ниже) ширина для адаптации под окно
 *   слайдера (реф viewport).
 *    
 *   @method animateMove() - анимация прокрутки слайдера, если this.animDuration > 0
 * 
 *   @method update() - срабатывает при изменении размера окна (для адаптации),
 *   а также вызывает следующие методы при каждом рендере:
 *       @method updateSlideWidth() - адаптирует слайды под viewport:
 *       ширина слайда = (ширина viewport) / visible
 *       @method updateCarouselCoords() - при каждом рендере корректирует позицию
 *       ленты элементов в соответствии с текущими размерами элементов и текущей
 *       позицией слайдера
 *
 *   @method checkBounds() - если visible задан как {Object} или равен 0, то,
 *   если прокрутить слайдер до конца, а затем растянуть окно так, чтобы число
 *   одновременно видимых слайдов увеличилось, то последний слайд может съехать
 *   влево, оставив после себя пустое пространство:
 * 
 *   visible === 2
 * 
 *   ____Слайдер____
 *   [слайд] [слайд]
 * 
 *   Растягиваем окно и теперь visible === 3. Справа видим незаполненное слайдами
 *   пространство
 * 
 *   __________Слайдер__________
 *   [слайд] [слайд] ...пусто...
 * 
 *   Данный метод исправляет это при необходимости.
 *
 *   @method getVisible() - вернёт число одновременно видимых слайдов способом,
 *   зависящим от того, как был указан проп visible (см. выше описание Props)
 * 
 *   @method getAutoVisible() - автоматический расчёт числа одновременно видимых
 *   слайдов, если visible == 0. На основе ширины первого слайда.
 * 
 *   @method getVisibleFromObject() - вернёт число одновременно видимых слайдов,
 *   соответствующее текущему размеру окна
 *
 *   @method setNewPosition() - меняет позицию слайдера в состоянии компонента
 * 
 *   @method touchHandler() - обработчик событий touch
 * 
 *   @method mouseHandler() - обработчик событий мыши
 * 
 *   @method arrowsHandler() - обработчик событий для стрелок влево и вправо
 * 
 *   @method onFocus() - начинает обработку событий клавиатуры
 * 
 *   @method onBlur() - завершает обработку событий клавиатуры
 * 
 *   @method onKeyDown() - обработка событий клавиатуры
 * 
 *   @method calcInertialMotion() - рассчёт движения карусели по инерции при
 *   пролистывании мышью или свайпами
 *
 */

import React from "react";
import s from "./slider.module.css";
import sliderTouchHandler from "./touch-events-for-sliders";
import sliderMouseHandler from "./mouse-events-for-sliders";
import searchInertialPosition from "./search-inertial-position";
import createAnimation from "./create-animation";
 
class Slider extends React.Component{
        constructor(props){
            super(props);

            //Принимаемые параметры по умолчанию
            const defaults = {
                visible: 1,
                prev: null,
                next: null,
                duration: 500,
                treshold: 0.2,
                friction: 5,
                disableScrollingOn: 10,
                initPosition: 0,
                callback: undefined
            }

            this.params = Object.assign({}, defaults, this.props.sliderProps);

            this.state = {
                currentPosition: 0
            };

            this.carousel = React.createRef();
            this.viewport = React.createRef();

            this.animateMove = this.animateMove.bind(this);
            this.update = this.update.bind(this);
            this.checkBounds = this.checkBounds.bind(this);
            this.updateSlideWidth = this.updateSlideWidth.bind(this);
            this.updateCarouselCoords = this.updateCarouselCoords.bind(this);            
            this.setNewPosition = this.setNewPosition.bind(this);
            this.getVisible = this.getVisible.bind(this);
            this.getAutoVisible = this.getAutoVisible.bind(this);
            this.getVisibleFromObject = this.getVisibleFromObject.bind(this);
            this.touchHandler = this.touchHandler.bind(this);
            this.mouseHandler = this.mouseHandler.bind(this);
            this.arrowsHandler = this.arrowsHandler.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.onFocus = this.onFocus.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.calcInertialMotion = this.calcInertialMotion.bind(this);

            this.animate = undefined;
            this.animDuration = 0;
        }
 
    componentDidMount(){
        this.update();

        window.addEventListener('resize', this.update);

        if (typeof(this.params.visible) === 'object' || this.params.visible === 0) {
            window.addEventListener('resize', this.checkBounds);
        }
        
        this.setNewPosition(this.params.initPosition);
    }
 
    /**Почему анимация вызывается именно отсюда.
     * Это позволяет методу animateMove всегда осуществлять непрерывную анимацию
     * перехода к текущей позиции без резких прыжков между слайдами. При этом нет
     * необходимости запоминать множество всех действий пользователя с элементами
     * управления слайдером, которые могли произойти до изменения состояния
     * (например, пользователь несколько раз быстро нажал кнопку вправо).
     * Анимация всегда плавно завершится на нужном слайде.
     */
    componentDidUpdate(prevProps, prevState){
        if (this.animDuration > 0) {    //есть анимация
            this.animateMove(prevState);
        //} else if (prevProps.sliderProps.visible !== this.params.visible) {
            /*На всякий случай, если пропсы изменятся*/
            //this.update();
            //this.checkBounds();
        } else {
            this.update();
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.update);

        if (typeof(this.params.visible) === 'object' || this.params.visible === 0) {
            window.removeEventListener('resize', this.checkBounds);
        }
    }

    checkBounds(){
        const visible = this.getVisible();
        const carouselLength = React.Children.toArray(this.props.children).length;

        //корректировка не требуется, если число карточек не превышает ширину слайдера
        if (carouselLength < visible) {
            return;
        }

        if (this.state.currentPosition > (carouselLength - visible) ) {
            this.animDuration = 0;  //без анимации

            this.setState({
                currentPosition: (carouselLength - visible)
            });
        }
    }
    
    update(){
        //прервём анимацию, если она активна в момент изменения размера окна
        if (this.animate) {
            this.animate.cancel();
        }

        this.updateSlideWidth();
        this.updateCarouselCoords();
    }

    updateSlideWidth(){
        try{
            if (this.viewport.current !== null && this.carousel.current !== null) {
                
                const visible = this.getVisible();
                const viewportWidth = this.viewport.current.offsetWidth;

                const slideWidth = viewportWidth/visible;

                for (let i of this.carousel.current.children){
                    i.style.width = slideWidth + 'px';
                }
            } else {
                console.log(`Slider. updateSlideWidth() остановлен. Refs: this.viewport.current is ${this.viewport.current}, this.carousel.current is ${this.carousel.current}.`);
            }
        } catch(e) {
            console.log('Slider Ошибка updateSlideWidth(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    getVisible() {
        if (this.params.visible === 0) { //режим автоматического расчёта числа видимых слайдов

            return this.getAutoVisible();

        } else if (typeof(this.params.visible) === 'object') {

            return this.getVisibleFromObject();
            
        }

        return Number(this.params.visible);
    }

    getAutoVisible() {
        try{
            if (this.viewport.current !== null && this.carousel.current !== null){    

                const viewportWidth = this.viewport.current.offsetWidth;
                
                //Берём ширину вложенного содержимого, а не обёртки frame
                const slideWidth = this.carousel.current.children[0].firstChild.offsetWidth;
                
                return Math.floor(viewportWidth/slideWidth);
            } else {
                console.log(`Slider. getAutoVisible() остановлен. refs: this.viewport.current is ${this.viewport.current}, this.carousel.current is ${this.carousel.current}`);
            }

        } catch(e) {
            console.log('Slider Ошибка getAutoVisible(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    getVisibleFromObject() {
        const mutations = Object.entries(this.params.visible);
        const screen = window.innerWidth;

        for ( let i = mutations.length - 1; i >= 0; i-- ) {
            let [screenSize, visible] = mutations[i];

            if ( screen >= screenSize ) {
                return visible;
            }
        }
    }

    updateCarouselCoords(){
        try{
            if (this.carousel.current !== null){

                const carouselMarginLeft = -this.carousel.current.children[0].offsetWidth * this.state.currentPosition;

                this.carousel.current.style.marginLeft = carouselMarginLeft + 'px';
            } else {
                console.log(`Slider. updateCarouselCoords() остановлен. refs: this.carousel.current is ${this.carousel.current}.`);
            }
        } catch(e) {
            console.log('Slider Ошибка updateCarouselCoords(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    setNewPosition(newPosition){
        const visible = this.getVisible();
        const carouselLength = React.Children.toArray(this.props.children).length;

        /* Если текущее число карточек меньше ширины слайдера, то они просто
        располагаются от края окна просмотра слайдера. То же самое в случае ошибки,
        когда newPosition < 0*/
        if (newPosition < 0 || carouselLength <= visible) {
            newPosition = 0;
        } else

        /* Если текущее число карточек больше ширины слайдера - позиция
        вычисляется так, чтобы слайды заполняли всю ширину слайдера */
        if (carouselLength > visible && newPosition > (carouselLength - visible)){
            newPosition = carouselLength - visible;
        }

        this.setState({currentPosition: newPosition});
    }

    arrowsHandler(shift){
        this.animDuration = this.params.duration;

        const newPosition = this.state.currentPosition + shift;
        const visible = this.getVisible();
        const carouselLength = React.Children.toArray(this.props.children).length;

        //зацикливаем карусель
        if (newPosition < 0) {
            this.setNewPosition(carouselLength - visible); 
        } else if (newPosition > carouselLength - visible) {
            this.setNewPosition(0);
        } else {
            this.setNewPosition(newPosition);
        }
    }

    onFocus(){
        window.addEventListener('keydown', this.onKeyDown);
    }

    onBlur(){
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e){
        const shiftPrev = -1;
        const shiftNext = 1;

        if (e.code == 'ArrowLeft') {
            this.arrowsHandler(shiftPrev);
        } else if (e.code == 'ArrowRight') {
            this.arrowsHandler(shiftNext);
        } else {
            return;
        }
    }

    touchHandler(e){
        const visible = this.getVisible();
        const carouselLength = React.Children.toArray(this.props.children).length;

        /*листать карусель есть смысл только, если число слайдов превышает ширину
        слайдера */
        if (carouselLength < visible) {
            return;
        }

        if (this.animate) {
            this.animate.cancel();
        }

        const touchHandlerProperties = {
            carousel: this.carousel.current,
            viewport: this.viewport.current,
            callback: this.calcInertialMotion,
            disableScrollingOn: this.params.disableScrollingOn,
            event: e
        }
        
        if (this.carousel.current !== null && this.viewport.current !== null){
            sliderTouchHandler(touchHandlerProperties);
        } else {
            console.log(`Slider. touchHandler(): sliderTouchHandler() не будет выполнен. refs: this.viewport.current is ${this.viewport.current}, this.carousel.current is ${this.carousel.current}`);
        }
    }

    mouseHandler(e){
        const visible = this.getVisible();
        const carouselLength = React.Children.toArray(this.props.children).length;

        /*листать карусель есть смысл только, если число слайдов превышает ширину
        слайдера */
        if (carouselLength < visible) {
            return;
        }

        if (this.animate) {
            this.animate.cancel();
        }

        const mouseHandlerProperties = {
            carousel: this.carousel.current,
            viewport: this.viewport.current,
            callback: this.calcInertialMotion,
            event: e
        }
        
        if (this.carousel.current !== null && this.viewport.current !== null){
            sliderMouseHandler(mouseHandlerProperties);
        } else {
            console.log(`Slider. mouseHandler(): sliderMouseHandler() не будет выполнен. refs: this.viewport.current is ${this.viewport.current}, this.carousel.current is ${this.carousel.current}`);
        }
    }

    calcInertialMotion(speed) {
        const inertialParams = {
            speed: speed,
            friction: this.params.friction,
            treshold: this.params.treshold,
            duration: this.params.duration,
            carousel: this.carousel.current,
            viewport: this.viewport.current,
            currentPosition: this.state.currentPosition
        };

        //получить новую позицию и время анимации
        const newPosition = searchInertialPosition(inertialParams);

        this.animDuration = newPosition.animDuration;

        this.setNewPosition(newPosition.newPosition);
    }

    animateMove(prevState) {
        if (this.animate) {
            this.animate.cancel();
        }

        /**Если слайдеру передан callback, то после завершения анимации ему
         * передаётся текущая позиция. До завершения анимации этого делать
         * не следует, так как родительский компонент может вызывать повторный
         * рендер слайдера из-за коллбэка, что в свою очередь прервёт анимацию.
         */

        const callBackIsDefined = (this.params.callback !== undefined
            && this.params.callback !== null
            && prevState.currentPosition !== this.state.currentPosition);

        const animationProps = {
            currentPosition: this.state.currentPosition,
            carousel: this.carousel.current,
            animDuration: this.animDuration,
            callback: callBackIsDefined
                        ? () => this.params.callback(this.state.currentPosition)
                        : undefined
        };

        this.animate = createAnimation(animationProps);
        this.animate.start();

        this.animDuration = 0;  //Сброс. Без анимации
    }

    render(){
        const shiftPrev = -1;
        const shiftNext = 1;
        const carouselElements = [];
        const carouselLength = React.Children.toArray(this.props.children).length;

        for (let i = 0; i < carouselLength; i++) {
            let frame =
                <div className={s.slider__frame}>
                    {React.Children.toArray(this.props.children)[i]}
                </div>;
            carouselElements.push(frame);
        }
        
        return(
            <div className={s.slider__container}>
                <div className={s.slider__prev} onClick={this.arrowsHandler.bind(this, shiftPrev)}>{this.params.prev}</div>
                    <div className={s.slider__viewport} ref={this.viewport}>

                        {/*<div tabIndex='1' className={s.slider__feed} ref={this.carousel}
                        onTouchStart={(e) => this.touchHandler(e)}
                        onMouseDown={(e) => this.mouseHandler(e)}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}>
                            {carouselElements}
                        </div>*/}

                        <div tabIndex='1' className={s.slider__feed} ref={this.carousel}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}>
                            {carouselElements}
                        </div>

                    </div>
                <div className={s.slider__next} onClick={this.arrowsHandler.bind(this, shiftNext)}>{this.params.next}</div>
            </div>
        );
    }
}

export default Slider;