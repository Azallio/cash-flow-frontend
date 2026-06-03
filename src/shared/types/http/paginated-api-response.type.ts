import type { BaseApiResponse } from './base-api-response.type'

export type PaginatedApiResponse<T> = BaseApiResponse<{
  items: T[]
  totalItems: number
}>
