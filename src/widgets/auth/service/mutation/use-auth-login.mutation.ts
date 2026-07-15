import { useMutation } from '@tanstack/react-query'
import { AuthApi, type AuthTypes } from '@widgets/auth'

export const useAuthLoginMutation = () =>
  useMutation({
    mutationKey: ['auth-login'],
    mutationFn: (payload: AuthTypes.Http.AuthLoginRequest) => AuthApi.Method.postAuthLogin(payload),
  })
