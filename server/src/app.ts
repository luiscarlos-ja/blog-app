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
import { HTTPStatusCode } from './constants/http'
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware'

const app = express()

app.use(helmet())

const whitelist = ['https://localhost:8000', 'http://localhost:5173']
app.use(
  cors({
    origin: function (origin, callback) {
      if (undefined === origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.use(morgan('combined'))

app.use(rateLimiterMiddleware)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', api)

app.all('*', (_, res) => {
  res.status(HTTPStatusCode.NotFound).json({ message: 'Route not found' })
})

app.use(typeOrmErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

export default app
