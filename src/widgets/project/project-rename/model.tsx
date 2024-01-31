import {api} from "@/utils/api/api"
import {API_URL} from "@/utils/config"
import {QueryKeys} from "@/utils/query-keys"
import {UseMutationOptions, useMutation, useQueryClient} from "@tanstack/react-query"

export const useProjectRename = (
	config?: Partial<UseMutationOptions<string, Error, {chatId: string; name: string}>>,
) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (vars) =>
			api.patch(`${API_URL}/project/re-name/${vars.chatId}?name=${vars.name}`).text(),
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({queryKey: [QueryKeys["PROJECT"]]})
		},
		...config,
	})
}
