import {MyTableCell, MyTableRow} from "@/components/Table"
import {ProjectResDto} from "@/utils/types/project"
import {format, formatDuration, millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds} from "date-fns"
import Link from "next/link"
import React from "react"

type Props = ProjectResDto

export function ProjectPreviewRow(props: Props) {
	// @ts-ignore
	if (props.sumTimeToDialog !== "0" && props.countTimeToDialog !== "0") {
		console.log(
			formatDuration(
				{
					minutes: millisecondsToMinutes(props.sumTimeToDialog / props.countTimeToDialog),
				},
				{format: ["months", "days", "hours", "minutes"]},
			),
		)
	}

	return (
		<MyTableRow>
			<MyTableCell>
				<div className="flex items-center gap-x-3 truncate">
					<div className="h-6 w-6 rounded-[4px] bg-gray-100" />
					<Link
						href={`/projects/${props.id}`}
						className="truncate flex-1">
						{props.name}
					</Link>
				</div>
			</MyTableCell>
			<MyTableCell>{props.subscribers}</MyTableCell>
			<MyTableCell>{props.usersJoin}</MyTableCell>
			<MyTableCell>{props.usersLeave}</MyTableCell>
			<MyTableCell>{props.dialogs}</MyTableCell>
			<MyTableCell>{props.firstDeposits}</MyTableCell>
			<MyTableCell>{props.reDeposits}</MyTableCell>
			<MyTableCell>
				{props.dialogs != 0 && props.usersJoin != 0 ? `${(props.dialogs / props.usersJoin) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${(props.firstDeposits / props.usersJoin) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${(props.firstDeposits / props.dialogs) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.reDeposits != 0 && props.firstDeposits != 0 ? `${(props.reDeposits / props.firstDeposits) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDeposit != 0 && props.countTimeToDeposit != 0
					? formatDuration(
							{
								minutes: millisecondsToMinutes(props.sumTimeToDeposit / props.countTimeToDeposit),
							},
							{format: ["months", "days", "hours", "minutes"]},
					  )
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDialog != 0 && props.countTimeToDialog != 0
					? formatDuration(
							{
								minutes: millisecondsToMinutes(props.sumTimeToDialog / props.countTimeToDialog),
							},
							{format: ["months", "days", "hours", "minutes"]},
					  )
					: "-"}
			</MyTableCell>
		</MyTableRow>
	)
}
