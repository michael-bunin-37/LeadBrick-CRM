import {MyChip} from "@/components/Chip"
import {MyTableCell, MyTableRow} from "@/components/Table"
import {ProjectResDto} from "@/utils/types/project"
import dayjs from "dayjs"
import Link from "next/link"
import React from "react"
import {IoCloseOutline, IoPricetagsOutline} from "react-icons/io5"

type Props = ProjectResDto & {
	Slots?: {
		ProjectAddTag?: React.ElementType<{id: string}>
		ProjectDeleteTag?: React.ElementType<{id: string}>
		Img?: JSX.Element
	}
	className?: string
}

export function ProjectPreviewRow(props: Props) {
	return (
		<MyTableRow className={props.className}>
			<MyTableCell>
				<div className="flex items-center gap-x-3 truncate">
					{/* <div className="h-6 w-6 rounded-[4px] bg-gray-100" /> */}
					{props.Slots?.Img}
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
				{props.dialogs != 0 && props.usersJoin != 0
					? `${((props.dialogs / props.usersJoin) * 100).toFixed(1)}%`
					: "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0
					? `${((props.firstDeposits / props.usersJoin) * 100).toFixed(1)}%`
					: "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0
					? `${((props.firstDeposits / props.dialogs) * 100).toFixed(1)}%`
					: "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.reDeposits != 0 && props.firstDeposits != 0
					? `${((props.reDeposits / props.firstDeposits) * 100).toFixed(1)}%`
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDeposit != 0 && props.countTimeToDeposit != 0
					? dayjs
							.duration(
								props.sumTimeToDeposit / props.countTimeToDeposit,
								"milliseconds",
							)
							.humanize()
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDialog != 0 && props.countTimeToDialog != 0
					? dayjs
							.duration(
								props.sumTimeToDialog / props.countTimeToDialog,
								"milliseconds",
							)
							.humanize()
					: "-"}
			</MyTableCell>
			<MyTableCell>
				<div className="flex items-center gap-x-1">
					{props.tag ? (
						<>
							<MyChip
								className="text-xs rounded-md h-[24px] px-2"
								label={props.tag}
							/>
							{props.Slots?.ProjectDeleteTag && (
								<props.Slots.ProjectDeleteTag id={props.id} />
							)}
						</>
					) : (
						props.Slots?.ProjectAddTag && (
							<props.Slots.ProjectAddTag id={props.id} />
						)
					)}
				</div>
			</MyTableCell>
		</MyTableRow>
	)
}
