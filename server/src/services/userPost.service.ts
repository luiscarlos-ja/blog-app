import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { AppDataSource } from '../db/data-source'
import { Post } from '../db/entity/Post.entity'

export default class UserPostService {
  async createUserPost(userUuid: string, post: Post): Promise<InsertResult> {
    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        name: post.name.toLowerCase().trim(),
        content: post.content,
        user: { uuid: userUuid }
      })
      .returning('*')
      .execute()
  }

  async updateUserPost(
    userUuid: string,
    postUuid: string,
    post: Post
  ): Promise<UpdateResult> {
    if (Object.prototype.hasOwnProperty.call(Object(post), 'name')) {
      post.name = post.name.toLowerCase().trim()
    }
    return await AppDataSource.createQueryBuilder()
      .update(Post)
      .set(post)
      .where('uuid = :postUuid AND user.uuid = :userUuid', {
        postUuid,
        userUuid
      })
      .returning('*')
      .execute()
  }

  async deleteUserPost(
    userUuid: string,
    postUuid: string
  ): Promise<DeleteResult> {
    return await AppDataSource.createQueryBuilder()
      .delete()
      .from(Post)
      .where('uuid = :postUuid AND user.uuid = :userUuid', {
        postUuid,
        userUuid
      })
      .execute()
  }
}
