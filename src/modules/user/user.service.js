import { UserModel } from "../../DB/model/user.model.js"

export const signup = async(inputs)=>{
    const existedUser = await UserModel.findOne({email:inputs.email})
    if(existedUser){
        throw new Error(`Email already exists!`,{cause:{status:409}})
    }
    const user = await UserModel.create(inputs)
    return user
}

export const login = async(inputs)=>{
    const user = await UserModel.findOne({
        email:inputs.email,
        password:inputs.password    
    })
    if(!user){
        throw new Error(`Invalid Email or password!`,{cause:{status:409}})
    }
    return user
}

export const updateUser = async({id},{name,email,phone,age})=>{
    const existedUser = await UserModel.findById(id)
    if(!existedUser){
        throw new Error(`User not found!`,{cause:{status:404}})
    }
    if(existedUser.email == email){
        throw new Error(`Email already exists!`,{cause:{status:409}})
    }
    const updatedUser = await UserModel.updateOne({_id:id},{
        name,
        email,
        age
    })
    return  updatedUser
}

export const deleteUser = async({id})=>{
    const deletedUser = await UserModel.findByIdAndDelete(id)
    if(!deletedUser){
        throw new Error(`User not found!`,{cause:{status:404}})
    }
}

export const getUser = async({id})=>{
    const user = await UserModel.findById(id)
    if(!user){
        throw new Error(`User not found!`,{cause:{status:404}})
    }
    return user
}