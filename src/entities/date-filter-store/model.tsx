import {getToday} from "@/features/projects/projects-date-filter"
import {DateRange} from "react-day-picker"
import {create} from "zustand"

export type DateFilterStoreState = {
	dateRange?: DateRange
}

export type DateFilterStoreActions = {
	setDateRange: (dateRange: DateRange | undefined) => void
}

export const useDateFilterStore = create<DateFilterStoreState & DateFilterStoreActions>((set) => ({
	dateRange: getToday(),
	setDateRange: (dateRange) => set({dateRange}),
}))
