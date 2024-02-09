import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {api} from "./api"
import {API_URL} from "../config"
import {QueryKeys} from "../query-keys"
import {Cursor, CursorList} from "../types/server"
import {DepositResDto} from "../types/deposit"

export const useDepositList = (
	params: Omit<Cursor, "sort"> & {chatId: string},
	config?: Partial<UseQueryOptions<CursorList<DepositResDto[]>, Error>>,
) => {
	return useQuery({
		queryFn: () =>
			api
				.post(`${API_URL}/event/deposit/list`, {json: params})
				.json<CursorList<DepositResDto[]>>(),
		queryKey: [QueryKeys["DEPOSIT"], params],
		refetchInterval: 1000 * 30,
		...config,
	})
}
