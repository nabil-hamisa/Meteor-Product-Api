import React, {useEffect, useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {ProductForm}from'./form/ProductForm'
import {ProductsTable} from "./tables/ProductsTable";


export const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Meteor.call('product.get', (err, res) => {
            setProducts(res);
        })

    }, [])

    return (
        <div className="root">
            <ProductForm/>
            <ProductsTable products={products}/>

        </div>
    );
};
