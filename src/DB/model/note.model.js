import mongoose, { mongo } from "mongoose";

export const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[1, `title can't be empty`],
        vallidate:{
            validator:function(val){
                if(val === val.toUpperCase()){
                    return false
                }
                return true
            },message:function(prop){
                return `the value ${prop.value} cann't be entirely uppercase!`
            }
        }
    },
    content:{
        type:String,
        required:true,
        minLength:[3, `content should be at least 3 character`]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }

},{
    timestamps:true,
    autoIndex:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    strict:true,
    strictQuery:true,
    collection:"Assignment08_notes",
    optimisticConcurrency:true,

})

export const NoteModel = mongoose.models.Note || mongoose.model('Note',noteSchema)