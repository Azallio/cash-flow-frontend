import { AuthForm, RegisterForm } from '@widgets/auth/ui'
import { useState } from 'react'

export const AuthWidget = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  return (
    <section className="flex h-full items-center justify-center">
      {isRegisterMode ? (
        <RegisterForm onBackToLoginClick={() => setIsRegisterMode(false)} />
      ) : (
        <AuthForm onSignUpClick={() => setIsRegisterMode(true)} />
      )}
    </section>
  )
}
