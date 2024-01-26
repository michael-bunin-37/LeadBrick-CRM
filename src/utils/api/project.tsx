import {UseQueryOptions, useQuery} from "@tanstack/react-query"
import {api} from "./api"
import {QueryKeys} from "../query-keys"
import {API_URL} from "../config"
import {ProjectResDto} from "../types/project"
import {Cursor, CursorList} from "../types/server"

export const useProjectList = (params: Cursor, config?: Partial<UseQueryOptions<CursorList<ProjectResDto[]>, Error>>) => {
	return useQuery<CursorList<ProjectResDto[]>, Error>({
		queryFn: () => api.post(API_URL + "/project/list", {json: params}).json(),
		queryKey: [QueryKeys["PROJECT"], params],
		refetchInterval: 1000 * 30,
		...config,
	})
}

export const useProjectById = (id: string, config?: Partial<UseQueryOptions<ProjectResDto, Error>>) => {
	return useQuery({
		queryKey: [QueryKeys["PROJECT"], id],
		queryFn: () => api.get(`${API_URL}/project/${id}`).json<ProjectResDto>(),
		refetchInterval: 1000 * 30,
		...config,
	})
}
