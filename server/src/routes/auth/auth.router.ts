import express from 'express'
import multer from 'multer'

const authRouter = express.Router()
const upload = multer()

authRouter.post('/signin', upload.none())
authRouter.post('/signup', upload.none())

export default authRouter
