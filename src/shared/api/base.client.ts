import { SharedLib } from '@shared'
import type { AuthTokens, BaseApiResponse } from '@shared/types/http'
import axios from 'axios'
import { LocalStorageClient } from './clients/local-storage.client'
import { mutexClient } from './clients/mutex.client'
import { SessionStorageClient } from './clients/session-storage.client'

const instance = axios.create({
    baseURL: SharedLib.Consts.BASE_API_URL,
  })

const refreshTokens = async () => {
  const tokens =
    SessionStorageClient.getAuthTokens()
    ?? LocalStorageClient.getAuthTokens()

  if (!tokens) {
    clearUserAuth()
    throw new Error('No auth tokens')
  }

  const { data } =
    await instance.post<BaseApiResponse<AuthTokens>>(
      '/auth/refresh',
      {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    )

  LocalStorageClient.saveAuthTokens(data.data)
  SessionStorageClient.saveAuthTokens(data.data)
}

const clearUserAuth = () => {
  LocalStorageClient.clear()
  SessionStorageClient.clear()
  if (typeof window !== 'undefined') {
    window.location.replace('/auth')
  }
}

instance.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config
  const sessionTokens = SessionStorageClient.getAuthTokens()
  const localTokens = LocalStorageClient.getAuthTokens()
  const tokens = sessionTokens ?? localTokens
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }
  return config
})

instance.interceptors.response.use(undefined, async (error) => {
  if (
    !axios.isAxiosError(error) ||
    error.response?.status !== axios.HttpStatusCode.Unauthorized
  ) {
    return Promise.reject(error)
  }

  if (mutexClient.isLocked()) {
    await mutexClient.waitForUnlock()

    return instance.request({
      ...error.config,
    })
  }

  const release = await mutexClient.acquire()

  try {
    await refreshTokens()

    return instance.request({
      ...error.config,
    })
  } catch (e) {
    clearUserAuth()

    return Promise.reject(e)
  } finally {
    release()
  }
})

export { instance }
