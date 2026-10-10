import mongoose from "mongoose";
import validator from 'validator'
export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:25
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator: validator.isEmail,
            message:function(prop){
                return `${prop.value} is not a valid email address!`
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:16,
        max:60
    }
},
{
    timestamps:true,
    autoIndex:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    strict:true,
    strictQuery:true,
    collection:"Assignment08_users",
    optimisticConcurrency:true,
})

export const UserModel = mongoose.models.User || mongoose.model("User",userSchema)