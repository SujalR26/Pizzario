const { Schema, models, model } = require("mongoose");

const OrderSchema=new Schema({
    userEmail:{type:String},
    phone :{type:String},
    streetAddress:{type:String},
    postalCode :{type:String},
    city  :{type:String},
    country :{type:String},
    cartProducts:Object,
    total:{type:String},
    paid:{type:Boolean,default:false}
},{timestamps:true});


export const Order=models?.Order || model('Order',OrderSchema);