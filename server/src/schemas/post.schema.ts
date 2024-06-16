import { z } from 'zod'
import { paginateSchema } from './paginate.schema'

const uuid = z.string().uuid()
const name = z
  .string()
  .min(3, {
    message: 'Name must be longer than or equal to 3 characters'
  })
  .max(255, {
    message: 'Name must be shorter than or equal to 255 characters'
  })
const content = z
  .string()
  .min(3, {
    message: 'Content must be longer than or equal to 3 characters'
  })
  .max(255, {
    message: 'Content must be shorter than or equal to 255 characters'
  })

const PostSchema = z.object({
  uuid,
  name,
  content
})

export type PostSchemaType = z.infer<typeof PostSchema>

export const getPostSchema = PostSchema.partial().required({ uuid: true })
export const getUserPostSchema = z.object({
  userUuid: z.string().uuid(),
  postUuid: z.string().uuid()
})

export const getAllPostsSchema = z.object({
  ...paginateSchema,
  sortField: z
    .enum(['name', 'createdAt', 'updatedAt'])
    .optional()
    .default('createdAt')
})

export const createUpdateUserPostSchema = PostSchema.partial({
  uuid: true
}).refine(({ name }) => /^[a-zA-Z0-9 ]+$/.test(name), {
  message: 'Name must contain only letters and numbers',
  path: ['name']
})
