import {StatisticsResDto} from "@/utils/types/statistics"
import {create} from "zustand"

export type ProjectStatisticsStoreState = {
	isOpen: boolean
	windowStart?: string | null
	chatId?: string | null
}
export type ProjectStatisticsStoreActions = {
	setOpen: (isOpen: boolean) => void
	setWindowStart: (
		windowRange: ProjectStatisticsStoreState["windowStart"],
	) => void
	setChatId: (chatId?: string | null) => void
}

export const useProjectStatisticsStore = create<
	ProjectStatisticsStoreState & ProjectStatisticsStoreActions
>((set) => ({
	isOpen: false,
	setOpen: (isOpen) => set({isOpen}),

	windowStart: null,
	setWindowStart: (windowStart) => set({windowStart}),

	chatId: null,
	setChatId: (chatId) => set({chatId}),
}))
