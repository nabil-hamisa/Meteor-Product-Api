import {Mongo} from 'meteor/mongo';
import productSchema from "./schema/productSchema";

const Product = new Mongo.Collection('product');
//const filters=['name','price','brand',]

Product.attachSchema(productSchema);
//todo get product by brand
//todo get product by  price
//todo get product by criteria
//Todo get prodcut by price async /desc
//TODO get prodcut by category
//TODO affect category to a product
//TODO ADD PROMOTION to product
//TODO UPDATE BRAND
//TODO FILTER BY popular  still missing order api to consume
//Todo create collection  for productImnages
//Todo
Meteor.methods({
    'product.get'() {
        return Product.find({}).fetch()
    },
    'product.insert'(data) {
        return Product.insert({
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description,
        })
    }, 'product.update'(data) {
        return Product.update(data.id, {
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description,
            brand: data.brand,
            category: data.category,
        })
    }, 'product.delete'(productId) {
        return Product.remove(productId);
    },



    getBrandById(id) {
        return _.findWhere(this.labels, { _id:id });
    }
})








/**
 * @operation get_products
 * @summary get all products
 * @return_type [{_id: string,
 *                name: string,
 *                description: string,
 *                price: string,
 *                Stock: string}]
 */
JsonRoutes.add(
    'GET',
    '/api/products',
    function (req, res) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Product.find({}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    description: doc.description,
                    price: doc.price,
                    brand: doc.brand,
                    category: doc.category,
                    promotion: doc.promotion,
                    hadPromotion: doc.hadPromotion,
                    hadCritiria: doc.hadCritiria,
                };
            }),
        });
    },
);
/**
 * @operation delete_product
 * @summary Delete a product
 *
 * @param {string} productId the ID of the product
 */
JsonRoutes.add('DELETE', '/api/products/:productId', function (req, res) {
    try {
        const id = req.params.productId;
        Product.remove({_id: id});
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
});

/**
 * @operation get_product
 * @summary Get the product with that particular ID
 *
 * @param {string} productdId the ID of the board to retrieve the data
 * @return_type Products
 */
JsonRoutes.add('GET', '/api/products/:productId', function (req, res) {
    try {
        const id = req.params.productId;

        JsonRoutes.sendResult(res, {
            code: 200,
            data: Product.findOne({_id: id}),
        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
});


JsonRoutes.add(
    'PUT',
    '/api/products/:productId',
    (req, res) => {
        const productId = req.params.productId;
        if (req.body.hasOwnProperty('name')) {
            Product.direct.update(
                {_id: productId},
                {$set: {name: req.body.name}},
            );
        }
        if (req.body.hasOwnProperty('description')) {
            CustomFields.direct.update(
                {_id: productId},
                {$set: {description: req.body.description}},
            );
        }
        if (req.body.hasOwnProperty('price')) {
            CustomFields.direct.update(
                {_id: productId},
                {$set: {price: req.body.price}},
            );
        }
        if (req.body.hasOwnProperty('stock')) {
            CustomFields.direct.update(
                {_id: productId},
                {$set: {stock: req.body.stock}},
            );
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {_id: productId},
        });
    },
);


export default Product;
