import mongoose from "mongoose"

export const toObjectId = (val)=>{
    return mongoose.Types.ObjectId(val)
}