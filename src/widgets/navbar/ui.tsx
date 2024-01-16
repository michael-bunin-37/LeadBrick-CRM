import {NavbarItem} from "@/entities/navbar/navbar-item"
import {Divider} from "@mui/material"
import React from "react"
import {
	IoAnalytics,
	IoBriefcase,
	IoSettings,
	IoHelp,
	IoAnalyticsOutline,
	IoBriefcaseOutline,
	IoSettingsOutline,
} from "react-icons/io5"

type Props = {}

export function Navbar({}: Props) {
	return (
		<div className="h-full flex items-start flex-col gap-y-2 bg-gray-900">
			{/* Navbar logo */}
			<div className=" h-[56px] flex items-center justify-center border-b border-gray-800 border-dashed w-full">
				<img
					src="/assets/imgs/logo.svg"
					className="h-[24px]"
					alt=""
				/>
			</div>

			{/* Navbar Items */}
			<div className="flex flex-col px-2 gap-y-1 w-full mt-3">
				<NavbarItem
					href="/"
					label="Дашборд"
					Slots={{Icon: IoAnalyticsOutline}}
				/>

				<NavbarItem
					href="/projects"
					label="Проекты"
					Slots={{Icon: IoBriefcaseOutline}}
				/>

				<Divider className="border-gray-800 border-dashed mx-3 my-2" />

				<NavbarItem
					href="/settings"
					label="Настройки"
					Slots={{Icon: IoSettingsOutline}}
				/>

				<NavbarItem
					href="/help"
					label="Помощь"
					Slots={{Icon: IoHelp}}
				/>
			</div>
		</div>
	)
}
