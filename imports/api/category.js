import {Mongo} from "meteor/mongo";
import categorySchema from "./schema/categorySchema";

const Category = new Mongo.Collection('category');

Category.attachSchema(categorySchema);


JsonRoutes.add('Get', '/api/category', function (req, res) {
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Category.find({}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    parent: doc.parent,
                    category: doc.category,
                }
            })

        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: e
        })
    }
})

JsonRoutes.add('Get', '/api/category/:categoryId', function (req, res) {
    const id = req.params.categoryId
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Category.find({_id: id}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    parent: doc.parent,
                    category: doc.category,
                }
            })

        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
})

JsonRoutes.add('Get', '/api/category/root_category/', function (req, res) {
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Category.find({parent: /^\/$/}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    parent: doc.parent,
                    category: doc.category,
                }
            })
        })
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error,
        });
    }
})


JsonRoutes.add('Get', '/api/category/sub_Category/:parentId', function (req, res) {
    try {
        const parentId = req.params.parentId;
        var col = Category.findOne({_id: parentId});
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Category.find({parent: col.category}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    parent: doc.parent,
                    category: doc.category,
                }
            })
        });
    } catch (error) {
        console.log(error)
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error
        });
    }
})


JsonRoutes.add('Post', '/api/category/', function (req, res) {
    try {
        const id = Category.insert({
            name: req.body.name,
            parent: req.body.parent,
            category: req.body.parent + '/' + req.body.name
        })
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });

    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 400,
            data: error,
        });
    }
})

JsonRoutes.add('PUT', '/api/category/:categoryId', (req, res) => {
    try {
        const id = req.params.categoryId;
        let categ = Category.findOne({_id: id})
        if (req.body.hasOwnProperty('name') && req.body.name) {
            Category.update(
                {_id: id},
                {
                    $set:
                        {
                            name: req.body.name,
                            parent: categ.parent,
                            category: categ.category.replace(categ.name, req.body.name)
                        }
                },
            );
        }
        categ = Category.findOne({_id: id})
        if (req.body.hasOwnProperty('parent') && req.body.parent) {
            Category.update(
                {_id: id},
                {
                    $set: {
                        parent: req.body.parent,
                        category: req.body.parent + '/' + categ.name
                    }
                },
            );
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 400,
            data: error,
        });
    }
})


JsonRoutes.add('DELETE', '/api/category/:categoryId', function (req, res) {
    try {
        const id = req.params.categoryId;
        Category.remove({_id: id});
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




