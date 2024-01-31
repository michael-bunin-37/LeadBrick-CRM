import {MySkeleton} from "@/components/Skeleton"
import {MyTableCell, MyTableRow} from "@/components/Table"
import Link from "next/link"
import React from "react"
import {IoPricetagsOutline} from "react-icons/io5"

type Props = {
	className?: string
}

export function ProjectPreviewRowSkeleton({className}: Props) {
	return (
		<MyTableRow>
			<MyTableCell>
				<div className="flex items-center gap-x-3 truncate">
					<div className="h-6 w-6 rounded-[4px] bg-gray-100" />
					<div className="bg-gray-100 rounded-sm h-[10px] w-[128px]" />
				</div>
			</MyTableCell>
			{[...Array(12)].map((_, i) => (
				<MyTableCell key={i}>
					<div className="bg-gray-100 rounded-sm h-[10px] w-[36px]" />
				</MyTableCell>
			))}
			<MyTableCell>
				<div className="bg-gray-100 rounded-sm h-[10px] w-[36px]" />
			</MyTableCell>
		</MyTableRow>
	)
}
