import {NavbarItem} from "@/entities/navbar/navbar-item"
import {SessionMenu} from "@/features/session/session-menu"
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
		<div className="h-full flex items-start flex-col gap-y-3 bg-gray-50/50 border-r border-r-gray-200">
			{/* Navbar logo */}
			<div className=" h-[56px] flex items-center justify-center border-b border-gray-200 w-full">
				<img
					src="/assets/imgs/logo.svg"
					className="h-[24px]"
					alt=""
				/>
			</div>

			{/* Navbar Items */}
			<div className="flex flex-grow flex-col items-center justify-between my-3">
				<div className="flex flex-col px-3 gap-y-1">
					<NavbarItem
						href="/app"
						label="Дашборд"
						Slots={{Icon: IoAnalyticsOutline}}
					/>

					<NavbarItem
						href="/app/projects"
						label="Проекты"
						Slots={{Icon: IoBriefcaseOutline}}
					/>

					<Divider className="border-gray-200 border-dashed mx-2 my-2" />

					<NavbarItem
						href="/app/settings"
						label="Настройки"
						Slots={{Icon: IoSettingsOutline}}
					/>

					<NavbarItem
						href="/app/help"
						label="Помощь"
						Slots={{Icon: IoHelp}}
					/>
				</div>

				<SessionMenu />
			</div>
		</div>
	)
}
