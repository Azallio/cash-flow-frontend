import { SharedApi, SharedUi, type SharedTypes } from '@shared'
import { UserApiService, UserTypes } from '@units/user'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

type Props = SharedTypes.Ui.PropsWithClassName

export const AuthForm = (props: Props) => {
  const { className, ...restProps } = props
  const [data, setData] = useState<UserTypes.LoginRequest>({ email: '', password: '' })

  const { data: userData, error, isPending, mutate: login } = UserApiService.mutations.useUserLoginMutation()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    login(data)
  }

  useEffect(() => {
    if (userData?.data.data) {
      SharedApi.Clients.AnyStorageClient.saveAuthTokens(userData.data.data)
      navigate('/')
    }
  }, [userData, navigate])

  return (
    <div
      className={clsx(className, 'bg-surface flex w-109.5 flex-col gap-8 rounded-3xl px-14 py-8')}
      {...restProps}
    >
      <h1 className="text-center text-3xl font-bold">Добро пожаловать!</h1>

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-4">
          <SharedUi.Input
            type="email"
            placeholder="Email"
            label="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <SharedUi.Input
            type="password"
            placeholder="Password"
            label="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {error && <span className="text-primary text-xs">{error.message}</span>}
        </div>

        <SharedUi.Button
          type="submit"
          variant="color:primary size:md"
          className="w-full rounded-2xl"
          disabled={isPending}
        >
          {isPending ? 'Входим...' : 'Войти'}
        </SharedUi.Button>
      </form>
    </div>
  )
}
