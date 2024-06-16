interface PaginationOptions {
  page: number
  limit: number
  sortField: string
  sortOrder: 'ASC' | 'DESC'
  filterBy: string
}

export interface PaginatedResult<T> {
  data: T[]
  meta: {
    totalRecords: number
    currentPage: number
    totalPages: number
    pageSize: number
    sortBy: string
    filterBy: string
  }
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
}

export const pagintateAndSort = <T>(
  results: T[],
  total: number,
  options: PaginationOptions,
  baseUrl: string
): PaginatedResult<T> => {
  const { page, limit, sortField, sortOrder, filterBy } = options
  let totalPages = Math.ceil(total / limit)
  totalPages = totalPages === 0 ? 1 : totalPages

  return {
    data: results,
    meta: {
      totalRecords: total,
      currentPage: page,
      totalPages,
      pageSize: limit,
      sortBy: `${sortField} ${sortOrder}`,
      filterBy
    },
    links: {
      first: `${baseUrl}?page=1&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}`,
      last: `${baseUrl}?page=${totalPages}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}`,
      next:
        page < totalPages
          ? `${baseUrl}?page=${page + 1}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}`
          : null,
      prev:
        page > 1
          ? `${baseUrl}?page=${page - 1}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}`
          : null
    }
  }
}
