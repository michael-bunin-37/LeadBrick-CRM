import {ProjectsDateFilter} from "@/features/projects/projects-date-filter"
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
			<ProjectsDateFilter
				type="FILTER"
				filterBy="createdAt"
				setParams={setParams}
				params={params}
			/>
		</div>
	)
}
