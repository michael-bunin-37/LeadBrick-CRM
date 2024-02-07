import {InviteLinkPreviewRow} from "@/entities/invite-link"
import {ProjectPreviewRow, ProjectPreviewRowSkeleton} from "@/entities/project"
import {useProjectById} from "@/utils/api/project"
import {Cursor} from "@/utils/types/server"
import React from "react"

type ProjectInviteLinksTotalProps = {
	params: Omit<Cursor, "filters" | "sort" | "page" | "pageSize">
	projectId?: string
}

function ProjectInviteLinksTotal({
	params,
	projectId,
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
					// className="[&>*]:!font-semibold [&>*]:!text-gray-900"
					// slotsProps={{Link: {className: "pointer-events-none"}}}
				/>
			)}

			{isPending && <ProjectPreviewRowSkeleton />}
		</>
	)
}

export {ProjectInviteLinksTotal}
