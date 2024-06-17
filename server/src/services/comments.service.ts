import { EntityNotFoundError } from 'typeorm'
import { AppDataSource } from '../db/data-source'
import { Comment } from '../db/entity/Comment.entity'

export default class CommentsService {
  async getCommentById(uuid: string): Promise<Comment> {
    const comment = await AppDataSource.getRepository(Comment)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where('comment.uuid = :uuid', { uuid })
      .getOne()

    if (!comment) {
      throw new EntityNotFoundError('Comment not found', uuid)
    }
    return comment
  }
}
