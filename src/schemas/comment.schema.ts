import { z } from 'zod'

const uuid = z.string().uuid()
const content = z
  .string()
  .min(3, {
    message: 'Content must be longer than or equal to 3 characters'
  })
  .max(255, {
    message: 'Content must be shorter than or equal to 255 characters'
  })

const CommentSchema = z.object({
  uuid,
  content
})

export type CommentSchemaType = z.infer<typeof CommentSchema>

export const getCommentSchema = CommentSchema.partial({ uuid: true })

export const getPostCommentSchema = z.object({
  postUuid: z.string().uuid(),
  commentUuid: z.string().uuid()
})

export const updatePostCommentSchema = CommentSchema.omit({ uuid: true })
