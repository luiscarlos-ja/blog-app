import { RateLimiterMemory } from 'rate-limiter-flexible'
import { CONFIG } from '../config/config'
import { HTTPStatusCode } from '../constants/http'
import { NextFunction, Request, Response } from 'express'

const rateLimiter = new RateLimiterMemory({
  points: Number(CONFIG.RATE_LIMIT_POINTS),
  duration: Number(CONFIG.RATE_LIMIT_DURATION)
})

export function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  rateLimiter
    .consume(req.ip ?? '')
    .then(() => {
      next()
    })
    .catch(err => {
      const msBeforeNext = err.msBeforeNext as number
      res.set({
        'Retry-After': msBeforeNext / 1000,
        'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext)
      })
      res.status(HTTPStatusCode.TooManyRequests).json('Too Many Requests')
    })
}
