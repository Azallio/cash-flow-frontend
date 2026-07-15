export interface OverviewSummaryResponse {
  income: {
    current: string
    previous: string
    changePercent: number
  }
  expense: {
    current: string
    previous: string
    changePercent: number
  }
  savings: {
    current: string
    previous: string
    changePercent: number
  }
  balance: {
    current: string
    previous: string
    changePercent: number
  }
}
