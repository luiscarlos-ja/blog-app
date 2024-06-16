import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { HTTPStatusCode } from '../../constants/http'
import { getAllPostsSchema } from '../../schemas/post.schema'
import { pagintateAndSort } from '../../utils/pagination.util'
import { CONFIG } from '../../config/config'
import { z } from 'zod'
import { badData } from '@hapi/boom'
import PostDTO from '../../db/dto/post.dto'
import PostService from '../../services/post.service'

const postService = new PostService()

export async function httpGetAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit, sortField, sortOrder, filterBy } =
      getAllPostsSchema.parse(req.query)

    const [posts, total] = await postService.getAllPosts(
      page,
      limit,
      sortField,
      sortOrder,
      filterBy
    )

    const postDTO = plainToInstance(PostDTO, posts, {
      excludeExtraneousValues: true
    })
    const response = pagintateAndSort(
      postDTO,
      total,
      {
        page,
        limit,
        sortField,
        sortOrder,
        filterBy
      },
      `${CONFIG.BASE_URL}/posts`
    )

    res.status(HTTPStatusCode.Ok).json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const flattened = error.flatten()
      next(badData(JSON.stringify(flattened)))
    }
    next(error)
  }
}
