const { Schema, model, models } = require("mongoose");
const UserSchema=new Schema({
    name:{type:String},
    image:{type:String},
    email:{type:String,required:true,unique:true},
    password:{
        type:String,
    },
},{timestamps:true});


// UserSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

export const User=models?.User||model('User',UserSchema);