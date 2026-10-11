import { Router } from "express";
import { successResponse } from "../../common/utils/succuess.response.js";
import { createNote, deleteNote, deleteNotes, getNoteByContent, getNotebyId, getNotes, getNotesAggregate, replaceNote, retreiveNotesPaginated, updateNote, updateTitle } from "./note.service.js";

const router = Router()

router.post('/', async(req, res, next)=>{
    const data = await createNote(req.body,req.query)
    return successResponse({res,status:201,message:`Note created successfully!`,data})
})

router.get('/note-by-content',async(req, res, next)=>{
    const data = await getNoteByContent(req.query)
    return successResponse({res,data})
})

router.get('/', async(req, res, next)=>{
    const data = await getNotes(req.query)
    return successResponse({res,data})
})

router.get('/aggregate', async(req, res, next)=>{
    const data = await getNotesAggregate(req.query)
    return successResponse({res, data})
})

router.get('/paginate-sort', async(req, res, next)=>{
    const data = await retreiveNotesPaginated(req.query)
    return successResponse({res,data})
})

router.get('/:id', async(req, res, next)=>{
    const data = await getNotebyId(req.query, req.params)
    return successResponse({res,data})
})

router.put('/replace/:id', async(req,res,next)=>{
    const data = await replaceNote(req.query, req.params, req.body)
    return successResponse({res,data})

})

router.patch('/all', async(req, res, next)=>{
    const data = await updateTitle(req.query, req.body)
    return successResponse({res, data})
})

router.patch('/:id', async(req, res, next)=>{
    const data = await updateNote(req.query, req.params, req.body)
    return successResponse({res,data})
})

router.delete('/', async(req, res, next)=>{
    await deleteNotes(req.query)
    return successResponse({res,status:304})
})

router.delete('/:noteId', async(req, res, next)=>{
    const data = await deleteNote(req.query, req.params)
    return successResponse({res, data})
})
export default router