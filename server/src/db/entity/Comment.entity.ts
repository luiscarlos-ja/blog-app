import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User.entity'
import { Post } from './Post.entity'

@Entity('comments', { schema: 'public' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column({ nullable: false })
  content!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => User, user => user.comments)
  user!: User

  @ManyToOne(() => Post, post => post.comments)
  post!: Post
}
