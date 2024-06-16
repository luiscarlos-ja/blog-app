import { Response, Request, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { badData } from '@hapi/boom'

interface CustomRequest extends Request {
  [key: string]: any
}

export function validatorRequestHandler(schema: ZodSchema, property: string) {
  return (req: CustomRequest, _: Response, next: NextFunction) => {
    const data = req[property]
    const result = schema.safeParse(data)
    if (!result.success) {
      const flattened = result.error.flatten()
      next(badData(JSON.stringify(flattened)))
    }
    next()
  }
}

export function validatorRequestAsyncHandler(
  schema: ZodSchema,
  property: string
) {
  return async (req: CustomRequest, _: Response, next: NextFunction) => {
    const data = req[property]
    const result = await schema.safeParseAsync(data)
    if (!result.success) {
      const flattened = result.error.flatten()
      next(badData(JSON.stringify(flattened)))
    }
    next()
  }
}
