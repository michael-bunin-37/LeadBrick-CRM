import Link from "next/link"
import React, {useMemo} from "react"
import {NavbarItemProps} from "./model"
import {cn} from "@/utils/lib"
import {useRouter} from "next/router"

export function NavbarItem({label, href, Slots, className}: NavbarItemProps) {
	// STATE
	const {asPath} = useRouter()
	const isActive = useMemo(() => asPath === href, [asPath, href])

	return (
		<Link
			href={href}
			className={cn(
				"flex flex-col items-center gap-y-2 gap-x-3 px-2 py-3 rounded-md w-full",
				"text-[10px] text-gray-500 hover:bg-gray-800 hover:text-gray-50 transition-all",
				isActive && "text-gray-50 bg-gray-800",
				className,
			)}>
			<Slots.Icon size={16} />
			{label}
		</Link>
	)
}
