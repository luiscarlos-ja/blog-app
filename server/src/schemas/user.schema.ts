import { z } from 'zod'
import { AppDataSource } from '../db/data-source'
import { User } from '../db/entity/User.entity'

const uuid = z.string().uuid()
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
const passwordConfirm = z
  .string()
  .min(5, {
    message: 'Password Confirm must be longer than or equal to 5 characters'
  })
  .max(30, {
    message: 'Password Confirm must be shorter than or equal to 30 characters'
  })

const UserSchema = z.object({
  uuid,
  username,
  password,
  passwordConfirm
})

export type UserSchemaType = z.infer<typeof UserSchema>

export const getUserSchema = UserSchema.partial().required({ uuid: true })

export const createUserSchema = UserSchema.partial({
  uuid: true
})
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm']
  })
  .refine(({ username }) => /^[a-zA-Z0-9]+$/.test(username), {
    message: 'Username must contain only letters and numbers',
    path: ['username']
  })
  .refine(
    async ({ username }) => {
      try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({
          where: { username }
        })
        return user === null
      } catch (error) {
        return false
      }
    },
    {
      message: 'Username already exists',
      path: ['username']
    }
  )
