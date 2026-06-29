export const BASE_API_URL =
  typeof window === 'undefined'
    ? (process.env.VITE_BASE_API_URL ?? '/api') // SSR — Node.js
    : (import.meta.env.VITE_BASE_API_URL ?? '/api') // Клиент — браузер
