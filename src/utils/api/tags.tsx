import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {api} from "./api"
import {API_URL} from "../config"
import {QueryKeys} from "../query-keys"

export const useTagsList = (config?: Partial<UseQueryOptions<string[], Error>>) => {
	return useQuery({
		queryFn: () => api.get(`${API_URL}/project/tag`).json<string[]>(),
		queryKey: [QueryKeys["TAGS"]],
		...config,
	})
}
