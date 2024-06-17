import { Request, Response, NextFunction } from 'express'
import CommentDTO from '../../db/dto/coment.dto'
import { plainToInstance } from 'class-transformer'
import { HTTPStatusCode } from '../../constants/http'
import PostCommentService from '../../services/postComment'
import { getAllCommentPostSchema } from '../../schemas/comment.schema'
import { pagintateAndSort } from '../../utils/pagination.util'
import { CONFIG } from '../../config/config'
import CommentsService from '../../services/comments.service'

const postCommentService = new PostCommentService()
const commentService = new CommentsService()

export async function httpGetAllPostComments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    const { page, limit, sortField, sortOrder, filterBy } =
      getAllCommentPostSchema.parse(req.query)

    const [comments, total] = await postCommentService.getAllPostComments(
      uuid,
      page,
      limit,
      sortField,
      sortOrder,
      filterBy
    )
    const commentsDTO = plainToInstance(CommentDTO, comments, {
      excludeExtraneousValues: true
    })
    const response = pagintateAndSort(
      commentsDTO,
      total,
      {
        page,
        limit,
        sortField,
        sortOrder,
        filterBy
      },
      `${CONFIG.BASE_URL}/posts/${uuid}/comments`
    )
    res.status(HTTPStatusCode.Ok).json(response)
  } catch (error) {
    next(error)
  }
}

export async function httpCreatePostComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    const comment = req.body
    const authUser = (req as any).authUser
    const commentCreated = await postCommentService.createPostComment(
      uuid,
      authUser.uuid,
      comment
    )
    const commentWithRelations = await commentService.getCommentById(
      commentCreated.identifiers[0].uuid
    )
    const commentCreatedDTO = plainToInstance(
      CommentDTO,
      commentWithRelations,
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
    const commentUpdatedDTO = plainToInstance(CommentDTO, commentUpdated.raw, {
      excludeExtraneousValues: true
    })
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
