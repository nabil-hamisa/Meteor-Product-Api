import {Mongo} from 'meteor/mongo';
import brandSchema from "./schema/brandSchema";

const Brand = new Mongo.Collection('brand');

Brand.attachSchema(brandSchema);

Meteor.methods({
    'brand.get'() {
        return Brand.find({}).fetch()
    },
    'brand.insert'(data) {
        return Brand.insert({
            name: data.name,
        })
    }, 'brand.update'(data) {
        const Brand = Brand.findOne(data.id);
        if (data.hasOwnProperty('name')) {
            return Brand.update(data.id, {
                name: data.name,
            })
        }
    }, 'brand.delete'(BrandId) {
        return Brand.remove(BrandId);
    },


})

/* Get ALl brands */
JsonRoutes.add('GET', '/api/brands', function (req, res) {
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Brand.find({}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                };
            }),
        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
});

JsonRoutes.add('GET', '/api/brands/:brandId', function (req, res) {
    try {
        const id = req.params.brandId;

        JsonRoutes.sendResult(res, {
            code: 200,
            data: Brand.findOne({_id: id}),
        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
});


JsonRoutes.add('POST', '/api/brands', function (req, res) {
    try {
        const exist = Brand.findOne({name: req.body.name.toLowerCase()});
        if (!exist) {
            const id = Brand.insert({
                name: req.body.name,
            });
            JsonRoutes.sendResult(res, {
                code: 200,
                data: {
                    _id: id,
                },
            });
        } else {
            JsonRoutes.sendResult(res, {
                code: 200,
                data: {
                    error: "Brand already exist "
                },
            });
        }
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 400,
            data: error,
        });
    }
});
JsonRoutes.add('PUT', '/api/brands/:brandId', (req, res) => {
        const id = req.params.brandId;
        console.log(id)
        if (req.body.hasOwnProperty('name')) {
            Brand.update(
                {_id: id},
                {$set: {name: req.body.name}},
            );
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });
    },
);
JsonRoutes.add('DELETE', '/api/brands/:brandId', function (req, res) {
    try {
        const id = req.params.brandId;
        Brand.remove({_id: id});
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


export default Brand;
