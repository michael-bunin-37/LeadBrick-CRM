import {ProjectPreviewRow, ProjectPreviewRowSkeleton} from "@/entities/project"
import {useProjectsTotalStatistics} from "@/utils/api/project"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectsTotalStatisticsProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	className?: string
}

function ProjectsTotalStatistics({
	params,
	className,
}: ProjectsTotalStatisticsProps) {
	const {data, isPending} = useProjectsTotalStatistics({
		...(params.windowStart && {windowStart: params.windowStart}),
		...(params.windowEnd && {windowEnd: params.windowEnd}),
	})

	return (
		<>
			{data && (
				<ProjectPreviewRow
					{...data}
					name="Общие показатели"
					className={cn("[&>*]:!font-semibold [&>*]:!text-gray-900", className)}
					slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <ProjectPreviewRowSkeleton />}
		</>
	)
}

export {ProjectsTotalStatistics}
