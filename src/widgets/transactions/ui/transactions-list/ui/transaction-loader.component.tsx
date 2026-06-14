import { useTheme } from '@shared/service'

export function TransactionLoader() {
  const { mode } = useTheme()
  return (
    <div className={`animate-pulse rounded-xl p-4 ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className={`mb-2 h-4 w-1/3 rounded ${mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
      <div className={`h-3 w-1/2 rounded ${mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
    </div>
  )
}
