import {Mongo} from 'meteor/mongo';
import criteriaSchema from "./schema/criteriaSchema";

const Criteria = new Mongo.Collection('criteria');
Criteria.attachSchema(criteriaSchema);


JsonRoutes.add('GET', '/api/criteria', function (req, res) {
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Criteria.find({}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    value: doc.value,
                    isColor: doc.isColor
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

JsonRoutes.add('GET', '/api/criteria/:criteriaId', function (req, res) {
    try {
        const id = req.params.criteriaId;
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Criteria.find({_id: id}).map(function (doc) {
                return {
                    _id: doc._id,
                    name: doc.name,
                    value: doc.value,
                    isColor: doc.isColor
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


JsonRoutes.add('POST', '/api/criteria/', function (req, res) {
    try {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: Criteria.insert({
                name: req.body.name,
                value: req.body.value.filter((x, i, a) => a.indexOf(x) === i),
                isColor: req.body.isColor
            })
        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: e
        })
    }
})


JsonRoutes.add('PUT', '/api/criteria/:criteriaId', function (req, res) {
    try {
        const id = req.params.criteriaId;
        if (req.body.hasOwnProperty('name')) {
            Criteria.update(
                {_id: id},
                {$set: {name: req.body.name}}
            )
        }
        if (req.body.hasOwnProperty('isColor')) {
            Criteria.update(
                {_id: id},
                {$set: {isColor: req.body.isColor}}
            )
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {_id: id}
        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 400,
            data: e
        })
    }
})
JsonRoutes.add('DELETE', '/api/criteria/:criteriaId', function (req, res) {
    try {
        const id = req.params.criteriaId;
        Criteria.remove({_id: id});
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {_id: id}
        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 404,
            data: e
        })
    }
})


JsonRoutes.add('PUT', '/api/criteria/:criteriaId/value', function (req, res) {
    try {
        const id = req.params.criteriaId;
        const criteria = Criteria.findOne({_id: id});
        if (req.body.hasOwnProperty("value")) {
            const filtredCriteria = req.body.value.filter((x, i, a) => a.indexOf(x) === i)
            filtredCriteria.map((value) => {
                console.log(value)
                if (criteria.value.indexOf(value) === -1) {
                    Criteria.update({_id: id}, {
                        $push: {value: value}
                    })
                }
            })
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {_id: id}
        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: e
        })
    }
})


JsonRoutes.add('DELETE', '/api/criteria/:criteriaId/value', function (req, res) {
    try {
        const id = req.params.criteriaId;
        if (req.body.hasOwnProperty('value')) {
            req.body.value.map(function (value) {
                Criteria.update({_id: id}, {
                    $pull: {value: value}
                })
            })
        }
        JsonRoutes.sendResult(res, {
            code: 200,
            data: {_id: id}
        })
    } catch (e) {
        JsonRoutes.sendResult(res, {
            code: 200,
            data: e
        })
    }
})



