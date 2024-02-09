import {MyTableCell} from "@/components/Table"
import {
	StatisticsPreviewRow,
	StatisticsPreviewRowSkeleton,
} from "@/entities/statistics"
import {useProjectById} from "@/utils/api/project"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectStatisticsTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
	className?: string
}

function ProjectStatisticsTotal({
	params,
	projectId,
	className,
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
					className={cn("[&>*]:!font-semibold [&>*]:!text-gray-900", className)}
				/>
			)}

			{isPending && <StatisticsPreviewRowSkeleton />}
		</>
	)
}

export {ProjectStatisticsTotal}
