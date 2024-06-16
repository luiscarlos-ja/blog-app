import { InsertResult } from 'typeorm'
import { AppDataSource } from '../db/data-source'
import { User } from '../db/entity/User.entity'
import { encryptPassword } from '../utils/encrypt.helper'
import { UserSchemaType } from '../schemas/user.schema'

export default class UserService {
  async getUserById(uuid: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    return await userRepository
      .createQueryBuilder('user')
      .where('uuid = :uuid', { uuid })
      .getOneOrFail()
  }

  async createUser(user: UserSchemaType): Promise<InsertResult> {
    const encryptedPassword = await encryptPassword(user.password)
    const newUser = {
      ...user,
      username: user.username.toLowerCase().trim(),
      email: user.email.toLowerCase().trim(),
      password: encryptedPassword
    }
    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(newUser)
      .returning('*')
      .execute()
  }
}
