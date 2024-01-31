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
			variant={"default"}
			className="gap-x-2 h-8">
			<IoBriefcase size={14} />
			Новый проект
		</MyButton>
	)
}
