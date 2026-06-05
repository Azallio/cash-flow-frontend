import { SharedApi, SharedUi, type SharedTypes } from '@shared'
import type { LoginRequest } from '@units/user/type'
import * as AuthService from '@widgets/auth/service'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

type Props = SharedTypes.Ui.PropsWithClassName<{
  onBackToLoginClick: () => void
}>

export const RegisterForm = (props: Props) => {
  const { className, onBackToLoginClick, ...restProps } = props
  const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' })

  const navigate = useNavigate()
  const {
    data: userData,
    error,
    isPending,
    mutate: register,
  } = AuthService.Mutation.useAuthRegisterMutation()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register(formData)
  }

  useEffect(() => {
    const tokens = userData?.data.data

    if (tokens) {
      SharedApi.Clients.AnyStorageClient.saveAuthTokens(tokens)
      navigate('/')
    }
  }, [userData, navigate])

  return (
    <div
      className={clsx(className, 'bg-surface flex w-109.5 flex-col gap-8 rounded-3xl px-14 py-8')}
      {...restProps}
    >
      <h1 className="text-center text-3xl font-bold">Создать аккаунт</h1>

      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <div className="flex flex-col gap-4">
          <SharedUi.Input
            type="email"
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <SharedUi.Input
            type="password"
            placeholder="Password"
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {error && <span className="text-primary text-xs">{error.message}</span>}
        </div>

        <SharedUi.Button
          type="submit"
          variant="color:primary size:md"
          className="w-full rounded-2xl"
          disabled={isPending}
        >
          {isPending ? 'Регистрируем...' : 'Sign up'}
        </SharedUi.Button>

        <SharedUi.Button
          type="button"
          variant="color:secondary size:md"
          className="w-full rounded-2xl"
          onClick={onBackToLoginClick}
        >
          Войти
        </SharedUi.Button>
      </form>
    </div>
  )
}
