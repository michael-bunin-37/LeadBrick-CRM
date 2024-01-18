import {MyTableCell, MyTableRow} from "@/components/Table"
import {DepositResDto} from "@/utils/types/deposit"
import React, {useCallback} from "react"
import dayjs from "dayjs"
import {IconButton} from "@mui/material"
import {IoCopyOutline} from "react-icons/io5"
import {toast} from "react-toastify"
import {MyTab} from "@/components/Tab"

type Props = DepositResDto

export function DepositPreviewRow(props: Props) {
	const onCopyLink = useCallback(() => {
		navigator.clipboard.writeText(props.inviteLink)
		toast.info("Текст был скопирован")
	}, [props])

	return (
		<MyTableRow>
			<MyTableCell>{props.userId}</MyTableCell>
			<MyTableCell>{props.firstName !== "UNKNOWN" ? props.firstName : "-"}</MyTableCell>
			<MyTableCell>{props.lastName !== "UNKNOWN" ? props.lastName : "-"}</MyTableCell>
			<MyTableCell>
				{props.username !== "UNKNOWN" ? (
					<a
						href={`https://t.me/${props.username}`}
						rel="noreferrer"
						target="_blank"
						className="text-gray-500 underline">
						@{props.username}
					</a>
				) : (
					"-"
				)}
			</MyTableCell>
			<MyTableCell>
				{props.inviteLink !== "LINK_NOT_DEFINED" ? (
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
				) : (
					"-"
				)}
			</MyTableCell>
			<MyTableCell>{props.inviteLinkName !== "LINK_NOT_DEFINED" ? props.inviteLinkName : "-"}</MyTableCell>
			<MyTableCell>{dayjs(props.date).format("lll")}</MyTableCell>
			<MyTableCell>{props.timeToDeposit != 0 ? dayjs.duration(props.timeToDeposit, "milliseconds").humanize() : "-"}</MyTableCell>
		</MyTableRow>
	)
}
