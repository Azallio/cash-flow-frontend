import { useMutation } from '@tanstack/react-query'
import type { AuthTypes } from '@widgets/auth'
import { postAuthRegister } from '@widgets/auth/api/method'

export const useAuthRegisterMutation = () =>
  useMutation({
    mutationKey: ['auth-register'],
    mutationFn: (payload: AuthTypes.Http.AuthLoginRequest) => postAuthRegister(payload),
  })
