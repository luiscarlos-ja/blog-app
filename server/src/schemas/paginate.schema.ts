import { z } from 'zod'

export const paginateSchema = {
  filterBy: z
    .string()
    .max(255, {
      message: 'Filter By must be shorter than or equal to 255 characters'
    })
    .optional()
    .default(''),
  page: z
    .string()
    .optional()
    .default('1')
    .refine(val => !isNaN(parseInt(val)), {
      message: 'Page must be a number'
    })
    .transform(val => parseInt(val)),
  limit: z
    .string()
    .optional()
    .default('10')
    .refine(val => !isNaN(parseInt(val)), {
      message: 'Limit must be a number'
    })
    .transform(val => parseInt(val)),
  sortOrder: z.enum(['ASC', 'DESC']).optional().default('DESC')
}
