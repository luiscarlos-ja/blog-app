import express from 'express'
import multer from 'multer'
import {
  httpCreateUser,
  httpDeleteUser,
  httpGetAllUsers,
  httpGetUserById,
  httpUpdateUser
} from './users.controller'
import {
  validatorRequestAsyncHandler,
  validatorRequestHandler
} from '../../middlewares/validator.middleware'
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema
} from '../../schemas/user.schema'

const usersRouter = express.Router()
const upload = multer()

usersRouter.get('/', httpGetAllUsers)
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
usersRouter.patch(
  '/:uuid',
  upload.none(),
  validatorRequestHandler(getUserSchema, 'params'),
  validatorRequestAsyncHandler(updateUserSchema, 'body'),
  httpUpdateUser
)
usersRouter.delete(
  '/:uuid',
  validatorRequestHandler(getUserSchema, 'params'),
  httpDeleteUser
)

export default usersRouter
