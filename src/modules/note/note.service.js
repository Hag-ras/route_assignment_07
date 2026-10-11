import mongoose from "mongoose";
import { NoteModel } from "../../DB/model/note.model.js"

export const createNote = async (inputs,{userId})=>{
    const note = await NoteModel.create({...inputs,userId})   
    return note
}

export const getNotebyId = async({userId},{id})=>{
    const note = await NoteModel.findById(id)
   if(!note){
        throw new Error(`Note not found`, {cause:{status:404}})
    }
    if(note.userId.toString() !== userId.toString()){
        throw new Error(`You are not the owner`, {cause:{status:403}})
    }
    return note
}

export const updateNote = async({userId},{id},inputs)=>{
    const note = await NoteModel.findByIdAndUpdate(id,{
        $set:inputs
},{
    returnDocument:'after'
})
    if(!note){
        throw new Error(`Note not found`, {cause:{status:404}})
    }
    if(note.userId.toString() !== userId.toString()){
        throw new Error(`You are not the owner`, {cause:{status:403}})
    }
    return note
}

export const replaceNote = async({userId},{id},inputs)=>{
    const note = await NoteModel.findOneAndReplace({_id:id},
        inputs,
        {
            returnDocument:'after'
        }
    )
    if(!note){
        throw new Error(`Note not found`, {cause:{status:404}})
    }
    if(note.userId.toString() !== userId.toString()){
        throw new Error(`You are not the owner`, {cause:{status:403}})
    }
    return note
}

export const updateTitle = async({userId},{title})=>{
    const notes = await NoteModel.updateMany(
        { userId },
        {
            $set: { title }
        }
    )

    if (!notes || notes.matchedCount === 0) {
        throw new Error(`Notes not found`, {cause:{status:404}})
    }

    return notes
}

export const deleteNote = async({userId},{noteId})=>{
    const note = await NoteModel.findOne({_id:noteId})
    if(!note){
        throw new Error(`Note not found`, {cause:{status:404}})
    }
    if(note.userId.toString() !== userId.toString()){
        throw new Error(`You are not the owner`, {cause:{status:403}})
    }
    await NoteModel.findByIdAndDelete(noteId)
    return note
    
}

export const getNoteByContent = async({content})=>{
    const note = await NoteModel.findOne({content})
    return note
}

export const retreiveNotesPaginated = async({userId, limit, page})=>{
    const pageNumber = Math.max(1, parseInt(page,10) || 1)
    const limitNumber = Math.max(1, parseInt(limit, 10) || 2);
    const skipCount = (pageNumber - 1) * limitNumber;
    const notes = await NoteModel.find({userId}).sort('-createdAt').limit(limitNumber).skip(skipCount)
    return notes
}

export const getNotes = async({userId})=>{
    const notes = await NoteModel.find({userId}).populate('userId','email -_id').select('title createdAt').lean()
    return notes
}

export const getNotesAggregate = async ({ userId, title }) => {
    const match = { userId: new mongoose.Types.ObjectId(userId) }

    if (title) {
        match.title = title
    }

    const notes = await NoteModel.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: 'Assignment08_users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {
                    name: '$user.name',
                    email: '$user.email'
                }
            }
        }
    ])

    return notes
}

export const deleteNotes = async({userId})=>{
   return await NoteModel.deleteMany({userId})
}