import {ProjectsDateFilter} from "@/features/projects/projects-date-filter"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type Props = {
	className?: string
	setParams: (cursor: Omit<Cursor, "sort">) => void
	params: Omit<Cursor, "sort">
}

export function ProjectDepositsFilters({className, params, setParams}: Props) {
	return (
		<div className={cn("flex items-center gap-x-2", className)}>
			{/* <ProjectSearch
				onChange={() => {}}
				className="flex-grow"
			/> */}

			<ProjectsDateFilter
				type="FILTER"
				setParams={setParams}
				params={params}
			/>
		</div>
	)
}
