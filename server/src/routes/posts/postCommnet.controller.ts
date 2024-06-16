import { Request, Response, NextFunction } from 'express'
import CommentDTO from '../../db/dto/coment.dto'
import { plainToInstance } from 'class-transformer'
import { HTTPStatusCode } from '../../constants/http'
import PostCommentService from '../../services/postComment'

const postCommentService = new PostCommentService()

export async function httpCreatePostComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { postUuid } = req.params
    const comment = req.body
    const commentCreated = await postCommentService.createPostComment(
      postUuid,
      comment
    )
    const commentCreatedDTO = plainToInstance(
      CommentDTO,
      commentCreated.generatedMaps,
      {
        excludeExtraneousValues: true
      }
    )
    res.status(HTTPStatusCode.Created).json(commentCreatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpUpdatePostComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { postUuid, commentUuid } = req.params
    const comment = req.body
    const commentUpdated = await postCommentService.updatePostComment(
      postUuid,
      commentUuid,
      comment
    )
    const commentUpdatedDTO = plainToInstance(
      CommentDTO,
      commentUpdated.generatedMaps,
      {
        excludeExtraneousValues: true
      }
    )
    res.status(HTTPStatusCode.Ok).json(commentUpdatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpDeletePostComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { postUuid, commentUuid } = req.params
    await postCommentService.deletePostComment(postUuid, commentUuid)
    res.status(HTTPStatusCode.NoContent).send()
  } catch (error) {
    next(error)
  }
}
