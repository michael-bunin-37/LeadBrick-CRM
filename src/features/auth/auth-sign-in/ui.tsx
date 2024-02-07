import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/router"
import React, {useEffect} from "react"
import {AuthSignInFormSchema, AuthSignInFormState} from "./model"
import {useForm} from "react-hook-form"
import {
	useSessionSignInWithEmail,
	useSessionSignUpWithEmail,
} from "@/entities/session"
import {cn} from "@/utils/lib"
import {MyInputControlled} from "@/components/Input"
import {InputAdornment} from "@mui/material"
import {IoLockClosed, IoMail} from "react-icons/io5"
import {MyButton} from "@/components/Button"
import {MyLoader} from "@/components/Loader"

type AuthSignInProps = {
	className?: string
}

function AuthSignIn({className}: AuthSignInProps) {
	const {replace} = useRouter()
	const {handleSubmit, reset, control} = useForm<AuthSignInFormState>({
		resolver: zodResolver(AuthSignInFormSchema),
	})

	const {mutate} = useSessionSignUpWithEmail()

	const {mutate: authSignIn, isPending} = useSessionSignInWithEmail()

	const onSubmit = ({email, password}: AuthSignInFormState) => {
		authSignIn(
			{email, password},
			{
				onSuccess() {
					setTimeout(() => {
						replace("/app")
					}, 0)
				},
			},
		)
	}

	return (
		<div className={cn(className)}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-y-6">
				<div>
					<div className="flex items-center justify-between gap-x-2 mb-3">
						<p className="text-xs">
							Логин <span className="text-primary-500">*</span>
						</p>
					</div>

					<MyInputControlled
						control={control}
						name="email"
						inputProps={{
							placeholder: "Введите логин",
							className: "h-12 text-[12px] w-full",
							startAdornment: (
								<InputAdornment position="start">
									<IoMail
										size={14}
										className="text-gray-500"
									/>
								</InputAdornment>
							),
						}}
					/>
				</div>

				<div className="flex flex-col gap-y-3">
					<p className="text-xs">
						Пароль <span className="text-primary-500">*</span>
					</p>
					<MyInputControlled
						control={control}
						name="password"
						inputProps={{
							type: "password",
							placeholder: "Введите пароль",
							className: "h-12 text-[12px] w-full",
							startAdornment: (
								<InputAdornment position="start">
									<IoLockClosed
										size={14}
										className="text-gray-500"
									/>
								</InputAdornment>
							),
						}}
					/>
				</div>

				<MyButton
					type="submit"
					variant="primary"
					size="default"
					disabled={isPending}
					className="h-12 gap-x-3">
					{isPending && (
						<MyLoader
							className="text-gray-50"
							size={16}
						/>
					)}
					Войти
				</MyButton>
			</form>
		</div>
	)
}

export {AuthSignIn}
