import {MyTableCell, MyTableRow} from "@/components/Table"
import {ProjectResDto} from "@/utils/types/project"
import dayjs from "dayjs"
import Link from "next/link"
import React from "react"

type Props = ProjectResDto

export function ProjectPreviewRow(props: Props) {
	// @ts-ignore
	console.log(props)
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
			<MyTableCell className="text-center">{props.subscribers}</MyTableCell>
			<MyTableCell className="text-center">{props.usersJoin}</MyTableCell>
			<MyTableCell className="text-center">{props.usersLeave}</MyTableCell>
			<MyTableCell className="text-center">{props.dialogs}</MyTableCell>
			<MyTableCell className="text-center">{props.firstDeposits}</MyTableCell>
			<MyTableCell className="text-center">{props.reDeposits}</MyTableCell>
			<MyTableCell className="text-center">
				{props.dialogs != 0 && props.usersJoin != 0 ? `${(props.dialogs / props.usersJoin) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${(props.firstDeposits / props.usersJoin) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${(props.firstDeposits / props.dialogs) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.reDeposits != 0 && props.firstDeposits != 0 ? `${(props.reDeposits / props.firstDeposits) * 100}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDeposit != 0 && props.countTimeToDeposit != 0
					? dayjs.duration(props.sumTimeToDeposit / props.countTimeToDeposit, "milliseconds").humanize()
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDialog != 0 && props.countTimeToDialog != 0
					? dayjs.duration(props.sumTimeToDialog / props.countTimeToDialog, "milliseconds").humanize()
					: "-"}
			</MyTableCell>
		</MyTableRow>
	)
}
