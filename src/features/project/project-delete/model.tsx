import {api} from "@/utils/api/api"
import {API_URL} from "@/utils/config"
import {QueryKeys} from "@/utils/query-keys"
import {UseMutationOptions, useMutation, useQueryClient} from "@tanstack/react-query"
import {useRouter} from "next/router"

export const useProjectDelete = (config?: UseMutationOptions<string, Error, {chatId: string}>) => {
	const queryClient = useQueryClient()
	const {push} = useRouter()
	return useMutation({
		mutationFn: (vars) => api.delete(`${API_URL}/project/tag/${vars.chatId}`).text(),
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries({queryKey: [QueryKeys["PROJECT"]]})
			push("/projects")
		},
		...config,
	})
}
