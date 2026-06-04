import { SharedApi, type SharedTypes } from '@shared'
import type { LoginRequest } from '../type/login-request'
import type { LoginResponse } from '../type/login-response'

export async function postUserLogin(payload: LoginRequest) {
  return await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<LoginResponse>>(
    '/auth/login',
    payload,
  )
}
