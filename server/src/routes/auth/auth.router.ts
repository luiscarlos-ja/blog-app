import express from 'express'
import multer from 'multer'
import { validatorRequestAsyncHandler } from '../../middlewares/validator.middleware'
import { AuthSchema } from '../../schemas/auth.schema'
import { createUserSchema } from '../../schemas/user.schema'
import { httpSignIn, httpSignOut, httpSignUp } from './auth.controller'
import { authMiddleware } from '../../middlewares/auth.middleware'

const authRouter = express.Router()
const upload = multer()

authRouter.post(
  '/signin',
  upload.none(),
  validatorRequestAsyncHandler(AuthSchema, 'body'),
  httpSignIn
)
authRouter.post(
  '/signup',
  upload.none(),
  validatorRequestAsyncHandler(createUserSchema, 'body'),
  httpSignUp
)

authRouter.post('/signout', authMiddleware, upload.none(), httpSignOut)

export default authRouter
