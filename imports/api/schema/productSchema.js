import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
        name: {type: String, min: 1, max: 255,optional: false},
        price: {type: Number, min: 0, optional: false},
        stock: {type: SimpleSchema.Integer, min: 0, optional: false},
        description: {type: String, optional: true},
        brandId: {type: String, optional: false},
        rating: {type: Number, min: 0, optional: true},
        category: {type: Array, minCount: 1, optional: true},
        "category.$": {
            type: String,
        },
        promotion: {type: Array, optional: true},
        "promotion.$": {
            type: String,
        },
        hadPromotion: {type: Boolean, defaultValue: false},
        hadCritiria: {type: Boolean, defaultValue: false},
    },
    {
        clean: {
            trimStrings: true,
            autoValue: true,
            removeEmptyStrings: true,
            autoConvert: true,
        },
    }
)

