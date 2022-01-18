/**Блок новостей главной страницы. Показывается как слайдер или подгружаемая лента,
 * в зависимости от размера окна
 * 
 * Принимает единственный проп:
 * 
 * @param {number} maxMobileSize - максимальный размер окна для мобильной
 * версии, в которой новости выводятся в виде подгружаемой ленты (610 по
 * умолчанию). На десктопе - в виде слайдера.
 */

import React from "react";
import BlockNewsSlider from "../block-news-slider/block-news-slider";
import BlockNewsfeed from "../block-newsfeed/block-newsfeed";

class BlockNews extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            mobile: true
        }

        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        if (window.innerWidth <= this.props.maxMobileSize && !this.state.mobile) {
            this.setState({
                mobile: true
            });
        } else if (window.innerWidth > this.props.maxMobileSize && this.state.mobile) {
            this.setState({
                mobile: false
            });
        }
    }

    render() {
        const news = this.state.mobile ? <BlockNewsfeed/> : <BlockNewsSlider/>;

        return <>{news}</>;
    }
}

BlockNews.defaultProps = {
    maxMobileSize: 610
}

export default BlockNews;