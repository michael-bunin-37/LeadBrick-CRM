import {ProjectSearch} from "@/features/project/project-search"
import {ProjectsDateFilter} from "@/features/projects/projects-date-filter"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type Props = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
}

export function ProjectInviteLinksFilters({className, setParams, params}: Props) {
	return (
		<div className={cn("flex items-center gap-x-2", className)}>
			<ProjectSearch
				onChange={() => {}}
				className="flex-grow"
			/>

			<ProjectsDateFilter
				setParams={setParams}
				params={params}
			/>
		</div>
	)
}
