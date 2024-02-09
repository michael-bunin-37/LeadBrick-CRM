import {ProjectsDateFilter} from "@/features/projects/projects-date-filter"
import {ProjectsTimezoneSwitcher} from "@/features/projects/projects-timezone-switcher"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type Props = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
}

export function ProjectJoinsFilters({className, setParams, params}: Props) {
	return (
		<div className={cn("flex items-center gap-x-2", className)}>
			<ProjectsTimezoneSwitcher />
			<ProjectsDateFilter
				type="FILTER"
				filterBy="createdAt"
				setParams={setParams}
				params={params}
			/>
		</div>
	)
}
