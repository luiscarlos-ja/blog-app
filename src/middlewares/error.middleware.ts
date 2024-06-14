import { NextFunction, Request, Response } from 'express'
import { Boom } from '@hapi/boom'
import { HTTPStatusCode } from '../constants/http'
import { EntityNotFoundError } from 'typeorm'

export function errorHandler(
  _err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.log(_err)
  res.status(HTTPStatusCode.InternalServerError).json('Internal Server Error')
}

export function boomErrorHandler(
  err: Boom,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

export function typeOrmErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof EntityNotFoundError) {
    res.status(HTTPStatusCode.NotFound).json({
      message: 'Entity not found'
    })
  } else {
    next(err)
  }
}
