import { Exclude, Expose, Type } from 'class-transformer'

export default class UserDTO {
  @Expose()
  uuid!: string

  @Expose()
  username!: string

  @Exclude() password!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date
}
