/**Кнопка показа мобильной навигации по сайту
 * 
 * Рендерит единственный получаемый из children компонент (не передавайте
 * больше потомков! React сообщит об ошибке!), передавая ему своё состояние
 * в пропсы isOpen={this.state.isOpen}. Таким образом меню, управляемое
 * этой кнопкой знает - должно оно быть открыто или закрыто
 * 
 * Props:
 * @param {node} children - меню, вызываемое кнопкой (единственный потомок компонента!)
 * @param {node} iconClose - внешний вид кнопки "Открыть меню"
 * @param {node} iconOpen - внешний вид кнопки "Закрыть меню"
 */

import React from "react";

class NavMenuButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {isOpen: false};

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    render() {
        const menuIcon = this.state.isOpen
            ? this.props.iconClose
            : this.props.iconOpen;

        const mobileMenu = (
            <>{React.cloneElement(React.Children.only(this.props.children), {isOpen: this.state.isOpen})}</>
        );
                    
        return(
            <>
                <div onClick={this.toggleMenu}>
                    {menuIcon}
                </div>
                
                {mobileMenu}
            </>
        );
    }
}

NavMenuButton.defaultProps = {
    iconOpen: <div>OpenMenu</div>,
    iconClose:<div>CloseMenu</div>
}

export default NavMenuButton;