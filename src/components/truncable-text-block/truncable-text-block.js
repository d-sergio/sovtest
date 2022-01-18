/**Текстовый блок с гибкими размерами (адаптируется под родителя)
 * 
 * Проблема:
 * В слайдере есть адаптивные карточки с текстом, каждая из которых должна иметь
 * одинаковую высоту при любом количестве символов в них.
 * 
 * Решение:
 * 1. Через пропсы данному компоненту задаётся максимальное число отображаемых
 * символов. Остальные отсекаются с заменой на троеточие (...).
 * 2. Рассчитывается высота блока, в которую, как ожидается, усечённый текст
 * вместится целиком. Для этого также требуется знать ширину символа текста
 * (тоже задаётся в пропсах)
 * 
 * Props:
 *  @param {object} blockProps - объект со следующими полями:
 *      @param {number} textMaxLength - максимальное число символов в заголовке,
 *      больше которого строка усекается с добавлением троеточия "..." в конце
 *      (190 по умолчанию)
 *      @param {number} titleSymbolWidth - условно средняя ширина символа, на его
 *      основе рассчитывается высота <div> заголовка (9 по умолчанию).
 *      @param {boolean} titleMode - размеры блоков заголовков новостей задаются
 *      особым образом. Для них указываем "true" (по умолчанию false).
 * 
 *  @param {string} children - только текст.
 */

import React from "react";
import truncate from "../others/truncate";

class TruncableTextBlock extends React.Component{
    constructor(props){
        super(props);

        const defaults = {
            textMaxLength: 190,
            symbolWidth: 9,
            titleMode: false
        };

        this.params = Object.assign({}, defaults, this.props.blockProps);

        this.setTextBlockHeight = this.setTextBlockHeight.bind(this);
        this.insertText = this.insertText.bind(this);

        this.text = React.createRef();
    }

    componentDidMount(){
        this.insertText();
        this.setTextBlockHeight();
        window.addEventListener('resize', this.setTextBlockHeight);
    }

    componentDidUpdate() {
        this.setTextBlockHeight();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.setTextBlockHeight);
    }

    //Рассчитать высоту текстового блока
    setTextBlockHeight(){
        try{
            if (this.text.current !== null) {
                
                const textStyles = window.getComputedStyle(this.text.current);

                const lineHeight = parseFloat(textStyles.lineHeight);
                
                const textWidth = parseFloat(textStyles.width);

                const charsPerLine = textWidth / this.params.symbolWidth;

                const numberOfLines = Math.ceil(this.params.textMaxLength / charsPerLine);

                const blockHeight = numberOfLines * lineHeight;

                if (this.params.titleMode) {
                    this.text.current.parentNode.parentNode.style.height = blockHeight + 'px';
                    this.text.current.parentNode.parentNode.style.lineHeight = blockHeight + 'px';
                } else {
                    this.text.current.style.height = blockHeight + 'px';
                }

                this.insertText();
            }
        } catch(e) {
            console.log('Card-actual Ошибка setTextBlockHeight(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }
    
    insertText() {
        try{
            if (this.text.current !== null) {

                if (this.text.current.firstChild) {
                    this.text.current.firstChild.remove();
                }

                const truncateProps = {
                    string: this.props.children,
                    maxLength: this.params.textMaxLength
                };

                const text = truncate(truncateProps);

                this.text.current.append(text);
            }
        } catch(e) {
            console.log('Card-actual Ошибка insertText(): ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    render(){
        return(
            <div ref={this.text}>

            </div>
        )
    }
}

export default TruncableTextBlock;