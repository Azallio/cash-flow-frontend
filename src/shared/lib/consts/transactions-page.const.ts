import { TransactionsLib } from '@widgets/transactions'

export type TransactionFilterType =
  | 'ALL'
  | TransactionsLib.Enums.TransactionTypeEnum.EXPENSE
  | TransactionsLib.Enums.TransactionTypeEnum.INCOME

export const TransactionFilterTypeOptions = [
  { value: 'ALL', label: 'Все типы' },
  { value: TransactionsLib.Enums.TransactionTypeEnum.INCOME, label: 'Доходы' },
  { value: TransactionsLib.Enums.TransactionTypeEnum.EXPENSE, label: 'Расходы' },
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
  { value: TransactionsLib.Enums.TransactionTypeEnum.INCOME, label: 'Доход' },
  { value: TransactionsLib.Enums.TransactionTypeEnum.EXPENSE, label: 'Расход' },
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
