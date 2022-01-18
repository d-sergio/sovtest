/**Форма подписки на рассылку
 * Добавьте колбек отправки данных формы в пропс fetchMethod.
 * handleSubmit передаст ему введённый польователем email
 * 
 * Props:
 * @param {array} srcData - импортированные данные из JSON
*/

import React from "react";
import s from "./subscribe.module.css";
import b from "../buttons/buttons.module.css";
import f from "../classes/fonts.module.css";

class SubscribeForm extends React.Component{
    constructor() {
        super();
        this.state = {value: 'E-mail'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.sendAdress = this.sendAdress.bind(this);

        this.input = React.createRef();
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleFocus() {
        if (this.state.value == 'E-mail'){
            this.setState({value: ''});
        }        
    }

    handleBlur() {
        if (this.state.value == ''){
            this.setState({value: 'E-mail'});
        } 
    }

    handleSubmit(e) {
        e.preventDefault();

        let email;

        if (this.input.current !== null) {
            email = this.input.current.value;

            const regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

            if (regexp.test(email)) {
                this.sendAdress(email);
            } else {
                alert('Неверный адрес!');
            }
        }
    }

    sendAdress(email) {
        if (this.props.fetchMethod !== undefined && this.props.fetchMethod !== null){
            this.props.fetchMethod(email);
        } else {
            alert(`Вы подписались`);
        }
    }

    render() {
        return (
                <div className={s.subscribe__links}>
                    {this.props.srcData.subscribe}
                    <form className={s.subscribe__subscribeForm} onSubmit={this.handleSubmit}>
                        <input ref={this.input} type="text" value={this.state.value} className={s.subscribe__email} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                        <input type="submit" value={this.props.srcData.submit} className={[b.button__base, b.button_black, b.button_submit, f.font__H5up].join(" ")}/>
                    </form>
                </div>
        )
    }
}

export default SubscribeForm;