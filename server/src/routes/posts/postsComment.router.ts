import express from 'express'
import multer from 'multer'
import { validatorRequestHandler } from '../../middlewares/validator.middleware'
import {
  getCommentSchema,
  getPostCommentSchema,
  updatePostCommentSchema
} from '../../schemas/comment.schema'
import {
  httpCreatePostComment,
  httpDeletePostComment,
  httpUpdatePostComment
} from './postCommnet.controller'

const upload = multer()

const postsCommentRouter = express.Router()

postsCommentRouter.post(
  '/:uuid/comment',
  upload.none(),
  validatorRequestHandler(getCommentSchema, 'params'),
  httpCreatePostComment
)
postsCommentRouter.put(
  '/:postUuid/comment/:commentUuid',
  upload.none(),
  validatorRequestHandler(getPostCommentSchema, 'params'),
  validatorRequestHandler(updatePostCommentSchema, 'body'),
  httpUpdatePostComment
)
postsCommentRouter.delete(
  '/:postUuid/comment/:commentUuid',
  upload.none(),
  validatorRequestHandler(getPostCommentSchema, 'params'),
  httpDeletePostComment
)

export default postsCommentRouter
