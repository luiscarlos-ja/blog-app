import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Post } from './Post.entity'
import { Comment } from './Comment.entity'

@Entity('users', { schema: 'public' })
@Index(['username', 'email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column({ nullable: false })
  username!: string

  @Column({ nullable: false })
  email!: string

  @Column({ nullable: false })
  password!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Post, post => post.user)
  posts!: Post[]

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[]
}
