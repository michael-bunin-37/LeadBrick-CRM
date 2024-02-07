import {AuthSignIn} from "@/features/auth/auth-sign-in"

export default function AuthIn() {
	return (
		<div className="md:container h-screen py-24 max-w-md border-l border-l-gray-200 border-dashed">
			{/* Logo */}
			<div className="flex items-center gap-x-3 px-16">
				<img
					className="max-md:h-[28px] md:h-[32px]"
					src="/assets/imgs/logo.svg"
				/>
				<p className="font-bold text-sm text-gray-900">LeadBrick</p>
			</div>

			{/* Welcome Message */}
			<div className="px-16 mt-6 border-l-4 border-primary-400">
				<p className="font-semibold dark:text-gray-50 text-gray-700">
					Приветствую тебя, пользователь!
				</p>
				<p className="mt-2 text-xs leading-[1.5] text-gray-500">
					Самое время выполнить вход в Leadbrick CRM <br /> и начать
					продуктивную работу!
				</p>
			</div>

			<div className="px-16 mt-6">
				{/* Divider */}
				{/* <div className="text-center text-xs font-medium text-gray-500 my-6">
					Або
				</div> */}

				{/* Form */}
				<AuthSignIn />
			</div>
		</div>
	)
}
