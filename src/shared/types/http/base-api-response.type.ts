export interface BaseApiResponse<T> {
  data: T
  errors: string[]
  status: number
}