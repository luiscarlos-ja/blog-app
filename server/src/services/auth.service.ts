import UserService from './user.service'
import { UserSchemaType } from '../schemas/user.schema'
import { comparepassword } from '../utils/encrypt.helper'
import { AppDataSource } from '../db/data-source'
import { User } from '../db/entity/User.entity'
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/config'

export default class AuthService {
  async signUp(user: UserSchemaType) {
    return await new UserService().createUser(user)
  }

  async signIn(username: string, password: string): Promise<string | null> {
    const user = await AppDataSource.getRepository(User).findOneOrFail({
      where: { username }
    })
    if (!comparepassword(user.password, password)) {
      return null
    }

    return jwt.sign({ uuid: user.uuid }, CONFIG.JWT_TOKEN, { expiresIn: '1h' })
  }
}
