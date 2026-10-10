import {bootStrapDB} from './DB/connection.db.js'
import { globalErrorHandling } from './middleware/index.js'
import {    userController} from './modules/index.js'
import express from 'express'
import cors from 'cors'
const app = express()



bootStrapDB(app)
app.use(cors(), express.json())



// app.use("/auth",authenticationController)
app.use('/users',userController)

app.get('/', (req, res) => res.send('Hello World!'))


app.use((req,res,next)=>{
    return res.status(404).json({message: "Not Found!"})
})

app.use(globalErrorHandling)
