import { SharedService } from '@shared'
import type { TransactionsLib } from '@widgets/transactions'
import { useCallback, useState } from 'react'

export type FilterFieldKey = 'search' | 'startDate' | 'endDate'

export const useTransactionsFilters = () => {
  const { dateFrom, dateTo, setDate } = SharedService.Store.useDateStore()

  const [typeFilter, setTypeFilter] = useState<TransactionsLib.Enums.TransactionTypeEnum | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const setField = useCallback(
    (key: FilterFieldKey, value: string) => {
      switch (key) {
        case 'search':
          setSearch(value)
          break
        case 'startDate':
          setDate(new Date(value), dateTo)
          break
        case 'endDate':
          setDate(dateFrom, new Date(value))
          break
      }
    },
    [dateFrom, dateTo, setDate],
  )

  const reset = useCallback(() => {
    setTypeFilter('ALL')
    setSearch('')
    setDate(dateFrom, dateTo)
  }, [dateFrom, dateTo, setDate])

  const setDateRange = useCallback(
    (start: string, end: string) => {
      setDate(new Date(start), new Date(end))
    },
    [setDate],
  )

  return {
    typeFilter,
    search,
    startDate: dateFrom.toISOString(),
    endDate: dateTo.toISOString(),

    setTypeFilter,
    setSearch,
    setStartDate: (value: string) => {
      setDate(new Date(value), dateTo)
    },
    setEndDate: (value: string) => {
      setDate(dateFrom, new Date(value))
    },

    setField,
    setDateRange,
    reset,
  }
}
