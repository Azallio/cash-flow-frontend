import { useMutation } from '@tanstack/react-query'
import type { LoginRequest } from '@units/user/type'
import { postAuthRegister } from '@widgets/auth/api/method'

export const useAuthRegisterMutation = () =>
  useMutation({
    mutationKey: ['auth-register'],
    mutationFn: (payload: LoginRequest) => postAuthRegister(payload),
  })
