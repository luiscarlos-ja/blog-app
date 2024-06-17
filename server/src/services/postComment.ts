import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { Comment } from '../db/entity/Comment.entity'
import { AppDataSource } from '../db/data-source'

export default class PostCommentService {
  async getAllPostComments(
    uuid: string,
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
    _filterBy: string
  ): Promise<[Comment[], number]> {
    return await AppDataSource.getRepository(Comment)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where('comment.post.uuid = :uuid', { uuid })
      .orderBy(`comment.${sortField}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()
  }

  async createPostComment(
    postUuid: string,
    userUuid: string,
    comment: Comment
  ): Promise<InsertResult> {
    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        content: comment.content.toLowerCase().trim(),
        post: { uuid: postUuid },
        user: { uuid: userUuid }
      })
      .returning('*')
      .execute()
  }

  async updatePostComment(
    postUuid: string,
    commentUuid: string,
    userUuid: string,
    comment: Comment
  ): Promise<UpdateResult> {
    if (Object.prototype.hasOwnProperty.call(Object(comment), 'content')) {
      comment.content = comment.content.toLowerCase().trim()
    }
    return await AppDataSource.createQueryBuilder()
      .update(Comment)
      .set(comment)
      .where(
        'uuid = :commentUuid AND post.uuid = :postUuid AND user.uuid = :userUuid',
        {
          commentUuid,
          postUuid,
          userUuid
        }
      )
      .returning('*')
      .execute()
  }

  async deletePostComment(
    postUuid: string,
    commentUuid: string,
    userUuid: string
  ): Promise<DeleteResult> {
    return await AppDataSource.createQueryBuilder()
      .delete()
      .from(Comment)
      .where(
        'uuid = :commentUuid AND post.uuid = :postUuid AND user.uuid = :userUuid',
        {
          commentUuid,
          postUuid,
          userUuid
        }
      )
      .execute()
  }
}
