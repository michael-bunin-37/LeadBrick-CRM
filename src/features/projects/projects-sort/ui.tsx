import {MyButton} from "@/components/Button"
import {SortByParam, SortParam} from "@/utils/types/server"
import React from "react"
import {BsSortNumericDownAlt, BsSortNumericUpAlt} from "react-icons/bs"

type Props = {
	setSort: (sort: SortParam) => void
	sort?: SortParam
	sortBy: SortByParam
}

export function ProjectsSort({setSort, sort, sortBy}: Props) {
	// HANDLERS
	const onClick = () => {
		setSort({sortBy, sortOrder: sort?.sortBy === sortBy ? (sort.sortOrder == "DESC" ? "ASC" : "DESC") : "DESC"})
	}

	return (
		<MyButton
			onClick={onClick}
			variant={sort?.sortBy == sortBy ? "outlined_active" : "transparent"}
			size="icon_xs">
			{sort?.sortBy == sortBy ? (
				<>
					{sort.sortOrder === "DESC" && <BsSortNumericDownAlt />}
					{sort.sortOrder === "ASC" && <BsSortNumericUpAlt />}
				</>
			) : (
				<BsSortNumericDownAlt />
			)}
		</MyButton>
	)
}
