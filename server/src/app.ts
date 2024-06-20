import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import api from './routes/api'
import {
  boomErrorHandler,
  errorHandler,
  typeOrmErrorHandler
} from './middlewares/error.middleware'
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware'
import path from 'path'

const app = express()

app.use(helmet())

const whitelist = [
  'https://localhost:8000',
  'https://localhost:5173',
  'https://3.232.56.58:8010'
]
app.use(
  cors({
    origin: function (origin, callback) {
      if (undefined === origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)
app.use(morgan('combined'))

app.use(rateLimiterMiddleware)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', api)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use(typeOrmErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

export default app
