import { api } from '@shared/api/client'
import type { LoginRequest } from '../type/login-request'
import type { LoginResponse } from '../type/login-response'

type LoginApiResponse = {
  status: number
  data: LoginResponse
  error: string | null
}

export async function login(payload: LoginRequest) {
  const { data } = await api.post<LoginApiResponse>('/auth/login', payload)

  return data.data
}
