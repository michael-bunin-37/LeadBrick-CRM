import {api} from "@/utils/api/api"
import {API_URL} from "@/utils/config"
import {QueryKeys} from "@/utils/query-keys"
import {UseMutationOptions, useMutation, useQueryClient} from "@tanstack/react-query"

export const useProjectsAddTag = (
	config?: UseMutationOptions<string, Error, {chatId: string; tag: string}>,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (vars) => api.patch(`${API_URL}/project/tag/${vars.chatId}?tag=${vars.tag}`).text(),
		...config,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({queryKey: [QueryKeys["TAGS"]]})
			queryClient.invalidateQueries({queryKey: [QueryKeys["PROJECT"]]})
		},
	})
}
