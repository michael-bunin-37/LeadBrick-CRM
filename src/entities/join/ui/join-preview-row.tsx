import {MyTableCell, MyTableRow} from "@/components/Table"
import {useDateFilterStore} from "@/entities/date-filter-store"
import {JoinResDto} from "@/utils/types/join"
import dayjs from "dayjs"
import React, {useEffect} from "react"

type Props = JoinResDto

export function JoinPreviewRow(props: Props) {
	const {etc_gmt} = useDateFilterStore()

	return (
		<MyTableRow>
			<MyTableCell>
				{props.firstName !== "UNKNOWN" ? props.firstName : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.lastName !== "UNKNOWN" ? props.lastName : "-"}
			</MyTableCell>
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
				{props.inviteLinkName !== "LINK_NOT_DEFINED"
					? props.inviteLinkName
					: "-"}
			</MyTableCell>
			<MyTableCell>{`${props.dialog}`}</MyTableCell>
			<MyTableCell>{`${props.firstDeposit}`}</MyTableCell>
			<MyTableCell>{props.reDeposit}</MyTableCell>
			<MyTableCell>
				{props.createdAt
					? dayjs(props.createdAt).tz(etc_gmt).format("lll")
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.dialogAt ? dayjs(props.dialogAt).tz(etc_gmt).format("lll") : ""}
			</MyTableCell>
			<MyTableCell>
				{props.depositAt
					? dayjs(props.depositAt).tz(etc_gmt).format("lll")
					: ""}
			</MyTableCell>
			<MyTableCell>
				{props.reDepositAt
					? dayjs(props.reDepositAt).tz(etc_gmt).format("lll")
					: ""}
			</MyTableCell>
		</MyTableRow>
	)
}
