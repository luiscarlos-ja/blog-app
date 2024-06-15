import express from 'express'
import { validatorRequestHandler } from '../../middlewares/validator.middleware'
import multer from 'multer'
import {
  createUpdateUserPostSchema,
  getPostSchema,
  getUserPostSchema
} from '../../schemas/post.schema'
import {
  httpCreateUserPost,
  httpDeleteUserPost,
  httpUpdateUserPost
} from './userPosts.controller'

export const userPostRouter = express.Router()
const upload = multer()

userPostRouter.post(
  '/:uuid/post',
  upload.none(),
  validatorRequestHandler(getPostSchema, 'params'),
  validatorRequestHandler(createUpdateUserPostSchema, 'body'),
  httpCreateUserPost
)
userPostRouter.patch(
  '/:userUuid/post/:postUuid',
  upload.none(),
  validatorRequestHandler(getUserPostSchema, 'params'),
  validatorRequestHandler(createUpdateUserPostSchema, 'body'),
  httpUpdateUserPost
)
userPostRouter.delete(
  '/:userUuid/post/:postUuid',
  validatorRequestHandler(getUserPostSchema, 'params'),
  httpDeleteUserPost
)

export default userPostRouter
