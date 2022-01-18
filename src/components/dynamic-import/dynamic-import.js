/**Компонент для динамического импорта
 * 
 * Импортирует данные из указанного источника в единственный(!) дочерний компонент.
 * 
 * Пока данные не импортированы, вместо дочернего компонента отображается заглушка
 * dummy (из пропа) или ничего (null, если dummy не указан).
 * 
 * Импортированные данные дочерний компонент получает через проп srcData
 * 
 * Props:
 * @param {url} src - источник данных. Поиск начинается из папки src проекта
 * @param {node} dummy - заглушка, которая отображается пока данные не импортированы
 */

import React from 'react';
import LanguageContext from "../language-context/language-context";

class DynamicImport extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            importedData: null
        };

        this.mounted = true;
    }

    componentDidMount() {
        //импорт данных
        import(`../../${this.props.src}`)
        //если компонент размонтирован - никаких действий не совершаем
        .then((importedData) => {
            if (this.mounted) {
                this.setState({importedData: importedData.default || importedData})
            }
        })
        .catch((e) => console.log(`dynamic-import.js: ошибка импорта\n ${e.name}: ${e.message}\n ${e.stack}`));
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (!this.state.importedData) {
            const dummy = this.props.dummy
                        ? this.props.dummy
                        : null;
            return dummy;
        } else {
            const consumer = React.Children.only(this.props.children);

            return(
                <>{React.cloneElement(consumer, {srcData: this.state.importedData})}</>
            );
        }
    }
}

DynamicImport.contextType = LanguageContext;

export default DynamicImport;