import { AuthForm } from '@widgets/auth-modal/ui'
import { Layout } from '@widgets/layout/layout.component'

export default function AuthPage() {
  return (
    <Layout>
      <div className="flex h-full items-center justify-center">
        <AuthForm />
      </div>
    </Layout>
  )
}
