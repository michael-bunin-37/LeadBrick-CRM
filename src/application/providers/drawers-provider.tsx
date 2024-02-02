import {useDrawersStore} from "@/entities/drawers-store"
import {ProjectCreateDrawer} from "@/features/project/project-create"
import {ProjectsStatisticsHourlyDrawer} from "@/widgets/project/project-statistics/ui/project-statistics-hourly-drawer"
import React, {PropsWithChildren} from "react"

type Props = {}

export function DrawersProvider({}: PropsWithChildren) {
	return (
		<React.Fragment>
			<ProjectCreateDrawer />
			<ProjectsStatisticsHourlyDrawer />
		</React.Fragment>
	)
}
