import { login } from '../api/post-login.api'
import { tokenStorage } from '../lib/token-storage'
import type { AuthUser } from '../type/auth-user'

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const response = await login({ email, password })

    tokenStorage.set(response.accessToken)

    return response.user
  },

  logout() {
    tokenStorage.clear()
  },

  isAuthorized() {
    return Boolean(tokenStorage.get())
  },
}
