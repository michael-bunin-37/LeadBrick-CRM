import {api} from "@/utils/api/api"
import {API_URL} from "@/utils/config"
import {ProjectReqDto, ProjectResDto} from "@/utils/types/project"
import {useMutation} from "@tanstack/react-query"
import {z} from "zod"

export const ProjectCreateSchema = z.object({
	chatId: z.string().min(2, "Строка должна содержать не менее 2 символов"),
	subscribers: z.string().min(2, "Строка должна содержать не менее 2 символов"),
	name: z.string().min(8, "Строка должна содержать не менее 8 символов"),
})

export type ProjectCreateFields = z.infer<typeof ProjectCreateSchema>

export const defaultValues: ProjectCreateFields = {
	chatId: "",
	name: "",
	subscribers: "",
}

export const useProjectCreate = () => {
	const {isPending, isSuccess, isError, error, data, mutate} = useMutation<ProjectResDto, Error, ProjectReqDto>({
		mutationFn: ({chatId, ...vars}) =>
			api
				.post(`${API_URL}/project/create/${chatId}`, {
					searchParams: Object.entries(vars).filter(([_, v]) => !!v),
				})
				.json(),
	})

	// @ts-ignore
	const onSubmit = (fields: ProjectCreateFields) => mutate(fields)
	return {isPending, isSuccess, isError, error, data, onSubmit}
}
