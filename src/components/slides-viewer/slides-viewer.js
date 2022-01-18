/** Слайдер с нижней лентой миниатюр
 * 
 * Props:
 * все слайды получает из children
 * @param {number} thumbnailsOpacity - прозрачность неактивных миниатюр в ленте (0.5 по умолчанию)
 * @param {number} animationDuration - анимации смены слайда в мс (300 по умолчанию)
 * 
 * 
 * Механика слайдера:
 * 
 * Refs:
 * this.viewport - окно просмотра слайда
 * this.feed - лента миниатюр
 * 
 * Methods:
 * @method setThumbnailsWidth() - задаёт ширину миниатюр
 * @method setNewPosition() - анимированный переход на новую позицию
 * @method setThumbnailsOpacity() - устанавливает прозрачность неактивных миниатюр в ленте
 */

import React from "react";
import s from "./slides-viewer.module.css";
import {animate, linear, invertedLinear, changeStyleProperty} from "../others/animate";
import {simpleTouchHandler} from "./simple-touch-handler";

class SlidesViewer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentPosition: 0,
            childrenArray: React.Children.toArray(this.props.children),
            feedLength: React.Children.toArray(this.props.children).length
        }

        this.setThumbnailsWidth = this.setThumbnailsWidth.bind(this);
        this.setNewPosition = this.setNewPosition.bind(this);
        this.setThumbnailsOpacity = this.setThumbnailsOpacity.bind(this);
        this.startAnimation = this.startAnimation.bind(this);

        this.viewport = React.createRef();
        this.feed = React.createRef();
    }

    componentDidMount(){
        this.setThumbnailsWidth();
        this.setThumbnailsOpacity();
        window.addEventListener('resize', this.setThumbnailsWidth);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.setThumbnailsWidth);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentPosition !== prevState.currentPosition){
            this.startAnimation(prevState);
        }
    }

    startAnimation(prevState) {
        try{
            if (this.feed.current !== null){
                const inactiveSlideOpacity = 0;
                const activeSlideOpacity = 1;
                const inactiveThumbOpacity = this.props.thumbnailsOpacity;
                const activeThumbOpacity = 1;
                const unselectThumbnail = this.feed.current.children[prevState.currentPosition];
                const selectThumbnail = this.feed.current.children[this.state.currentPosition];
                const duration = this.props.duration;

                animate(linear, duration, changeStyleProperty, this.viewport.current, 'opacity', inactiveSlideOpacity, activeSlideOpacity);
            
                animate(invertedLinear, duration, changeStyleProperty, unselectThumbnail, 'opacity', activeThumbOpacity, inactiveThumbOpacity);

                animate(linear, duration, changeStyleProperty, selectThumbnail, 'opacity', inactiveThumbOpacity, activeThumbOpacity);
            } else {
                console.log(`SlidesViewer. startAnimation() остановлен. this.feed.current is ${this.feed.current}`);
            }
        } catch(e) {
            console.log('SlidesViewer Ошибка startAnimation(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    setThumbnailsWidth(){
        try{
            if (this.feed.current !== null && this.viewport.current !== null){
                const viewportWidth = this.viewport.current.offsetWidth;
                const feed = this.feed.current;
                //const feedLength = this.state.feedLength;
                const feedLength = 6;

                for (let i of feed.children){
                    let slideWidth = viewportWidth/feedLength;

                    i.style.width = slideWidth + 'px';
                }
            } else {
                console.log(`SlidesViewer. setThumbnailsWidth() остановлен. this.feed.current is ${this.feed.current}, this.viewport.current is ${this.viewport.current}`);
            }
        } catch(e) {
            console.log('SlidesViewer Ошибка setThumbnailsWidth(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    setThumbnailsOpacity(){
        try{
            if (this.feed.current !== null){
                for (let i of this.feed.current.children) {
                    if (i.getAttribute('id') == this.state.currentPosition) continue;

                    i.style.opacity = this.props.thumbnailsOpacity;
                }
            } else {
                console.log(`SlidesViewer. setThumbnailsOpacity() остановлен. this.feed.current is ${this.feed.current}`);
            }
        } catch(e) {
            console.log('SlidesViewer Ошибка setThumbnailsOpacity(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    setNewPosition(id, e){
        if (this.state.currentPosition == id) {
            return;
        } else if (id < 0) {
            id = 0;
        } else if (id > this.state.feedLength - 1) {
            id = this.state.feedLength - 1;
        }

        this.setState({ currentPosition: id })
    }

    render(){
        const currentPosition = this.state.currentPosition;
        const childrenArray = this.state.childrenArray;
        const currentElem = childrenArray[currentPosition];
        const step = 1;

        const feedElements = [];

        for (let i = 0; i < this.state.feedLength; i++) {
            let id = i;
            let addElement =
                <div id={id} className={s.sViewer__slide} onClick={(e) => this.setNewPosition(id, e)}>
                    {this.state.childrenArray[i]}
                </div>;
            feedElements.push(addElement);
        }

        return (
            <>
                <div ref={this.viewport} className={s.sViewer__viewport} onTouchStart={(e) => simpleTouchHandler(currentPosition, this.setNewPosition, step, e)}>
                    {currentElem}
                </div>
                <div ref={this.feed} className={s.sViewer__feed}>{feedElements}</div>
            </>
        );
    }
}

SlidesViewer.defaultProps = {
    duration: 300,
    thumbnailsOpacity: 0.5
}

export default SlidesViewer;