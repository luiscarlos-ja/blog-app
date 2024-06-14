/* eslint-disable @typescript-eslint/indent */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

export enum UserRole {
  ADMIN = 'ADMIN',
  CUADRILLA = 'CUADRILLA'
}

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

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
