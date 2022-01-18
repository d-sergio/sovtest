import React from 'react';
import {Link} from 'gatsby';
import Layout from "../layout/layout";

export default () => (
    <Layout>
        <div>Продукт не найден/Product not found</div><br/>
        <Link to='/production'>Вернуться к списку продуктов/Back to product list </Link>
    </Layout>
);