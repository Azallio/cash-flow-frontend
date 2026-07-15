import { SharedApi, type SharedTypes } from '@shared'
import type { AuthTypes } from '@widgets/auth'

export const postAuthRegister = async (payload: AuthTypes.Http.AuthLoginRequest) => {
  const res = await SharedApi.baseClient.post<SharedTypes.Http.BaseApiResponse<SharedTypes.Http.AuthTokens>>(
    '/auth/register',
    payload,
  )

  return res.data.data
}
