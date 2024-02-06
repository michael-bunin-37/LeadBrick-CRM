import {ProjectPreviewRow} from "@/entities/project"
import {useProjectsTotalStatistics} from "@/utils/api/project"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectsTotalStatisticsProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
}

function ProjectsTotalStatistics({params}: ProjectsTotalStatisticsProps) {
	const {data, isLoading} = useProjectsTotalStatistics({
		...(params.windowStart && {windowStart: params.windowStart}),
		...(params.windowEnd && {windowEnd: params.windowEnd}),
	})

	return (
		<>
			{data && (
				<ProjectPreviewRow
					{...data}
					name="Общие показатели"
					className="[&>td]:!bg-blue-50"
				/>
			)}
		</>
	)
}

export {ProjectsTotalStatistics}
