import { useMutation } from '@tanstack/react-query'
import { postUserLogin } from '@units/user/api/post-user-login.api'
import { MutationKeys } from '@units/user/lib/enums/mutation-keys.enum'
import type { LoginRequest } from '@units/user/type'

export const useUserLoginMutation = () =>
  useMutation({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: (payload: LoginRequest) => postUserLogin(payload),
  })
