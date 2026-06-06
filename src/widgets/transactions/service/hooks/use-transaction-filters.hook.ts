import type { TransactionTypeEnum } from '@shared/lib/enums'
import { useCallback, useState } from 'react'

export type FilterFieldKey = 'search' | 'startDate' | 'endDate'

export const useTransactionsFilters = () => {
  const [typeFilter, setTypeFilter] = useState<TransactionTypeEnum | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const setField = useCallback((key: FilterFieldKey, value: string) => {
    switch (key) {
      case 'search':
        setSearch(value)
        break
      case 'startDate':
        setStartDate(value)
        break
      case 'endDate':
        setEndDate(value)
        break
    }
  }, [])

  const reset = useCallback(() => {
    setTypeFilter('ALL')
    setSearch('')
    setStartDate('')
    setEndDate('')
  }, [])

  return {
    typeFilter,
    search,
    startDate,
    endDate,

    setTypeFilter,
    setSearch,
    setStartDate,
    setEndDate,

    setField,
    reset,
  }
}
