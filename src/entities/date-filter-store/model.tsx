import {getToday} from "@/features/projects/projects-date-filter"
import dayjs from "dayjs"
import {DateRange} from "react-day-picker"
import {create} from "zustand"

export type DateFilterStoreState = {
	dateRange?: DateRange
	etc_gmt:
		| "Etc/GMT+0"
		| "Etc/GMT+1"
		| "Etc/GMT+2"
		| "Etc/GMT+3"
		| "Etc/GMT+4"
		| "Etc/GMT+5"
		| "Etc/GMT+6"
		| "Etc/GMT+7"
		| "Etc/GMT+8"
		| "Etc/GMT+9"
		| "Etc/GMT+10"
		| "Etc/GMT+11"
		| "Etc/GMT+12"
		| "Etc/GMT-0"
		| "Etc/GMT-1"
		| "Etc/GMT-2"
		| "Etc/GMT-3"
		| "Etc/GMT-4"
		| "Etc/GMT-5"
		| "Etc/GMT-6"
		| "Etc/GMT-7"
		| "Etc/GMT-8"
		| "Etc/GMT-9"
		| "Etc/GMT-10"
		| "Etc/GMT-11"
		| "Etc/GMT-12"
		| "Etc/GMT-13"
		| "Etc/GMT-14"
		| "Etc/GMT0"
}

export type DateFilterStoreActions = {
	setDateRange: (dateRange: DateRange | undefined) => void
	setEtc_gmt: (etc_gmt: DateFilterStoreState["etc_gmt"]) => void
}

export const useDateFilterStore = create<
	DateFilterStoreState & DateFilterStoreActions
>((set) => ({
	etc_gmt: "Etc/GMT+5",
	setEtc_gmt: (etc_gmt) => {
		set({etc_gmt})
	},
	dateRange: getToday(),
	setDateRange: (dateRange) => set({dateRange}),
}))
