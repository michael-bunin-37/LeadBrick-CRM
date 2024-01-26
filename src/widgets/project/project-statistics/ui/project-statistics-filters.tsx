import {ProjectInviteLinksSearch} from "@/features/project/project-invite-links-search/ui";
import {ProjectsDateFilter} from "@/features/projects/projects-date-filter";
import {cn} from "@/utils/lib";
import {Cursor} from "@/utils/types/server";
import React from "react";

type Props = {
	className?: string;
	setParams: (cursor: Cursor) => void;
	params: Cursor;
};

export function ProjectStatisticsFilters({className, setParams, params}: Props) {
	return (
		<div className={cn("flex items-center gap-x-2 justify-end", className)}>
			<ProjectsDateFilter type="PARAMS" setParams={setParams} params={params} />
		</div>
	);
}
