import {MySkeleton} from "@/components/Skeleton"
import {MyTableCell, MyTableRow} from "@/components/Table"
import Link from "next/link"
import React from "react"

type Props = {
	className?: string
}

export function StatisticsPreviewRowSkeleton({className}: Props) {
	return (
		<MyTableRow>
			<MyTableCell>
				<div className="">
					<div className="bg-gray-100 rounded-sm h-[10px] w-[128px]" />
				</div>
			</MyTableCell>
			{[...Array(11)].map((_, i) => (
				<MyTableCell key={i}>
					<div className="bg-gray-100 rounded-sm h-[10px] w-[36px]" />
				</MyTableCell>
			))}
		</MyTableRow>
	)
}
