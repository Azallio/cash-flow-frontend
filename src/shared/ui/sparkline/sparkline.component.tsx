import { type SharedTypes } from '@shared'
import clsx from 'clsx'
import React from 'react'
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type SparkLineDate<T> = {
  date: string
  value: T
}

type SparklineType = 'single' | 'multi'

type SparklineProps<T, Type extends SparklineType> = SharedTypes.Ui.PropsWithClassName<{
  data: SparkLineDate<T>[]
  dataTypeNames: string[]
  color?: Type extends 'single' ? string : string[]
}>

const useGetGradientIds = (count: number) => {
  const ids = React.useId()
  return Array.from({ length: count }, (_, index) => `sparkline-gradient-${ids}-${index}`)
}

export const Sparkline = <T, Type extends SparklineType>(props: SparklineProps<T, Type>) => {
  const { className, data, color, dataTypeNames, ...restProps } = props
  const chartData = data.map((item) => ({
    date: item.date,
    ...(typeof item.value === 'object' ? item.value : { value: item.value }),
  }))
  const gradientIds = useGetGradientIds(dataTypeNames.length)

  return (
    <div className={className} {...restProps}>
      <ResponsiveContainer width="100%" height={dataTypeNames.length < 2 ? 100 : undefined}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            {gradientIds.map((id, index) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={Array.isArray(color) ? color[index] : color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={Array.isArray(color) ? color[index] : color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd" //
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })
            }}
          />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              const point = payload?.[0]?.payload
              if (!active || !point) return null
              return (
                <div className="flex w-40! flex-col gap-1 bg-transparent">
                  <div className='text-gray-400'>{point.date}</div>
                  {dataTypeNames.map((name) => (
                    <div
                      key={name}
                      className={clsx(
                        'flex items-center gap-2 text-sm',
                        point[name] === 0 && 'opacity-50',
                        name === 'income' && 'text-green-500',
                        name === 'expense' && 'text-red-500',
                      )}
                    >
                      {name}: {point[name]} ₽
                    </div>
                  ))}
                </div>
              )
            }}
          />

          {dataTypeNames.map((name, index) => (
            <Area
              key={`area-${name}`}
              type="monotone"
              dataKey={name}
              stroke="none"
              fill={`url(#${gradientIds[index]})`}
            />
          ))}

          {dataTypeNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={Array.isArray(color) ? color[index] : color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: Array.isArray(color) ? color[index] : color }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
