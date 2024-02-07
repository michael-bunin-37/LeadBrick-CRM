import {MyTableCell} from "@/components/Table"
import {
	StatisticsPreviewRow,
	StatisticsPreviewRowSkeleton,
} from "@/entities/statistics"
import {useProjectById} from "@/utils/api/project"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectStatisticsTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
}

function ProjectStatisticsTotal({
	params,
	projectId,
}: ProjectStatisticsTotalProps) {
	// QUERIES
	const {data, isPending} = useProjectById(
		{
			id: projectId as string,
			...(params.windowStart && {windowStart: params.windowStart}),
			...(params.windowEnd && {windowEnd: params.windowEnd}),
		},
		{
			enabled: !!projectId,
		},
	)

	return (
		<>
			{data && (
				// @ts-ignore
				<StatisticsPreviewRow
					{...data}
					windowStart={undefined}
					Slots={{
						Name: <MyTableCell>Общие показатели</MyTableCell>,
					}}
					className="[&>*]:!font-semibold [&>*]:!text-gray-900"
				/>
			)}

			{isPending && <StatisticsPreviewRowSkeleton />}
		</>
	)
}

export {ProjectStatisticsTotal}
