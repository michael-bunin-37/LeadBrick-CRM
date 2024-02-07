import {DepositPreviewRow, DepositPreviewRowSkeleton} from "@/entities/deposit"
import {useProjectById} from "@/utils/api/project"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectDepositsTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
}

function ProjectDepositsTotal({params, projectId}: ProjectDepositsTotalProps) {
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
				<DepositPreviewRow
					{...data}
					userId="Общие показатели"
					className="[&>*]:!font-semibold [&>*]:!text-gray-900"
					// slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <DepositPreviewRowSkeleton />}
		</>
	)
}

export {ProjectDepositsTotal}
