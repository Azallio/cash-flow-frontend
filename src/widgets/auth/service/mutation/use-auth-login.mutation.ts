import { useMutation } from '@tanstack/react-query'
import type { LoginRequest } from '@units/user/type'
import { postAuthLogin } from '@widgets/auth/api/method'

export const useAuthLoginMutation = () =>
  useMutation({
    mutationKey: ['auth-login'],
    mutationFn: (payload: LoginRequest) => postAuthLogin(payload),
  })
