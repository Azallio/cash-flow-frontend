import { SharedApi, type SharedTypes } from '@shared'
import type { LoginRequest, LoginResponse } from '@units/user/type'

export const postAuthLogin = async (payload: LoginRequest) => {
  return await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<LoginResponse>>(
    '/auth/login',
    payload,
  )
}
