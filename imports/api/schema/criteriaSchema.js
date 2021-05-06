import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
        name: {type: String, min: 1, max: 255, optional: false},
        value: [{
            type: String, min: 1, max: 255, optional: true, autoValue: function () {
                if (this.isSet && typeof this.value === "string") {
                    return this.value.toUpperCase();
                }
            }
        },],
        isColor:{type:Boolean,defaultValue:false}
    }, {
        clean: {
            trimStrings: true,
            autoValue: true,
            removeEmptyStrings: true,
            autoConvert: true,
        },
    }
)
