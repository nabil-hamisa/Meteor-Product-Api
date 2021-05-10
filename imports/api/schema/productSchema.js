import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
        name: {type: String, min: 1, max: 255, optional: false},
        price: {type: Number, min: 0, optional: false},
        stock: {type: SimpleSchema.Integer, min: 0, optional: false},
        description: {type: String, optional: false},
        brandId: {type: String,min: 1, max: 700, optional: false},
        category: {
            type: Array,
            optional: true,
            blackbox: true,
            autoValue: function () {
                if (! this.isSet ) {
                    return [];
                }
            }
        },
        'category.$': {
            type: String, min: 1, max: 255, optional: true,
        },

        criteria: {
            type: Array,
            optional: true,
            blackbox: true,
            autoValue: function () {
                if (! this.isSet ) {
                    return [];
                }
            }
        },
        'criteria.$': {
            type: String, min: 1, max: 255, optional: true,
        },
        promotion: {
            type: Array,
            blackbox: true,
            optional: true,
            autoValue: function () {
                if (! this.isSet ) {
                    return [];
                }
            }
        },
        'promotion.$': {
            type: String, min: 1, max: 255, optional: true,


        },
        hadPromotion: {type: Boolean, defaultValue: false},
        hadCritiria: {type: Boolean, defaultValue: false},
    },
    {modifier: true},
    {
        clean: {
            trimStrings: true,
            autoValue: true,
            removeEmptyStrings: true,
            autoConvert: true,
        },

    },
)

