import {MyButton} from "@/components/Button"
import {MyMenu} from "@/components/Menu"
import {IconButton, Popover, Popper} from "@mui/material"
import React, {useState} from "react"
import {IoEllipsisHorizontal} from "react-icons/io5"

type ProjectActionsProps = {
	Slots: JSX.Element[]
}

function ProjectActions({Slots}: ProjectActionsProps) {
	const [anchor, setAnchor] = useState<HTMLElement | null>(null)

	return (
		<React.Fragment>
			<MyButton
				size="icon_sm"
				onClick={(e) => setAnchor(e.currentTarget)}>
				<IoEllipsisHorizontal />
			</MyButton>
			<MyMenu
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: -12,
					horizontal: "right",
				}}
				onClose={() => setAnchor(null)}
				open={!!anchor}
				anchorEl={anchor}>
				{Slots}
			</MyMenu>
		</React.Fragment>
	)
}

export {ProjectActions}
