import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
        name: {type: String, min: 1, max: 255, optional: false},
        parent: {
            type: String, optional: true,
            autoValue: function () {
                if (!this.isSet ) {
                    return '/';
                }
            },
        },
        category: {type: String, optional: false},
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
