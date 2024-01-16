import {MyButton} from "@/components/Button"
import {useDrawersStore} from "@/entities/drawers-store"
import React from "react"
import {IoBriefcase, IoBriefcaseOutline} from "react-icons/io5"

type Props = {}

export function ProjectCreate({}: Props) {
	const {setOpen, setType} = useDrawersStore()

	const onClick = () => {
		setOpen(true)
		setType("PROJECT.CREATE")
	}

	return (
		<MyButton
			onClick={onClick}
			size="sm"
			className="gap-x-2 H-9"
			variant="primary">
			<IoBriefcase size={14} />
			Новый проект
		</MyButton>
	)
}
