import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { HTTPStatusCode } from '../constants/http'
import { CONFIG } from '../config/config'

export interface AuthRequest extends Request {
  authUser: string | jwt.JwtPayload
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    res.status(HTTPStatusCode.Unauthorized).json('Unauthorized')
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_TOKEN)
    ;(req as AuthRequest).authUser = decoded
    next()
  } catch (error) {
    res.status(HTTPStatusCode.Unauthorized).json('Unauthorized')
  }
}
