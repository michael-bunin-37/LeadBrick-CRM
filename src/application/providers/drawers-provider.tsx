import {useDrawersStore} from "@/entities/drawers-store"
import {ProjectCreateDrawer} from "@/features/project/project-create"
import React, {PropsWithChildren} from "react"

type Props = {}

export function DrawersProvider({}: PropsWithChildren) {
	const {type, isOpen} = useDrawersStore()

	return (
		<React.Fragment>
			<ProjectCreateDrawer />
		</React.Fragment>
	)
}
