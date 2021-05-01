import React, {useState} from 'react';
export function ProductForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const handleSubmit = (e) => {

        e.preventDefault();
        Meteor.call('product.get', function (err, res) {
            console.log(res)
            console.log(err)
        });
        const data = {
            name: name.trim(),
            price: parseFloat(price),
            stock: parseInt(stock),
            description: description.trim(),
            brand: brand.trim(),
        }
        console.log(data)
        Meteor.call('product.insert', data, function (err, result) {
            if (!err) console.log(result)
            console.log(err);
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>New Product</h1>
            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)}/><br/>
            <label>Price</label>
            <input type="text" onChange={(e) => setPrice(e.target.value)}/><br/>
            <label>Stock</label>
            <input type="text" onChange={(e) => setStock(e.target.value)}/><br/>
            <label>Brand</label>
            <input type="text" onChange={(e) => setBrand(e.target.value)}/><br/>
            <label>Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)}/><br/>

            <button type='submit'>Add Product</button>
        </form>
    );
}
