import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { CONFIG } from '../config/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { User } from './entity/User.entity'
import { Post } from './entity/Post.entity'
import { Comment } from './entity/Comment.entity'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  NODE_ENV
} = CONFIG

export const entities = [User, Post, Comment]

export const DataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: NODE_ENV === 'development',
  entities,
  migrations: [],
  subscribers: []
}

export const AppDataSource = new DataSource(DataSourceOptions)
