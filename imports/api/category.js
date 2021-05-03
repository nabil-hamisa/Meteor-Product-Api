import {Mongo} from "meteor/mongo";
import categorySchema from "./schema/categorySchema";

const Category = new Mongo.Collection('category');

Category.attachSchema(categorySchema);



JsonRoutes.add('Get', '/api/category', function (req, res) {
    JsonRoutes.sendResult(res, {
        code: 200,
        data: Category.find({}).map(function (doc) {
            return {
                _id:doc._id,
                name: doc.name,
                parent: doc.parent,
                category: doc.category,
            }
        })

    });
})

JsonRoutes.add('Get', '/api/category/:categoryId', function (req, res) {
    const id = req.params.categoryId
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Category.find({_id: id}).map(function (doc) {
                return {
                    _id:doc._id,
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
    JsonRoutes.sendResult(res, {
        code: 200,
        data: Category.find({parent:/^\/$/}).map(function (doc) {
            return {
                _id:doc._id,
                name: doc.name,
                parent: doc.parent,
                category: doc.category,
            }
        })
    });

})


JsonRoutes.add('Get', '/api/category/sub_Category/:parentId', function (req, res) {
    const parentId = req.params.parentId;
    var col =Category.findOne({_id:parentId});
    console.log(col.category)
    var regex=new RegExp(`/^`+col.category+`$/`)
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: col.find({parent: regex}).map(function (doc) {
             return {
                 _id:doc._id,
                 name: doc.name,
                 parent: doc.parent,
                 category: doc.category,
             }
            })
        });
    } catch (error) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: error
        });
    }
})



JsonRoutes.add('Post', '/api/category/', function (req, res) {
    try {
        const id= Category.insert({
            name:req.body.name,
            parent:req.body.parent,
            category:req.body.parent+'/'+req.body.name
        })
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {
                _id: id,
            },
        });

    }catch (error) {
        JsonRoutes.sendResult(res, {
            code: 400,
            data: error,
        });
    }
})




