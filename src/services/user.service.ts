import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { AppDataSource } from '../db/data-source'
import { User } from '../db/entity/User.entity'
import { encryptPassword } from '../utils/encrypt.helper'
import { UserSchemaType } from '../schemas/user.schema'

export default class UserService {
  async getAllUsers(
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'ASC' | 'DESC',
    filterBy: string
  ): Promise<[User[], number]> {
    const userRepository = AppDataSource.getRepository(User)
    const filterByString = filterBy.toLowerCase().trim()
    return await userRepository
      .createQueryBuilder('user')
      .where('user.firstName LIKE :filterBy', {
        filterBy: `%${filterByString}%`
      })
      .orWhere('user.lastName LIKE :filterBy', {
        filterBy: `%${filterByString}%`
      })
      .orWhere('user.username LIKE :filterBy', {
        filterBy: `%${filterByString}%`
      })
      .orWhere('user.email LIKE :filterBy', {
        filterBy: `%${filterByString}%`
      })
      .orderBy(`user.${sortField}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()
  }

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
      firstName: user.firstName.toLowerCase().trim(),
      lastName: user.lastName.toLowerCase().trim(),
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

  async updateUser(uuid: string, user: UserSchemaType): Promise<UpdateResult> {
    if (Object.prototype.hasOwnProperty.call(Object(user), 'password')) {
      user.password = await encryptPassword(user.password)
    }
    if (Object.prototype.hasOwnProperty.call(Object(user), 'username')) {
      user.username = user.username.toLowerCase().trim()
    }
    if (Object.prototype.hasOwnProperty.call(Object(user), 'email')) {
      user.email = user.email.toLowerCase().trim()
    }
    if (Object.prototype.hasOwnProperty.call(Object(user), 'firstName')) {
      user.firstName = user.firstName.toLowerCase().trim()
    }
    if (Object.prototype.hasOwnProperty.call(Object(user), 'lastName')) {
      user.lastName = user.lastName.toLowerCase().trim()
    }
    const { passwordConfirm, ...rest } = Object.assign({}, user)
    return await AppDataSource.createQueryBuilder()
      .update(User)
      .set(rest)
      .where('uuid = :uuid', { uuid })
      .returning('*')
      .execute()
  }

  async deleteUser(uuid: string): Promise<DeleteResult> {
    return await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('uuid = :uuid', { uuid })
      .execute()
  }
}
