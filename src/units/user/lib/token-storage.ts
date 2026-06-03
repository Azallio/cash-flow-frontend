const TOKEN_KEY = 'access_token'

export const tokenStorage = {
  get() {
    return localStorage.getItem(TOKEN_KEY) && sessionStorage.getItem(TOKEN_KEY)
  },

  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
    sessionStorage.setItem(TOKEN_KEY, token)
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
  },
}