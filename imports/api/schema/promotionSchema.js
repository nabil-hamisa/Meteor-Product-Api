import SimpleSchema from "simpl-schema";
export default new SimpleSchema({
    name: {type: String, min: 1, max: 255, optional: false},
    startDate:{type:Date},
    endDate:{type:Date},
    discountPercentage:{type: Number, min: 0, optional: false},
    isCoupon: {type: Boolean, defaultValue: false},
    couponCode:[String],
    productsId:[String],
})
