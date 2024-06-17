import { NextFunction, Request, Response } from 'express'
import AuthService from '../../services/auth.service'
import { plainToInstance } from 'class-transformer'
import UserDTO from '../../db/dto/user.dto'
import { HTTPStatusCode } from '../../constants/http'

const authService = new AuthService()

export async function httpSignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.body
    const userCreated = await authService.signUp(user)
    const userCreatedDTO = plainToInstance(UserDTO, userCreated.generatedMaps, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Created).json(userCreatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body
    const sigInResult = await authService.signIn(username, password)
    if (sigInResult === null) {
      res.status(HTTPStatusCode.Unauthorized).json('Unauthorized')
    } else {
      res.cookie('token', sigInResult.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      res.status(HTTPStatusCode.Ok).json(sigInResult.user)
    }
  } catch (error) {
    next(error)
  }
}

export async function httpSignOut(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.clearCookie('token')
  res.status(HTTPStatusCode.Ok).json('Logged out successfully')
}
