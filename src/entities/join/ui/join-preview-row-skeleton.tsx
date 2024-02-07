import {MyTableCell, MyTableRow} from "@/components/Table"
import React from "react"

type Props = {}

export function JoinPreviewRowSkeleton({}: Props) {
	return (
		<MyTableRow>
			{[...Array(12)].map((_, i) => (
				<MyTableCell key={i}>
					<div className="bg-gray-100 rounded-sm h-[10px] w-[36px]" />
				</MyTableCell>
			))}
		</MyTableRow>
	)
}
