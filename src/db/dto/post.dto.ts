import { Expose, Transform, Type } from 'class-transformer'
import UserDTO from './user.dto'

export default class PostDTO {
  @Expose()
  uuid!: string

  @Expose()
  @Transform(({ value }) =>
    value.replace(/(^\w)|([-\s]\w)/g, (c: string) => c.toUpperCase())
  )
  name!: string

  @Expose()
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
}
