import {ProjectPreviewRow, ProjectPreviewRowSkeleton} from "@/entities/project"
import {useProjectsTotalStatistics} from "@/utils/api/project"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectsTotalStatisticsProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
}

function ProjectsTotalStatistics({params}: ProjectsTotalStatisticsProps) {
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
					className="[&>*]:!font-semibold [&>*]:!text-gray-900"
					slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <ProjectPreviewRowSkeleton />}
		</>
	)
}

export {ProjectsTotalStatistics}
