import {z} from "zod"

export const AuthSignInFormSchema = z.object({
	email: z.string({required_error: "Це поле обовʼязкове"}).email("---"),
	password: z
		.string({required_error: "Це поле обовʼязкове"})
		.min(8, "Минимальное кол-во символов: 8"),
})

export type AuthSignInFormState = z.infer<typeof AuthSignInFormSchema>
export const defaultValues: AuthSignInFormState = {
	email: "",
	password: "",
}
