import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { deleteUser, getUser, login, signup, updateUser } from "./user.service.js";

const router = Router()

router.post('/signup', async(req,res, next)=>{
    const data = await signup(req.body)
    return successResponse({res,status:201,message:`Acccount created successfully`,data})
})

router.post('/login', async(req, res, next)=>{
    const data = await login(req.body)
    return successResponse({res,data})
})

router.patch('/:id', async(req,res,next)=>{
    const data = await updateUser(req.params, req.body)
    return successResponse({res,message:"User updated!",data})
})

router.delete('/', async(req, res, next)=>{
    await deleteUser(req.query);
    return successResponse({res,status:304})
})

router.get('/', async(req,res,next)=>{
    const data = await getUser(req.query)
    return successResponse({res,data})
})
export default router