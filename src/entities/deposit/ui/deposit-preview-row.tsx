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
					<div className="flex items-center gap-x-2">{props.inviteLink}</div>
				) : (
					"-"
				)}
			</MyTableCell>
			<MyTableCell>
				{props.inviteLinkName !== "LINK_NOT_DEFINED" ? props.inviteLinkName : "-"}
			</MyTableCell>
			<MyTableCell>{dayjs(props.date).format("lll")}</MyTableCell>
			<MyTableCell>
				{props.timeToDeposit != 0
					? dayjs.duration(props.timeToDeposit, "milliseconds").humanize()
					: "-"}
			</MyTableCell>
		</MyTableRow>
	)
}
