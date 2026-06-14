export const formatDate = (value: string): string => {
  const date = new Date(value)
  const now = new Date()

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()

  if (isSameDay(date, now)) return 'Сегодня'

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(date, yesterday)) return 'Вчера'

  const isSameYear = date.getFullYear() === now.getFullYear()

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    ...(isSameYear ? {} : { year: 'numeric' }),
  })
}
