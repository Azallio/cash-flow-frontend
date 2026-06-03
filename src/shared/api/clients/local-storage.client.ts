import type { Http } from '@shared/types'
import { CookieClient } from './cookie.client'

type StorageKey = 'AuthToken'

const getTokens = (key: StorageKey): Http.AuthTokens | null => {
  try {
    const json = localStorage.getItem(key)
    if (!json) return null

    const parsedToken = JSON.parse(json) as Partial<Http.AuthTokens>
    const refreshToken = CookieClient.getRefreshToken() ?? parsedToken.refreshToken

    if (!parsedToken.accessToken || !refreshToken) return null

    if (!CookieClient.getRefreshToken() && parsedToken.refreshToken) {
      CookieClient.saveRefreshToken(parsedToken.refreshToken)
    }

    return {
      accessToken: parsedToken.accessToken,
      refreshToken,
    }
  } catch (error) {
    console.error('get auth tokens error:', error)
    return null
  }
}

const saveTokens = (key: StorageKey, authTokens: Http.AuthTokens) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        accessToken: authTokens.accessToken,
      }),
    )

    CookieClient.saveRefreshToken(authTokens.refreshToken)
  } catch (error) {
    console.error('save auth tokens error:', error)
  }
}

export const LocalStorageClient = {
  getAuthTokens: () => getTokens('AuthToken'),
  saveAuthTokens: (authTokens: Http.AuthTokens) => saveTokens('AuthToken', authTokens),
  clear: () => {
    localStorage.removeItem('AuthToken')
    CookieClient.clearRefreshToken()
  },
}
