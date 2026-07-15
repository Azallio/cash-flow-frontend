import type { Http } from '@shared/types'

import { LocalStorageClient } from './local-storage.client'
import { SessionStorageClient } from './session-storage.client'

export const AnyStorageClient = {
  getAuthTokens: () => SessionStorageClient.getAuthTokens() ?? LocalStorageClient.getAuthTokens(),
  saveAuthTokens: (authTokens: Http.AuthTokens) => {
    LocalStorageClient.saveAuthTokens(authTokens)
    SessionStorageClient.saveAuthTokens(authTokens)
  },
  clear: () => {
    LocalStorageClient.clear()
    SessionStorageClient.clear()
  },
  persistToLocalStorage: () => {
    const tokens = SessionStorageClient.getAuthTokens()
    if (tokens) {
      LocalStorageClient.saveAuthTokens(tokens)
    }
  },
}
