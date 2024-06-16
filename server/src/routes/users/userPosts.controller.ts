import { plainToInstance } from 'class-transformer'
import { Request, Response, NextFunction } from 'express'
import { HTTPStatusCode } from '../../constants/http'
import UserPostService from '../../services/userPost.service'
import PostDTO from '../../db/dto/post.dto'
import PostService from '../../services/post.service'

const userPostService = new UserPostService()
const postService = new PostService()

export async function httpCreateUserPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    const post = req.body
    const postCreated = await userPostService.createUserPost(uuid, post)
    const postWithUser = await postService.getPostById(
      postCreated.identifiers[0].uuid
    )
    const postCreatedDTO = plainToInstance(PostDTO, postWithUser, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Created).json(postCreatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpUpdateUserPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userUuid, postUuid } = req.params
    const post = req.body
    const postUpdated = await userPostService.updateUserPost(
      userUuid,
      postUuid,
      post
    )
    const postUpdatedDTO = plainToInstance(PostDTO, postUpdated.raw, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Ok).json(postUpdatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpDeleteUserPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userUuid, postUuid } = req.params
    await userPostService.deleteUserPost(userUuid, postUuid)
    res.status(HTTPStatusCode.NoContent).send()
  } catch (error) {
    next(error)
  }
}
