import { api } from '@shared/api/client'
import { login as loginApi } from '@units/user/api'
import { tokenStorage } from '@units/user/lib'
import type { AuthUser } from '@units/user/type'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login(email: string, password: string): Promise<void>
  logout(): void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 🔄 восстановление сессии при старте
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.get()

      if (!token) {
        setUser(null)
        setIsLoading(false)
        return
      }

      try {
        const { data } = await api.get<AuthUser>('/users/me')
        setUser(data)
      } catch (error) {
        tokenStorage.clear()
        setUser(null)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // 🔐 login
  const login = async (email: string, password: string) => {
    const response = await loginApi({ email, password })

    tokenStorage.set(response.accessToken)
    setUser(response.user)
  }

  // 🚪 logout
  const logout = () => {
    tokenStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return ctx
}
