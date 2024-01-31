import {api} from "@/utils/api/api"
import {API_URL} from "@/utils/config"
import {QueryKeys} from "@/utils/query-keys"
import {UseMutationOptions, useMutation, useQueryClient} from "@tanstack/react-query"

export const useProjectsDeleteTag = (
	config?: UseMutationOptions<string, Error, {chatId: string}>,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (vars) => api.delete(`${API_URL}/project/tag/${vars.chatId}`).text(),
		...config,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({queryKey: [QueryKeys["PROJECT"]]})
			queryClient.invalidateQueries({queryKey: [QueryKeys["TAGS"]]})
		},
	})
}
