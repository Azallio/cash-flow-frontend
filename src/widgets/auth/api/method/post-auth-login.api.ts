import { SharedApi, type SharedTypes } from '@shared'
import type { AuthTypes } from '@widgets/auth'

export const postAuthLogin = async (payload: AuthTypes.Http.AuthLoginRequest) => {
  return await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<SharedTypes.Http.AuthTokens>>(
    '/auth/login',
    payload,
  )
}
