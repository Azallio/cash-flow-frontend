import { SharedUi } from '@shared'
import { Consts } from '@shared/lib'
import type { TransactionFilterType } from '@shared/lib/consts/transactions-page.const'
import { ContentBlock } from '@shared/ui/content-block'
import { Input } from '@shared/ui/input'
import { Select } from '@shared/ui/select'

type FilterValues = {
  search: string
  startDate: string
  endDate: string
}

type Props = {
  typeFilter: TransactionFilterType
  filterValues: FilterValues
  onTypeFilterChange: (value: TransactionFilterType) => void
  onFilterChange: (key: keyof FilterValues, value: string) => void
  onReset: () => void
}

export const TransactionsFilters = (props: Props) => {
  const { typeFilter, filterValues, onTypeFilterChange, onFilterChange, onReset } = props

  return (
    <ContentBlock className="border-border border">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Select
          value={typeFilter}
          data={Consts.TransactionFilterTypeOptions.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          onChange={(value) => {
            if (value) {
              onTypeFilterChange(value as TransactionFilterType)
            }
          }}
          allowDeselect={false}
        />

        {Consts.TransactionFilterInputFields.map((field) => (
          <Input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={filterValues[field.key]}
            onChange={(event) => onFilterChange(field.key, event.target.value)}
          />
        ))}

        <SharedUi.Button variant="color:secondary size:md" onClick={onReset}>
          Сбросить
        </SharedUi.Button>
      </div>
    </ContentBlock>
  )
}
