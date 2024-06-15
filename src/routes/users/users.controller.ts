import { NextFunction, Response, Request } from 'express'
import UserService from '../../services/user.service'
import { HTTPStatusCode } from '../../constants/http'
import { plainToInstance } from 'class-transformer'
import UserDTO from '../../db/dto/user.dto'

const userService = new UserService()

export async function httpGetUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    const user = await userService.getUserById(uuid)
    const userDTO = plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Ok).json(userDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.body
    const userCreated = await userService.createUser(user)
    const userCreatedDTO = plainToInstance(UserDTO, userCreated.generatedMaps, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Created).json(userCreatedDTO)
  } catch (error) {
    next(error)
  }
}
