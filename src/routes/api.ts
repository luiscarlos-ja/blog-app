import express from 'express'
import usersRouter from './users/users.router'
import postsRouter from './posts/posts.router'

const api = express.Router()

api.use('/users', usersRouter)
api.use('/posts', postsRouter)

export default api
