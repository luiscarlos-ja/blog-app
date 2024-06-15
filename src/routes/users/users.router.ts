import express from 'express'
import multer from 'multer'
import { httpCreateUser, httpGetUserById } from './users.controller'
import {
  validatorRequestAsyncHandler,
  validatorRequestHandler
} from '../../middlewares/validator.middleware'
import { createUserSchema, getUserSchema } from '../../schemas/user.schema'

const usersRouter = express.Router()
const upload = multer()

usersRouter.get(
  '/:uuid',
  validatorRequestHandler(getUserSchema, 'params'),
  httpGetUserById
)
usersRouter.post(
  '/',
  upload.none(),
  validatorRequestAsyncHandler(createUserSchema, 'body'),
  httpCreateUser
)

export default usersRouter
