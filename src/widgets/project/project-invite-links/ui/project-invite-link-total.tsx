import {
	InviteLinkPreviewRow,
	InviteLinkPreviewRowSkeleton,
} from "@/entities/invite-link"
import {ProjectPreviewRow, ProjectPreviewRowSkeleton} from "@/entities/project"
import {useProjectById} from "@/utils/api/project"
import {cn} from "@/utils/lib"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectInviteLinksTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
	className?: string
}

function ProjectInviteLinksTotal({
	params,
	projectId,
	className,
}: ProjectInviteLinksTotalProps) {
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
				<InviteLinkPreviewRow
					{...data}
					name="Общие показатели"
					className={cn("[&>*]:!font-semibold [&>*]:!text-gray-900", className)}
					// slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <InviteLinkPreviewRowSkeleton />}
		</>
	)
}

export {ProjectInviteLinksTotal}
