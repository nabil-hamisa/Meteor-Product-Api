import React from 'react';

export function ProductsTable({products}) {


    const renderProduct = (products) => {
        return products.map((product) => {
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td>{product.brand}</td>
                </tr>)
        })
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Brand</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {renderProduct(products)}
            </tbody>
        </table>
    );
}
