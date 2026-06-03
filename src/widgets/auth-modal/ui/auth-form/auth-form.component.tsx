import { SharedUi, type SharedTypes } from '@shared'
import { useAuth } from '@shared/service/provider/auth-provider.component'
import clsx from 'clsx'
import { useState } from 'react'

type Props = SharedTypes.Ui.PropsWithClassName<{}>

export const AuthForm = (props: Props) => {
  const { className, ...restProps } = props
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await login(email, password)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={clsx(className, 'bg-surface flex w-109.5 flex-col gap-8 rounded-3xl px-14 py-8')}
      {...restProps}
    >
      <h1 className="text-center text-3xl font-bold">Добро пожаловать!</h1>

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <SharedUi.Input
          type="email"
          placeholder="Email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <SharedUi.Input
          type="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SharedUi.Button
          type="submit"
          variant="color:primary size:md"
          className="w-full rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? 'Входим...' : 'Войти'}
        </SharedUi.Button>
      </form>
    </div>
  )
}
