import express from 'express'
import upload from '../middleware/multer.js'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { getUser, updateUser } from '../controller/user.controller.js'
 
const userRoute = express.Router()

userRoute.get('/get-user/:userid', getUser)  
 
userRoute.put('/update-user/:userid',  upload.single("file"), isAuthenticated,  updateUser) 

export default userRoute