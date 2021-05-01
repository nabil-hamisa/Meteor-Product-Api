import SimpleSchema from "simpl-schema";
export  default  new SimpleSchema({
    idProduit: {type:String,optional: false},
    name: {type: String, min: 1, max: 255, optional: false},
    values: [Object],
})
