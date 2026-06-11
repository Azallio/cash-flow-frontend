import type { SharedTypes } from '@shared'
import React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = SharedTypes.Ui.PropsWithClassName<{
  data: { income: number; expense: number; date: string }[]
  colorFirst?: string
  colorSecond?: string
}>

export const DoubleSparkLine = (props: Props) => {
  const { className, data, colorFirst = '#22c55e', colorSecond = '#f43f5e', ...restProps } = props

  const id1 = React.useId()
  const id2 = React.useId()

  return (
    <ResponsiveContainer width="100%" height="100%" className={className} {...restProps}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={id1} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorFirst} stopOpacity={0.35} />
            <stop offset="100%" stopColor={colorFirst} stopOpacity={0} />
          </linearGradient>

          <linearGradient id={id2} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorSecond} stopOpacity={0.35} />
            <stop offset="100%" stopColor={colorSecond} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#888' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: 'short',
            })
          }
        />

        <YAxis
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
        />

        <Tooltip />

        <Area type="basis" dataKey="income" stroke={colorFirst} strokeWidth={2} fill={`url(#${id1})`} />

        <Area type="basis" dataKey="expense" stroke={colorSecond} strokeWidth={2} fill={`url(#${id2})`} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
