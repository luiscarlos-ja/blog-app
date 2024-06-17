import express from 'express'
import usersRouter from './users/users.router'
import postsRouter from './posts/posts.router'
import userPostRouter from './users/userPosts.router'
import postsCommentRouter from './posts/postsComment.router'
import authRouter from './auth/auth.router'
import { authMiddleware } from '../middlewares/auth.middleware'

const api = express.Router()

api.use('/auth', authRouter)
api.use('/users', authMiddleware, usersRouter)
api.use('/users', authMiddleware, userPostRouter)
api.use('/posts', postsRouter)
api.use('/posts', postsCommentRouter)

export default api
