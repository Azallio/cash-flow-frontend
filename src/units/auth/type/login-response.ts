import type { AuthUser } from './auth-user'

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}