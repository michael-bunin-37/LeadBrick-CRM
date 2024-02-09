import {DepositPreviewRow, DepositPreviewRowSkeleton} from "@/entities/deposit"
import {useProjectById} from "@/utils/api/project"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectDepositsTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
	className?: string
}

function ProjectDepositsTotal({
	params,
	projectId,
	className,
}: ProjectDepositsTotalProps) {
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
					className={cn("[&>*]:!font-semibold [&>*]:!text-gray-900", className)}
					// slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <DepositPreviewRowSkeleton />}
		</>
	)
}

export {ProjectDepositsTotal}
