import Link from "next/link"
import React, {useMemo} from "react"
import {NavbarItemProps} from "./model"
import {cn} from "@/utils/lib"
import {useRouter} from "next/router"
import {Tooltip} from "@mui/material"

export function NavbarItem({label, href, Slots, className}: NavbarItemProps) {
	// STATE
	const {asPath} = useRouter()
	const isActive = useMemo(() => asPath === href, [asPath, href])

	return (
		<Tooltip
			title={label}
			placement="right">
			<Link
				href={href}
				className={cn(
					"flex flex-col items-center justify-center gap-y-2 gap-x-3 h-10 w-10 rounded-md  transition-all",
					"text-[10px] text-gray-700 hover:bg-gray-800 hover:text-gray-50",
					isActive && "text-gray-50 bg-gray-800",
					className,
				)}>
				<Slots.Icon size={16} />
				{/* {label} */}
			</Link>
		</Tooltip>
	)
}
