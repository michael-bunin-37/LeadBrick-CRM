import {getToday} from "@/features/projects/projects-date-filter"
import dayjs from "dayjs"
import {DateRange} from "react-day-picker"
import {create} from "zustand"

export enum EtcTimezone {
	"Etc/GMT+1" = "GMT-1",
	"Etc/GMT+0" = "GMT-0",
	"Etc/GMT+2" = "GMT-2",
	"Etc/GMT+3" = "GMT-3",
	"Etc/GMT+4" = "GMT-4",
	"Etc/GMT+5" = "GMT-5",
	"Etc/GMT+6" = "GMT-6",
	"Etc/GMT+7" = "GMT-7",
	"Etc/GMT+8" = "GMT-8",
	"Etc/GMT+9" = "GMT-9",
	"Etc/GMT+10" = "GMT-10",
	"Etc/GMT+11" = "GMT-11",
	"Etc/GMT+12" = "GMT-12",
	"Etc/GMT-0" = "GMT+0",
	"Etc/GMT-1" = "GMT+1",
	"Etc/GMT-2" = "GMT+2",
	"Etc/GMT-3" = "GMT+3",
	"Etc/GMT-4" = "GMT+4",
	"Etc/GMT-5" = "GMT+5",
	"Etc/GMT-6" = "GMT+6",
	"Etc/GMT-7" = "GMT+7",
	"Etc/GMT-8" = "GMT+8",
	"Etc/GMT-9" = "GMT+9",
	"Etc/GMT-10" = "GMT+10",
	"Etc/GMT-11" = "GMT+11",
	"Etc/GMT-12" = "GMT+12",
	"Etc/GMT-13" = "GMT+13",
	"Etc/GMT-14" = "GMT+14",
	"Etc/GMT0" = "GMT0",
}

export type DateFilterStoreState = {
	dateRange?: DateRange
	etc_gmt: keyof typeof EtcTimezone
}

export type DateFilterStoreActions = {
	setDateRange: (dateRange: DateRange | undefined) => void
	setEtc_gmt: (etc_gmt: DateFilterStoreState["etc_gmt"]) => void
}

export const useDateFilterStore = create<
	DateFilterStoreState & DateFilterStoreActions
>((set) => ({
	etc_gmt: "Etc/GMT-2",
	setEtc_gmt: (etc_gmt) => {
		set({etc_gmt})
	},
	dateRange: getToday("Etc/GMT-2"),
	setDateRange: (dateRange) => set({dateRange}),
}))
