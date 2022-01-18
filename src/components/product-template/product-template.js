import React from 'react';
import ProductTemplatePresent from './product-template-present';
import ProductTemplateError from "./product-template-error";
import LanguageContext from "../language-context/language-context";
import DynamicImport from "../dynamic-import/dynamic-import";
import ImportImage from "../dynamic-import/import-image";

const photo = "photo";
const description = "description";
const specifications = "specifications";

class Product extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jsonData: null,
            fullDescription: null,
            showOnError: null   //рендер на случай ошибки при поиске данных о продукте
        };

        this.initPage = this.initPage.bind(this);
        this.findProduct = this.findProduct.bind(this);
        this.createFullDescription = this.createFullDescription.bind(this);
        this.createPhotos = this.createPhotos.bind(this);
        this.showOnError = this.showOnError.bind(this);

        this.mounted = true;
    }

    componentDidMount() {
        //Подключаем соответствующий файл локализации
        import(`../../json/production-${this.context.lang}.json`)
        //если компонент размонтирован - никаких действий не совершаем
        .then((jsonData) => {
            if (this.mounted) {
                this.setState({jsonData: jsonData.default})
            }
        });
    }

    componentDidUpdate() {
        if (this.state.jsonData && !this.state.fullDescription && !this.state.showOnError) {
            this.initPage();
        } else if (!this.state.jsonData) {
            console.log(`product-template: не удалось получить данные JSON`);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    //Сборка страницы из полученного JSON
    initPage() {
            try{
                //найти продукт в JSON
                const product = this.findProduct();

                //собрать все данные о продукте в один объект...
                const fullDescription = this.createFullDescription(product);

                //...и запустить рендер
                this.setState({fullDescription: fullDescription});
            } catch(e) {
                console.log(`product-template. Ошибка initPage. ${e.name}: ${e.message}\n${e.stack}`);
                
                this.setState({
                    showOnError: this.showOnError()
                });
            }
    }

    findProduct() {
        for (let product of this.state.jsonData) {
            if (product.id === this.props.name) {
                return product;
            }
        }

        console.log(`product-template. Ошибка findProduct. Продукт ${this.props.name} не найден в файле production-${this.context.lang}.json`)
    }

    createFullDescription(product) {
        let photoArray = [];    //Массив фотографий
        let descriptionArray = [];  //Массив <p> с полным описанием продукта
        let specificationsArray = [];   //Массив <li> характеристик продукта

        for (let [key, value] of Object.entries(product)) {
            if (key.includes(photo)) {
                photoArray.push(this.createPhotos(value));
            }

            if (key.includes(description)) {
                descriptionArray.push(<p>{value}</p>)
            }

            if (key.includes(specifications)) {
                specificationsArray.push(<li>{value}</li>)
            }
        }

        const fullDescription = {
            name: product.name,
            photos: photoArray,
            volume: product.volume,
            shelves: product.shelves,
            size: product.size,
            description: descriptionArray,
            specifications: specificationsArray
        }

        return fullDescription;
    }

    createPhotos(link) {
        return (
            <DynamicImport src={link}>
                <ImportImage/>
            </DynamicImport>
        );
    }

    showOnError() {
        return <ProductTemplateError/>;
    }

    render() {
        if (!this.state.jsonData || !this.state.fullDescription) {
            return this.state.showOnError;
        } else {
            const info = {
                name: this.state.fullDescription.name,
                photos: this.state.fullDescription.photos,
                volume: this.state.fullDescription.volume,
                shelves: this.state.fullDescription.shelves,
                size: this.state.fullDescription.size,
                description: this.state.fullDescription.description,
                specifications: this.state.fullDescription.specifications
            };

            return <ProductTemplatePresent info={info}/>;
        }
    }
}

Product.contextType = LanguageContext;

export default Product;