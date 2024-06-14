import { Exclude, Expose, Transform, Type } from 'class-transformer'

export default class UserDTO {
  @Expose()
  uuid!: string

  @Expose()
  username!: string

  @Expose()
  email!: string

  @Exclude() password!: string

  @Expose()
  @Transform(({ value }) =>
    value.replace(/(^\w)|([-\s]\w)/g, (c: string) => c.toUpperCase())
  )
  firstName!: string

  @Expose()
  @Transform(({ value }) =>
    value.replace(/(^\w)|([-\s]\w)/g, (c: string) => c.toUpperCase())
  )
  lastName!: string

  @Expose()
  @Type(() => Date)
  createdAt!: Date

  @Expose()
  @Type(() => Date)
  updatedAt!: Date
}
