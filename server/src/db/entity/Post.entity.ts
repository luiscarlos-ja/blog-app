import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User.entity'
import { Comment } from './Comment.entity'

@Entity('posts', { schema: 'public' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  content!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => User, user => user.posts)
  user!: User

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[]
}
