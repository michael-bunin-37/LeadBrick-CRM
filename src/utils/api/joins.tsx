import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {JoinResDto} from "../types/join"
import {Cursor, CursorList} from "../types/server"
import {api} from "./api"
import {QueryKeys} from "../query-keys"
import {API_URL} from "../config"

export const useJoinsList = (
	params: Cursor & {chatId: string},
	config?: Partial<UseQueryOptions<CursorList<JoinResDto[]>, Error>>,
) => {
	return useQuery({
		queryKey: [QueryKeys["JOINS"], params],
		refetchInterval: 1000 * 30,
		queryFn: () =>
			api
				.post(`${API_URL}/project/invite-link/users/list`, {json: params})
				.json<CursorList<JoinResDto[]>>(),
		...config,
	})
}
