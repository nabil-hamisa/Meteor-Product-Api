import SimpleSchema from "simpl-schema";
export  default new SimpleSchema({
    name: {type: String, min: 1, max: 255, optional: false},
    hadSubCategory:{type: Boolean, defaultValue: false},
    products: [{type:String,optional:true}],
    Subcategory:[String],
})
