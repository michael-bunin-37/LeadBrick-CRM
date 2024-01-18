import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {QueryKeys} from "../query-keys"
import {Cursor, CursorList} from "../types/server"
import {api} from "./api"
import {API_URL} from "../config"
import {StatisticsResDto} from "../types/statistics"

export const useStatisticsList = (
	params: Omit<Cursor, "filters" | "sort"> & {telegramChatId: string; inviteLink?: string},
	config?: Partial<UseQueryOptions<CursorList<StatisticsResDto[]>, Error>>,
) => {
	return useQuery({
		queryKey: [QueryKeys["STATISTICS"], params],
		queryFn: () =>
			api
				.get(`${API_URL}/event/aggregation`, {
					searchParams: Object.entries(params),
				})
				.json<CursorList<StatisticsResDto[]>>(),
		...config,
	})
}

export const useStatisticsListCursorCounter = () => {
	return useQuery({
		queryKey: [QueryKeys["STATISTICS.COUNTER"]],
		queryFn: () => api.get(`${API_URL}/event/aggregation/counter`),
	})
}
