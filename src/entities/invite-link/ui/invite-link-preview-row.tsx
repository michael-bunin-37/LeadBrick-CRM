import {MyTableCell, MyTableRow} from "@/components/Table"
import {InviteLinkResDto} from "@/utils/types/invite-link"
import {IconButton} from "@mui/material"
import {formatDuration, millisecondsToMinutes} from "date-fns"
import Link from "next/link"
import React, {useCallback} from "react"
import {IoCopy, IoCopyOutline} from "react-icons/io5"
import {toast} from "react-toastify"

type Props = InviteLinkResDto

export function InviteLinkPreviewRow(props: Props) {
	const onCopyLink = useCallback(() => {
		navigator.clipboard.writeText(props.inviteLink)
		toast.info("Текст был скопирован")
	}, [props])

	return (
		<MyTableRow>
			<MyTableCell>
				<div className="flex items-center gap-x-3 truncate">
					<span className="truncate flex-1">{props.name}</span>
				</div>
			</MyTableCell>
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
			<MyTableCell className="text-left">
				<div className="flex items-center gap-x-2">
					<IconButton
						onClick={onCopyLink}
						size="small">
						<IoCopyOutline size={14} />
					</IconButton>
					<a
						href={props.inviteLink}
						className="text-gray-500 underline"
						target="_blank"
						rel="noreferer">
						{props.inviteLink}
					</a>
				</div>
			</MyTableCell>
		</MyTableRow>
	)
}
