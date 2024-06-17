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
  httpGetAllPostComments,
  httpUpdatePostComment
} from './postCommnet.controller'

const upload = multer()

const postsCommentRouter = express.Router()

postsCommentRouter.get(
  '/:uuid/comment',
  validatorRequestHandler(getCommentSchema, 'params'),
  httpGetAllPostComments
)

postsCommentRouter.post(
  '/:uuid/comment',
  upload.none(),
  validatorRequestHandler(getCommentSchema, 'params'),
  httpCreatePostComment
)
postsCommentRouter.patch(
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
