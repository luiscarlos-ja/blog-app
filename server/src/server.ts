import https from 'https'
import fs from 'fs'

import 'dotenv/config'

import app from './app'
import { AppDataSource } from './db/data-source'

const { PORT = 8000 } = process.env

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  },
  app
)

AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
    console.log('Data Source has been initialized!')
  })
  .catch(error => console.log(error))
