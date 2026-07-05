export function getProgressBarPercent(expenses: number | undefined, budget: number | undefined): number {
  if (budget === 0 || expenses === 0 || expenses === undefined || budget === undefined) {
    return 0
  }
  return Math.round((expenses / budget) * 100)
}
