import {Mongo} from 'meteor/mongo';
import productSchema from "./schema/productSchema";


const Product = new Mongo.Collection('product');
//const filters=['name','price','brand',]

Product.attachSchema(productSchema);


//TODO get prodcut by category
//TODO FILTER BY popular  still missing order api to consume
//Todo create collection  for productImnages

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
        return _.findWhere(this.labels, {_id: id});
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
JsonRoutes.add('GET', '/api/products', function (req, res) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Product.find({}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    stock: doc.stock,
                    description: doc.description,
                    brand: doc.brandId,
                    category: doc.category,
                    criteria: doc.criteria,
                    promotion: doc.promotion,
                    hadPromotion: doc.hadPromotion,
                    hadCritiria: doc.hadCritiria,
                };
            }),
        });
    },
);
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
JsonRoutes.add('GET', '/api/products/brand/:brandId', function (req, res) {
        const brandId = req.params.brandId
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Product.find({brandId: brandId}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    stock: doc.stock,
                    description: doc.description,
                    brand: doc.brandId,
                    category: doc.category,
                    criteria: doc.criteria,
                    promotion: doc.promotion,
                    hadPromotion: doc.hadPromotion,
                    hadCritiria: doc.hadCritiria,
                };
            }),
        });
    },
);

JsonRoutes.add('GET', '/api/products/category/:categoryId', function (req, res) {
        const categoryId = req.params.categoryId
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Product.find({category: {$in: [categoryId]}}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    stock: doc.stock,
                    description: doc.description,
                    brand: doc.brandId,
                    category: doc.category,
                    criteria: doc.criteria,
                    promotion: doc.promotion,
                    hadPromotion: doc.hadPromotion,
                    hadCritiria: doc.hadCritiria,
                };
            }),
        });
    },
);


JsonRoutes.add('POST', '/api/products', function (req, res) {
    try {

        const id = Product.insert({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            brandId: req.body.brandId,
            category: req.body.category,
            criteria: req.body.criteria,
            hadCritiria: req.body.category.length > 0

        });
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });

    } catch (error) {
        console.log(error)
        JsonRoutes.sendResult(res, {
            code: 400,
            data: error,
        });
    }
});


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


JsonRoutes.add('PUT', '/api/products/:productId', (req, res) => {
        try {
            const productId = req.params.productId;
            if (req.body.hasOwnProperty('name')) {
                Product.update(
                    {_id: productId},
                    {$set: {name: req.body.name}},
                );
            }
            if (req.body.hasOwnProperty('description')) {
                Product.update(
                    {_id: productId},
                    {$set: {description: req.body.description}},
                );
            }
            if (req.body.hasOwnProperty('price')) {
                Product.update(
                    {_id: productId},
                    {$set: {price: req.body.price}},
                );
            }
            if (req.body.hasOwnProperty('stock')) {
                Product.update(
                    {_id: productId},
                    {$set: {stock: req.body.stock}},
                );
            }
            if (req.body.hasOwnProperty('brandId')) {
                Product.update(
                    {_id: productId},
                    {$set: {brandId: req.body.brandId}},
                );
            }
            if (req.body.hasOwnProperty('category')) {
                Product.update(
                    {_id: productId},
                    {
                        $set: {
                            category: req.body.category,
                            hadCritiria: req.body.category.length > 0
                        }
                    },
                );
            }
            if (req.body.hasOwnProperty('criteria')) {
                Product.update(
                    {_id: productId}, {$set: {criteria: req.body.criteria}},
                );
            }
            if (req.body.hasOwnProperty('promotion')) {
                Product.update(
                    {_id: productId}, {$set: {promotion: req.body.promotion}},
                );
            }
            JsonRoutes.sendResult(res, {
                code: 200,
                data: {_id: productId},
            });
        } catch (error) {
            console.log(error);
            JsonRoutes.sendResult(res, {
                code: 400,
                data: error,
            });
        }
    },
);


export default Product;
