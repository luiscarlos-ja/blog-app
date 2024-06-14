import { NextFunction, Response, Request } from 'express'
import UserService from '../../services/user.service'
import { HTTPStatusCode } from '../../constants/http'
import { plainToInstance } from 'class-transformer'
import UserDTO from '../../db/dto/user.dto'
import { pagintateAndSort } from '../../utils/pagination.util'
import { CONFIG } from '../../config/config'
import { getAllUsersSchema } from '../../schemas/user.schema'
import { z } from 'zod'
import { badData } from '@hapi/boom'

const userService = new UserService()

export async function httpGetAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit, sortField, sortOrder, filterBy } =
      getAllUsersSchema.parse(req.query)

    const [users, total] = await userService.getAllUsers(
      page,
      limit,
      sortField,
      sortOrder,
      filterBy
    )

    const usersDTO = plainToInstance(UserDTO, users, {
      excludeExtraneousValues: true
    })
    const response = pagintateAndSort(
      usersDTO,
      total,
      {
        page,
        limit,
        sortField,
        sortOrder,
        filterBy
      },
      `${CONFIG.BASE_URL}/users`
    )

    res.status(HTTPStatusCode.Ok).json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const flattened = error.flatten()
      next(badData(JSON.stringify(flattened)))
    }
    next(error)
  }
}

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

export async function httpUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    const user = req.body
    const updatedUser = await userService.updateUser(uuid, user)
    const userUpdatedDTO = plainToInstance(UserDTO, updatedUser.raw, {
      excludeExtraneousValues: true
    })
    res.status(HTTPStatusCode.Ok).json(userUpdatedDTO)
  } catch (error) {
    next(error)
  }
}

export async function httpDeleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { uuid } = req.params
    await userService.deleteUser(uuid)
    res.status(HTTPStatusCode.NoContent).json()
  } catch (error) {
    next(error)
  }
}
