import express from 'express'
import { httpGetAllPosts } from './posts.controller'

const postsRouter = express.Router()

postsRouter.get('/', httpGetAllPosts)

export default postsRouter
