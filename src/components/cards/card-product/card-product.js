/** Карточка товара для страницы Production
 * 
 *  В зависимости от разрешения, отображает мобильный или десктопный вариант карточки
 * 
 *  Props:
 *  @param {Number} maxMobileSize - максимальное разрешение для мобильного варианта
 *  @param {object} raw
 * 
 *  Объект raw:
 *  raw.photo - имя файла
 *  raw.name - название продукта
 *  raw.description - краткое описание
 *  raw.link - ссылка на страницу продукта
 * 
 */

import React, { Suspense } from "react";
import DynamicImport from "../../dynamic-import/dynamic-import";

const CardProductDesktop = React.lazy( () => import("./card-product-desktop") );
const CardProductMobile = React.lazy( () => import("./card-product-mobile") );

class CardProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mobile: true
        };

        this.onResize = this.onResize.bind(this);
    }

    componentDidMount(){
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

    render(){
        const card = this.state.mobile
                    ? <CardProductMobile raw={this.props.raw}/>
                    : <CardProductDesktop raw={this.props.raw}/>;
    
        return (
            <Suspense fallback={<div>Загрузка...</div>}>
                <DynamicImport src={this.props.raw.photo}>
                    {card}
                </DynamicImport>
            </Suspense>
        );
    }
}

CardProduct.defaultProps = {
    maxMobileSize: 759
}

export default CardProduct;