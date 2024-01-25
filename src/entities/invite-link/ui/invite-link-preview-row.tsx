import {MyTableCell, MyTableRow} from "@/components/Table"
import {InviteLinkResDto} from "@/utils/types/invite-link"
import {IconButton} from "@mui/material"
import dayjs from "dayjs"
import Link from "next/link"
import React, {useCallback} from "react"
import {IoCopy, IoCopyOutline} from "react-icons/io5"
import {toast} from "react-toastify"

type Props = InviteLinkResDto

export function InviteLinkPreviewRow(props: Props) {
	const onCopyLink = useCallback(() => {
		navigator.clipboard.writeText(props.inviteLink)
		toast.info("Текст был скопирован", {autoClose: 50000})
	}, [props])

	return (
		<MyTableRow>
			<MyTableCell>
				<div className="flex items-center gap-x-3 truncate">
					<span className="truncate flex-1">{props.name}</span>
				</div>
			</MyTableCell>
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
			<MyTableCell className="text-left">
				<div className="flex items-center gap-x-2">{props.inviteLink}</div>
			</MyTableCell>
		</MyTableRow>
	)
}
