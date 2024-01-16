import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {InviteLinkResDto} from "../types/invite-link"
import {Cursor, CursorList} from "../types/server"
import {QueryKeys} from "../query-keys"
import {api} from "./api"
import {API_URL} from "../config"

export const useInviteLinksList = (
	params: Cursor & {chatId?: string},
	config?: Partial<UseQueryOptions<CursorList<InviteLinkResDto[]>, Error>>,
) => {
	const {chatId, ...p} = params
	return useQuery({
		queryKey: [QueryKeys["INVITE.LINK"], params],
		queryFn: () => api.post(`${API_URL}/project/invite-link/list/${chatId}`, {json: p}).json<CursorList<InviteLinkResDto[]>>(),
		...config,
	})
}
