import {ProjectDepositsSearch} from "@/features/project/project-deposits-search"
import {ProjectsDateFilter} from "@/features/projects/projects-date-filter"
import {ProjectsTimezoneSwitcher} from "@/features/projects/projects-timezone-switcher"
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

			<ProjectDepositsSearch
				className="flex-grow"
				params={params}
				setParams={setParams}
			/>

			<ProjectsTimezoneSwitcher />

			<ProjectsDateFilter
				type="FILTER"
				setParams={setParams}
				params={params}
			/>
		</div>
	)
}
