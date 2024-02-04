import {MyTableCell, MyTableRow} from "@/components/Table"
import {JoinResDto} from "@/utils/types/join"
import dayjs from "dayjs"
import React from "react"

type Props = JoinResDto

export function JoinPreviewRow(props: Props) {
	return (
		<MyTableRow>
			{/* <MyTableCell>{props.id}</MyTableCell> */}
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
			<MyTableCell>{`${props.dialog}`}</MyTableCell>
			<MyTableCell>{`${props.firstDeposit}`}</MyTableCell>
			<MyTableCell>{props.reDeposit}</MyTableCell>
			<MyTableCell>{props.createdAt ? dayjs(props.createdAt).format("lll") : "-"}</MyTableCell>
			<MyTableCell>{props.dialogAt ? dayjs(props.dialogAt).format("lll") : ""}</MyTableCell>
			<MyTableCell>{props.depositAt ? dayjs(props.depositAt).format("lll") : ""}</MyTableCell>
			<MyTableCell>{props.reDepositAt ? dayjs(props.reDepositAt).format("lll") : ""}</MyTableCell>
		</MyTableRow>
	)
}
