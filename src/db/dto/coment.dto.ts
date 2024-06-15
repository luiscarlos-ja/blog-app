import { Expose, Transform, Type } from 'class-transformer'
import UserDTO from './user.dto'
import PostDTO from './post.dto'

export default class CommentDTO {
  @Expose()
  uuid!: string

  @Expose()
  @Transform(
    ({ value }) =>
      `${value.charAt(0).toUpperCase() as string} ${value.slice(1) as string}`
  )
  content!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date

  @Expose()
  @Type(() => UserDTO)
  user!: UserDTO

  @Expose()
  @Type(() => PostDTO)
  post!: PostDTO
}
