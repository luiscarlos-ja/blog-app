import express from 'express'
import usersRouter from './users/users.router'
import postsRouter from './posts/posts.router'
import userPostRouter from './users/userPosts.router'
import postsCommentRouter from './posts/postsComment.router'
import authRouter from './auth/auth.router'

const api = express.Router()

api.use('auth', authRouter)
api.use('/users', usersRouter)
api.use('/users', userPostRouter)
api.use('/posts', postsRouter)
api.use('/posts', postsCommentRouter)

export default api
