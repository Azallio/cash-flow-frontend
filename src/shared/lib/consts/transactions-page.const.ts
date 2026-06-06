import { TransactionTypeEnum } from '@shared/lib/enums'

export type TransactionFilterType = 'ALL' | TransactionTypeEnum.EXPENSE | TransactionTypeEnum.INCOME

export const TransactionFilterTypeOptions = [
  { value: 'ALL', label: 'Все типы' },
  { value: TransactionTypeEnum.INCOME, label: 'Доходы' },
  { value: TransactionTypeEnum.EXPENSE, label: 'Расходы' },
] as const

export const TransactionFilterInputFields = [
  { key: 'search', type: 'text', placeholder: 'Поиск' },
  { key: 'startDate', type: 'date', placeholder: '' },
  { key: 'endDate', type: 'date', placeholder: '' },
] as const

export const TransactionSummaryCards = [
  { key: 'income', title: 'Доходы' },
  { key: 'expense', title: 'Расходы' },
  { key: 'balance', title: 'Баланс' },
] as const

export const TransactionTypeToggleOptions = [
  { value: TransactionTypeEnum.INCOME, label: 'Доход' },
  { value: TransactionTypeEnum.EXPENSE, label: 'Расход' },
] as const

export const TransactionFormInputFields = [
  { key: 'amount', label: 'Сумма', type: 'number', placeholder: '5000' },
  { key: 'description', label: 'Описание', type: 'text', placeholder: 'Зарплата за июнь' },
  { key: 'createdAt', label: 'Дата', type: 'date', placeholder: '' },
] as const

export const CategoryFormInputFields = [
  { key: 'title', placeholder: 'Новая категория' },
  { key: 'description', placeholder: 'Описание категории' },
] as const
