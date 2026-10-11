import mongoose from "mongoose"
import { DB_URI, PORT } from "../config.js"
import { UserModel } from "./model/user.model.js";
import { NoteModel } from "./model/note.model.js";

export const bootStrapDB = async(app)=>{
    try {
        await mongoose.connect(DB_URI)
        console.log(`DB Connected Successfully`);
        await UserModel.syncIndexes()
        await NoteModel.syncIndexes()
        app.listen(PORT, ()=>{
            console.log(`Connected on Port ${PORT}`);
        })

    } catch (error) {
        console.log(`Failed to connected to DB`);
        process.exit(1)
    }
}