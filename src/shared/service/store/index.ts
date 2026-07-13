import { create } from 'zustand'

type BTWDate = Date | string | null

type DateStore = {
  dateFrom: Date
  dateTo: Date
  setDate: (dateFrom: BTWDate, dateTo: BTWDate) => void
}

export const useDateStore = create<DateStore>((set) => ({
  dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),

  dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),

  setDate: (dateFrom: BTWDate, dateTo: BTWDate) => {
    if (typeof dateFrom === 'string') {
      dateFrom = new Date(dateFrom)
    }
    if (typeof dateTo === 'string') {
      dateTo = new Date(dateTo)
    }
    if (dateFrom === null) {
      dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
    if (dateTo === null) {
      dateTo = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    }
    return set({ dateFrom, dateTo })
  },
}))
