import {MyButton} from "@/components/Button"
import {Checkbox} from "@mui/material"
import React from "react"
import {IoCheckbox, IoSquareOutline} from "react-icons/io5"

type Props = {
	setActive: (active: boolean) => void
	active: boolean
}

export function ProjectsUnactiveSwitcher({active, setActive}: Props) {
	return (
		<MyButton
			onClick={() => setActive(!active)}
			variant="outlined"
			size="sm"
			className="h-9 gap-x-2">
			{active ? (
				<IoCheckbox
					className="text-blue-500"
					size={12}
				/>
			) : (
				<IoSquareOutline size={12} />
			)}
			Показ. Неактивные
		</MyButton>
	)
}
