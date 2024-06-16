import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { Comment } from '../db/entity/Comment.entity'
import { AppDataSource } from '../db/data-source'

export default class PostCommentService {
  async createPostComment(
    postUuid: string,
    comment: Comment
  ): Promise<InsertResult> {
    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        content: comment.content.toLowerCase().trim(),
        post: { uuid: postUuid }
      })
      .returning('*')
      .execute()
  }

  async updatePostComment(
    postUuid: string,
    commentUuid: string,
    comment: Comment
  ): Promise<UpdateResult> {
    if (Object.prototype.hasOwnProperty.call(Object(comment), 'content')) {
      comment.content = comment.content.toLowerCase().trim()
    }
    return await AppDataSource.createQueryBuilder()
      .update(Comment)
      .set(comment)
      .where('uuid = :commentUuid AND post.uuid = :postUuid', {
        commentUuid,
        postUuid
      })
      .returning('*')
      .execute()
  }

  async deletePostComment(
    postUuid: string,
    commentUuid: string
  ): Promise<DeleteResult> {
    return await AppDataSource.createQueryBuilder()
      .delete()
      .from(Comment)
      .where('uuid = :commentUuid AND post.uuid = :postUuid', {
        commentUuid,
        postUuid
      })
      .execute()
  }
}
