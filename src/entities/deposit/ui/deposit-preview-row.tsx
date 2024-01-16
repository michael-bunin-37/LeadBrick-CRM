import {MyTableCell, MyTableRow} from "@/components/Table"
import {DepositResDto} from "@/utils/types/deposit"
import {format, formatDistance, formatDuration, lightFormat, millisecondsToMinutes} from "date-fns"
import React from "react"

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
			<MyTableCell>{props.inviteLink !== "LINK_NOT_DEFINED" ? props.inviteLink : "-"}</MyTableCell>
			<MyTableCell>{props.inviteLinkName !== "LINK_NOT_DEFINED" ? props.inviteLinkName : "-"}</MyTableCell>
			<MyTableCell>{lightFormat(props.date, "dd.MM.yyyy - HH:mm")}</MyTableCell>
			<MyTableCell>{props.timeToDeposit != 0 ? "" : "-"}</MyTableCell>
		</MyTableRow>
	)
}
