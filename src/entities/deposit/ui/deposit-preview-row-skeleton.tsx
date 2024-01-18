import {MyTableCell, MyTableRow} from "@/components/Table"
import React from "react"

type Props = {}

export function DepositPreviewRowSkeleton({}: Props) {
	return (
		<MyTableRow>
			<MyTableCell>
				<div className="truncate">
					<div className="bg-gray-100 rounded-sm h-[10px] w-[128px]" />
				</div>
			</MyTableCell>
			{[...Array(7)].map((_, i) => (
				<MyTableCell key={i}>
					<div className="bg-gray-100 rounded-sm h-[10px] w-[36px]" />
				</MyTableCell>
			))}
		</MyTableRow>
	)
}
