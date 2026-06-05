import type { SharedTypes } from '@shared'
import React from 'react'
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type Props = SharedTypes.Ui.PropsWithClassName<{
  data: { value: number; date: string }[]
  color?: string
}>

export const Sparkline = ({ data, color = '#22c55e', className }: Props) => {
  const gradientId = React.useId()

  const chartData = data

  return (
    <ResponsiveContainer width="100%" height={100} className={className}>
      <XAxis dataKey="date" hide />
      <Tooltip
        cursor={false}
        content={({ active, payload }) => {
          const point = payload?.[0]?.payload
          if (!active || !point) return null

          return (
            <div
              style={{
                background: '#111',
                color: '#fff',
                width: 100,
                padding: '6px 10px',
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              <div>{point.date}</div>
              <div>{point.value} ₽</div>
            </div>
          )
        }}
      />

      <ComposedChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area type="monotone" dataKey="value" stroke="none" fill={`url(#${gradientId})`} />

        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: color }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
