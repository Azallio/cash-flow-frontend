import type { TransactionFilterType } from '@shared/lib/consts/transactions-page.const'
import { create } from 'zustand'

interface TransactionsFilterStore {
  typeFilter: TransactionFilterType
  search: string
  setTypeFilter: (value: TransactionFilterType) => void
  setSearch: (value: string) => void
  reset: () => void
}

export const useTransactionsFilterStore = create<TransactionsFilterStore>((set) => ({
  typeFilter: 'ALL',
  search: '',
  setTypeFilter: (value) => set({ typeFilter: value }),
  setSearch: (value) => set({ search: value }),
  reset: () => set({ typeFilter: 'ALL', search: '' }),
}))
