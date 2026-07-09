import type { DatesRangeValue } from '@mantine/dates'
import { SharedLib, SharedUi } from '@shared'
import { BudgetUi } from '@widgets/budget'
import { IncomeExpenseDynamicsChartUi } from '@widgets/income-expense-dynamics-chart'
import { Layout } from '@widgets/layout/layout.component'
import { OverviewCardUi } from '@widgets/overview-card'
import { useState } from 'react'

export default function IndexRoute() {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DatesRangeValue<string> | string[] | string | null>([
    new Date().toISOString(),
    new Date().toISOString(),
  ])

  const [tempDateRange, setTempDateRange] = useState<DatesRangeValue<string> | string[] | string | null>(
    dateRange,
  )

  return (
    <Layout>
      <div className="mb-4 flex w-full items-center justify-between">
        <div>
          <h1 className="text-3xl">Обзор</h1>
          <span className="text-md text-gray-400">
            Аналитика ваших финансов в сравнении с прошлым периодом
          </span>
        </div>

        <SharedUi.Button
          variant="color:secondary size:md"
          onClick={() => {
            setTempDateRange(dateRange)
            setIsDatePickerModalOpen(true)
          }}
        >
          {dateRange![0] !== null && dateRange![1] !== null
            ? `${SharedLib.Utils.formatDate(dateRange![0])} - ${SharedLib.Utils.formatDate(dateRange![1])}`
            : 'Выбрать период'}
        </SharedUi.Button>
      </div>
      <OverviewCardUi.OverviewCard from={dateRange![0] ?? ''} to={dateRange![1] ?? ''} />
      <div className="flex h-max gap-4">
        <IncomeExpenseDynamicsChartUi.IncomeExpenseDynamicsSparkline
          from={dateRange![0] ?? ''}
          to={dateRange![1] ?? ''}
        />
        <div className="flex w-1/3 flex-col gap-4">
          <BudgetUi.MonthlyBudget />
          <SharedUi.TopExpenseCategories />
        </div>
      </div>

      <SharedUi.Modal
        title="Выберите период"
        opened={isDatePickerModalOpen}
        onClose={() => setIsDatePickerModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <SharedUi.DatePicker type="range" size="xl" value={tempDateRange} onChange={setTempDateRange} />
          <SharedUi.Button
            variant="color:primary size:md"
            onClick={() => {
              setDateRange(tempDateRange)
              setIsDatePickerModalOpen(false)
            }}
          >
            Применить
          </SharedUi.Button>
        </div>
      </SharedUi.Modal>
    </Layout>
  )
}
