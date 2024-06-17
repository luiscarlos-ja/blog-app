import { z } from 'zod'
import { AppDataSource } from '../db/data-source'
import { User } from '../db/entity/User.entity'

const username = z
  .string()
  .min(3, { message: 'Username must be longer than or equal to 3 characters' })
  .max(30, {
    message: 'Username must be shorter than or equal to 30 characters'
  })
const password = z
  .string()
  .min(5, { message: 'Password must be longer than or equal to 5 characters' })
  .max(30, {
    message: 'Password must be shorter than or equal to 30 characters'
  })

export const AuthSchema = z
  .object({
    username,
    password
  })
  .refine(
    async ({ username }) => {
      try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({
          where: { username }
        })
        return user !== null
      } catch (error) {
        return false
      }
    },
    {
      message: 'Username not exists',
      path: ['username']
    }
  )

export type AuthSchemaType = z.infer<typeof AuthSchema>
