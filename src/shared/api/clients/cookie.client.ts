const REFRESH_TOKEN_COOKIE_KEY = 'refresh_token'

const getCookieValue = (key: string): string | null => {
  if (typeof document === 'undefined') return null

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = new RegExp(`(?:^|; )${escapedKey}=([^;]*)`).exec(document.cookie)

  return match ? decodeURIComponent(match[1]) : null
}

const setCookieValue = (key: string, value: string) => {
  if (typeof document === 'undefined') return

  const securePart = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${key}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${securePart}`
}

const clearCookieValue = (key: string) => {
  if (typeof document === 'undefined') return

  const securePart = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${key}=; Max-Age=0; Path=/; SameSite=Lax${securePart}`
}

export const CookieClient = {
  getRefreshToken: () => getCookieValue(REFRESH_TOKEN_COOKIE_KEY),
  saveRefreshToken: (refreshToken: string) => { setCookieValue(REFRESH_TOKEN_COOKIE_KEY, refreshToken); },
  clearRefreshToken: () => { clearCookieValue(REFRESH_TOKEN_COOKIE_KEY); },
}
