import type { SharedTypes } from '@shared'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

type Props = SharedTypes.Ui.PropsWithClassName<{
  data: number[]
  color?: string
}>

export const Sparkline = ({ data, color = '#22c55e', className }: Props) => {
  const chartData = data.map((value) => ({ value }))

  return (
    <ResponsiveContainer width="100%" height={40} className={className}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
