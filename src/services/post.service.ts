import { AppDataSource } from '../db/data-source'
import { Post } from '../db/entity/Post.entity'

export default class PostService {
  async getAllPosts(
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
    filterBy: string
  ): Promise<[Post[], number]> {
    const userRepository = AppDataSource.getRepository(Post)
    const filterByString = filterBy.toLowerCase().trim()
    return await userRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.name LIKE :filterBy', {
        filterBy: `%${filterByString}%`
      })
      .orderBy(`post.${sortField}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()
  }
}
