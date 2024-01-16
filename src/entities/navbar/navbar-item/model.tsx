import React from "react"
import {IconBaseProps} from "react-icons"

export type NavbarItemProps = {
	label?: string
	href: string
	Slots: {
		Icon: React.ElementType<IconBaseProps>
	}
	className?: string
}
