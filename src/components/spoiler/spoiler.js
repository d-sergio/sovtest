/** Спойлер
 * 
 *  Props:
 *  @param {string} title - заголовок спойлера
 *  @param {node} close - иконка закрытия
 *  @param {node} open - иконка открытия
 *  @param {node} body - основное содержимое спойлера
 *  @param {boolean} isOpen - первоначальное состояние спойлера:
 *  true - раскрыт, false - закрыт (по умолчанию true)
 *  @param {number} duration - время анимации раскрытия/закрытия спойлера
 *  в мс (300 по умолчанию)
 * 
 *  Methods:
 *  @method correctHeight() - нужен для адаптивности в ситуациях, когда из-за
 *  фиксированного height увеличение размера окна ведёт к росту пустого пространства
 *  вокруг содержимого спойлера.
 */

import React from "react";
import s from "./spoiler.module.css";
import {Animation, spoilerDraw, invertedSpoilerDraw, changeStyleProperty} from "../others/animate";

class Spoiler extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: true
        };

        this.animateMove = this.animateMove.bind(this);
        this.toggleSpoiler = this.toggleSpoiler.bind(this);
        this.correctHeight = this.correctHeight.bind(this);

        this.body = React.createRef();
        this.animate = undefined;
    }

    componentDidMount() {
        try{
            const body = this.body.current;
            if (this.props.isOpen == false) {
                this.setState({isOpen: false});
            }

            if (this.props.isOpen){
                body.style.height = body.scrollHeight + 'px';
            } else {
                body.style.height = '0px';
            }
        } catch(e) {
            console.log('Spoiler Ошибка componentDidMount(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }

        window.addEventListener('resize', this.correctHeight);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.correctHeight);
    }

    correctHeight(){
        try{
            if(this.body.current !== null) {
                if (this.state.isOpen) {
                    const body = this.body.current;
                    let bodyHeight = 0;
                    
                    for (let i of body.children) {
                        let itemComputedStyle = window.getComputedStyle(i);

                        let margins = parseInt(itemComputedStyle.marginTop)
                                    + parseInt(itemComputedStyle.marginBottom);

                        bodyHeight += i.scrollHeight + margins;
                    }

                    body.style.height = bodyHeight + 'px';
                }
            } else {
                console.log(`Spoiler. correctHeight() остановлен. this.body.current is ${this.body.current}`);
            }
        } catch(e) {
            console.log('Spoiler Ошибка correctHeight(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    animateMove(){
        if (this.animate) {
            this.animate.cancel();
        }

        try{
            if(this.body.current !== null) {
                let body = this.body.current;
                const duration = this.props.duration;
                let timing;
                let startHeight;
                let finalHeight;

                if (this.state.isOpen) {
                    timing = invertedSpoilerDraw;
                    startHeight = parseFloat(window.getComputedStyle(body).height);
                    finalHeight = 0;
                } else {
                    timing = spoilerDraw;
                    startHeight = parseFloat(window.getComputedStyle(body).height);
                    finalHeight = body.scrollHeight;
                }

                const animationProps = {
                    timing: timing,
                    duration: duration,
                    draw: changeStyleProperty,
                    element: body,
                    property: 'height',
                    startValue: startHeight,
                    finalValue: finalHeight,
                    units: 'px'
                }

                this.animate = new Animation();
                this.animate.set(animationProps);
                this.animate.start();
                this.toggleSpoiler();
            } else {
                console.log(`Spoiler. animateMove() остановлен. this.body.current is ${this.body.current}`);
            }
        } catch(e) {
            console.log('Spoiler Ошибка animateMove(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    toggleSpoiler(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let icon = this.props.close;

        if (this.state.isOpen){
            icon = this.props.open;
        }

        return(
            <div className={s.spoiler__container}>
                <div className={s.spoiler__title} onClick={this.animateMove}>
                    {this.props.title}
                    <div className={s.spoiler__icon}>{icon}</div>
                </div>
                <div ref={this.body} className={s.spoiler__body}>{this.props.body}</div>
            </div>
        )
    }
}

Spoiler.defaultProps = {
    isOpen: true,
    duration: 300
}

export default Spoiler;