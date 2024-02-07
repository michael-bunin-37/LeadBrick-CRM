import {MyLoader} from "@/components/Loader"
import {useSession} from "@/entities/session"
import {useRouter} from "next/router"
import React, {PropsWithChildren, useEffect} from "react"

type SessionRequiredProps = PropsWithChildren

function SessionRequired({children}: SessionRequiredProps) {
	const {isUserLoading, user} = useSession()
	const {replace, asPath} = useRouter()

	useEffect(() => {
		if (!user && !isUserLoading) {
			replace("/app/auth/in")
		}
	}, [isUserLoading, user])

	if (isUserLoading) {
		return (
			<div className="h-screen flex items-center justify-center relative">
				<div className="top-6 left-6 absolute">
					<img
						src="/assets/imgs/logo.svg"
						className="h-6"
					/>
				</div>
				<div className="flex flex-col items-center gap-y-6">
					<MyLoader
						size={24}
						className="text-gray-900"
					/>
					<p className="text-sm text-gray-700">Подождите пожалуйста...</p>
				</div>
			</div>
		)
	}

	if (user && !isUserLoading) {
		return children
	}

	return null
}

export {SessionRequired}
