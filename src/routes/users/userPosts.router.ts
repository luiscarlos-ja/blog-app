// import express from 'express'
// import { validatorRequestHandler } from '../../middlewares/validator.middleware'
// import multer from 'multer'

// export const postsRouter = express.Router()
// const upload = multer()

// postsRouter.post(
//   '/',
//   upload.none(),
//   validatorRequestHandler(createPostSchema, 'body'),
//   httpCreateUserPost
// )
// postsRouter.patch(
//   '/:uuid',
//   upload.none(),
//   // validatorRequestHandler(getPostSchema, 'params'),
//   validatorRequestHandler(updatePostSchema, 'body'),
//   httpUpdateUserPost
// )
// postsRouter.delete(
//   '/:uuid',
//   validatorRequestHandler(getPostSchema, 'params'),
//   httpDeleteUserPost
// )
