import { Consts } from '@shared/lib'
import { TransactionTypeEnum } from '@shared/lib/enums'
import type { CategoryResponse } from '@shared/types/http'
import { Button } from '@shared/ui/button'
import { ContentBlock } from '@shared/ui/content-block'
import { Input } from '@shared/ui/input'
import { Modal } from '@shared/ui/modal'
import { Select } from '@shared/ui/select'
import type { CreateCategoryPayload, CreateTransactionPayload } from '@widgets/transactions/api/method'
import clsx from 'clsx'
import { useMemo, useState, type FormEvent } from 'react'

type Props = {
  categories: CategoryResponse[]
  onCreateCategory: (payload: CreateCategoryPayload) => Promise<CategoryResponse>
  onCreateTransaction: (payload: CreateTransactionPayload) => Promise<unknown>
  isCreateCategoryPending: boolean
  isCreateTransactionPending: boolean
}

type TransactionFormValues = {
  amount: string
  description: string
  createdAt: string
}

type CategoryFormValues = {
  title: string
  description: string
}

const toIsoStartOfDay = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString()
const AddNewCategoryOptionValue = '__add-new-category__'

export const TransactionCreateForm = (props: Props) => {
  const {
    categories,
    onCreateCategory,
    onCreateTransaction,
    isCreateCategoryPending,
    isCreateTransactionPending,
  } = props

  const [transactionType, setTransactionType] = useState<
    TransactionTypeEnum.INCOME | TransactionTypeEnum.EXPENSE
  >(TransactionTypeEnum.INCOME)
  const [categoryId, setCategoryId] = useState('')
  const [transactionFormValues, setTransactionFormValues] = useState<TransactionFormValues>({
    amount: '',
    description: '',
    createdAt: new Date().toISOString().slice(0, 10),
  })
  const [categoryFormValues, setCategoryFormValues] = useState<CategoryFormValues>({
    title: '',
    description: '',
  })
  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false)
  const [createCategoryError, setCreateCategoryError] = useState('')

  const categoriesByTransactionType = useMemo(
    () => categories.filter((item) => item.transactionType === transactionType),
    [categories, transactionType],
  )

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = categoryFormValues.title.trim()
    const description = categoryFormValues.description.trim()

    if (!title || !description) {
      setCreateCategoryError('Заполните название и описание категории')
      return
    }

    setCreateCategoryError('')

    try {
      const createdCategory = await onCreateCategory({
        title,
        description,
        transactionType,
      })

      setCategoryId(String(createdCategory.id))
      setIsCategoryModalOpened(false)
    } catch {
      setCreateCategoryError('Не удалось создать категорию. Попробуйте еще раз')
      return
    }

    setCategoryFormValues({
      title: '',
      description: '',
    })
  }

  const handleCreateTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const amount = Number(transactionFormValues.amount)
    const normalizedCategoryId = Number(categoryId)

    if (!amount || amount <= 0 || !normalizedCategoryId || !transactionFormValues.createdAt) {
      return
    }

    await onCreateTransaction({
      amount,
      categoryId: normalizedCategoryId,
      createdAt: toIsoStartOfDay(transactionFormValues.createdAt),
      description: transactionFormValues.description.trim() || 'Без описания',
      transactionType,
    })

    setTransactionFormValues((prevState) => ({
      ...prevState,
      amount: '',
      description: '',
    }))
  }

  return (
    <ContentBlock className="border-border w-full border xl:w-96">
      <h2 className="mb-4 text-xl font-semibold">Новая транзакция</h2>

      <form className="flex flex-col gap-3" onSubmit={handleCreateTransaction}>
        <div className="border-border grid grid-cols-2 gap-2 rounded-xl border p-1">
          {Consts.TransactionTypeToggleOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setTransactionType(item.value)
                setCategoryId('')
              }}
              className={clsx(
                'h-10 rounded-lg text-sm font-semibold transition-colors',
                transactionType === item.value
                  ? item.value === TransactionTypeEnum.INCOME
                    ? 'bg-success/20 text-success'
                    : 'bg-primary/20 text-primary'
                  : 'text-text-muted hover:bg-bg',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {Consts.TransactionFormInputFields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={transactionFormValues[field.key]}
            onChange={(event) =>
              setTransactionFormValues((prevState) => ({
                ...prevState,
                [field.key]: event.target.value,
              }))
            }
          />
        ))}

        <label className="text-sm font-medium">Категория</label>
        <Select
          value={categoryId}
          onChange={(value: string | number | null, _option) => {
            if (!value) {
              setCategoryId('')
              return
            }

            const normalizedValue = String(value)

            if (normalizedValue === AddNewCategoryOptionValue) {
              setIsCategoryModalOpened(true)
              return
            }

            setCategoryId(normalizedValue)
          }}
          placeholder="Выберите категорию"
          data={[
            ...categoriesByTransactionType.map((item) => ({
              value: String(item.id),
              label: item.title,
            })),
            {
              value: AddNewCategoryOptionValue,
              label: 'Добавить новую',
            },
          ]}
          required
        />

        <Button type="submit" variant="color:primary size:md" disabled={isCreateTransactionPending}>
          {isCreateTransactionPending ? 'Сохранение...' : 'Добавить транзакцию'}
        </Button>
      </form>

      <Modal
        opened={isCategoryModalOpened}
        onClose={() => {
          setIsCategoryModalOpened(false)
          setCreateCategoryError('')
        }}
        title="Новая категория"
      >
        <form className="flex flex-col gap-3" onSubmit={handleCreateCategory}>
          <Input
            label="Название"
            placeholder={Consts.CategoryFormInputFields[0].placeholder}
            value={categoryFormValues.title}
            onChange={(event) =>
              setCategoryFormValues((prevState) => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />

          <Input
            label="Описание"
            placeholder={Consts.CategoryFormInputFields[1].placeholder}
            value={categoryFormValues.description}
            onChange={(event) =>
              setCategoryFormValues((prevState) => ({
                ...prevState,
                description: event.target.value,
              }))
            }
          />

          {createCategoryError && <span className="text-primary text-xs">{createCategoryError}</span>}

          <Button type="submit" variant="color:primary size:md" disabled={isCreateCategoryPending}>
            {isCreateCategoryPending ? 'Создание...' : 'Создать категорию'}
          </Button>
        </form>
      </Modal>
    </ContentBlock>
  )
}
