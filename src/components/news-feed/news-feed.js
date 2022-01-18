/**Лента новостей с псевдо-подгрузкой для статического сайта.
 * 
 * Массив данных весь целиком получается компонентом из пропсов, а карточки
 * новостей создаются и добавляются по мере прокрутки ленты.
 * 
 * Props:
 * @param {object} feedProps - объект со следующими полями:
 *   @param {number} step - количество новостей, "подгружаемых" за один раз
 *   (1 по умолчанию)
 *   @param {number} correct - корректировка в пикселях (0 по умолчанию).
 *   Позволяет "подгружать" новость:
 *   - раньше, чем будет пролистана последняя из новость (положительное
 *   значение correct).
 *   - позже, после того, как новость прокрутится ещё на correct пикселей
 *   @param {array} src - массив объектов, из которого формируется лента
 *   @param {node} handler - обработчик, создающий карточки на основе объектов
 *   из src.
 * 
 *   Два варианта использования компонента:
 *   1. Указать в пропс src и handler.
 *   К handler будет добавлен проп raw, из которого этот обработчик сможет
 *   создать карточку новости.
 *   2. Не указывать src и handler, а добавить компоненту children, которые
 *   будут показаны как они есть
 */

import React from 'react';

class Newsfeed extends React.Component{
    constructor(props) {
        super(props);

        //Принимаемые параметры по умолчанию
        const defaults = {
            step: 1,
            correct: 0,
            src: React.Children.toArray(this.props.children),
            handler: <DefaultHandler/>
        };

        this.params = Object.assign({}, defaults, this.props.feedProps);

        this.state = {
            currentCards: [],
            currentIndex: null
        }

        this.inProgress = false;

        this.getNewCards = this.getNewCards.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.insertNewCards = this.insertNewCards.bind(this);

        this.newsfeed = React.createRef();
    }

    componentDidMount() {
        this.inProgress = true;
        this.insertNewCards();

        window.addEventListener('scroll', this.onScroll);
    }

    componentDidUpdate() {
        this.inProgress = false;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        //компонент отрисован, другая "подгрузка" не происходит
        if (this.newsfeed.current !== null && !this.inProgress) {
            const newsRect = this.newsfeed.current.getBoundingClientRect();
            const newsBottom = newsRect.bottom;

            if (newsBottom < window.innerHeight - this.params.correct){
                this.inProgress = true;
                this.insertNewCards();
            }
        }
    }

    insertNewCards() {
        const newcards = this.getNewCards(this.state.currentCards.length, this.params.step);

        if (newcards !== null) {    //новости не закончились?
            const newsfeed = this.state.currentCards.concat(newcards);
    
            this.setState({
                currentCards: newsfeed
            });
        } else {
            //новости закончились, но всё равно сбросим inProgress, на случай если появятся новые
            this.inProgress = false;
        }
    }

    /**Получить новые карточки новостей
     * @param {number} from - с какого номера карточки начать
     * @param {number} total - сколько карточек отдать
     */
    getNewCards(from, total) {
        const allNews = this.params.src;
        let newcards = null;

        if (allNews.length !== this.state.currentCards.length) {   //не закончились ли новости?

            //чтобы компонент не пытался взять новости за пределами содержимого массива
            let end = Math.min((from + total), allNews.length);
            
            newcards = allNews.slice(from, end).map(item =>
                <>{React.cloneElement(this.params.handler, {raw: item, key: item.id})}</>);
        }

        return newcards;
    }

    render() {
        return <div ref={this.newsfeed}>{this.state.currentCards}</div>;
    }
}

function DefaultHandler(props) {
    return(
        <div>{props.raw}</div>
    )
}

export default Newsfeed;