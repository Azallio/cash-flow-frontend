import { api } from '@shared/api/client'
import type { LoginRequest } from '../type/login-request'
import type { LoginResponse } from '../type/login-response'

export async function login(payload: LoginRequest) {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)

  return data
}
