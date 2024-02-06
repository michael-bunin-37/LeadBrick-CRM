import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {QueryKeys} from "../query-keys"
import {Cursor, CursorList} from "../types/server"
import {api} from "./api"
import {API_URL} from "../config"
import {StatisticsResDto} from "../types/statistics"

export const useStatisticsList = (
	params: Omit<Cursor, "filters" | "sort"> & {
		telegramChatId: string
		inviteLink?: string
	},
	config?: Partial<UseQueryOptions<CursorList<StatisticsResDto[]>, Error>>,
) => {
	return useQuery({
		queryKey: [QueryKeys["STATISTICS"], params],
		refetchInterval: 1000 * 60 * 5,
		queryFn: () =>
			api
				.get(`${API_URL}/event/aggregation/daily`, {
					searchParams: Object.entries(params),
				})
				.json<CursorList<StatisticsResDto[]>>(),
		...config,
	})
}

export const useStatisticsHourlyList = (
	params: Omit<Cursor, "filters" | "sort"> & {
		telegramChatId: string
		inviteLink?: string
	},
	config?: Partial<UseQueryOptions<CursorList<StatisticsResDto[]>, Error>>,
) => {
	return useQuery({
		queryKey: [QueryKeys["STATISTICS.HOURLY"], params],
		refetchInterval: 1000 * 60 * 5,
		queryFn: () =>
			api
				.get(`${API_URL}/event/aggregation/hourly`, {
					searchParams: Object.entries(params),
				})
				.json<CursorList<StatisticsResDto[]>>(),
		...config,
	})
}

export const useStatisticsListCursorCounter = (
	params: {
		telegramChatId: string
		windowStart?: string
		windowEnd?: string
		inviteLink?: string
	},
	config?: Partial<UseQueryOptions<{counter: number}, Error>>,
) => {
	return useQuery({
		queryKey: [QueryKeys["STATISTICS.COUNTER"], params],
		refetchInterval: 1000 * 60 * 5,
		queryFn: () =>
			api
				.get(`${API_URL}/event/aggregation/daily/counter`, {
					searchParams: Object.entries(params),
				})
				.json<{counter: number}>(),
		...config,
	})
}
