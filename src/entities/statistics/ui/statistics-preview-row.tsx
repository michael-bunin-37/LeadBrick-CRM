import {MyTableCell, MyTableRow} from "@/components/Table"
import {StatisticsResDto} from "@/utils/types/statistics"
import dayjs from "dayjs"
import React from "react"

type Props = StatisticsResDto

export function StatisticsPreviewRow(props: Props) {
	return (
		<MyTableRow>
			<MyTableCell>{dayjs(props.windowStart).format("lll")}</MyTableCell>
			<MyTableCell>
				<div className="flex items-center justify-center gap-x-2">
					{/* <ProjectsSort
        sortBy="usersJoin"
        sort={params.sort}
        setSort={onChangeSort}
      /> */}
					{props.usersJoin}
				</div>
			</MyTableCell>
			<MyTableCell>
				<div className="flex items-center justify-center gap-x-2">
					{/* <ProjectsSort
        sortBy="usersLeave"
        sort={params.sort}
        setSort={onChangeSort}
      /> */}
					{props.usersLeave}
				</div>
			</MyTableCell>
			<MyTableCell>
				<div className="flex items-center justify-center gap-x-2">
					{/* <ProjectsSort
        sortBy="dialogs"
        sort={params.sort}
        setSort={onChangeSort}
      /> */}
					{props.dialogs}
				</div>
			</MyTableCell>
			<MyTableCell className="text-center">
				{/* <Tooltip
					placement="top-end"
					title="First Deposit">
					<div className="flex items-center justify-center gap-x-2"> */}
				{/* <ProjectsSort
          sortBy="firstDeposits"
          sort={params.sort}
          setSort={onChangeSort}
        /> */}
				{props.firstDeposits}
				{/* <IoInformation size={14} />
					</div>
				</Tooltip> */}
			</MyTableCell>
			<MyTableCell className="text-center">
				{/* <Tooltip
					placement="top-end"
					title="Repeat Deposit">
					<div className="flex items-center justify-center gap-x-2"> */}
				{props.reDeposits}
				{/* <IoInformation size={14} />
					</div>
				</Tooltip> */}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.dialogs != 0 && props.usersJoin != 0 ? `${(((props.dialogs / props.usersJoin)) * 100).toFixed(1)}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${((props.firstDeposits / props.usersJoin) * 100).toFixed(1)}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.firstDeposits != 0 && props.usersJoin != 0 ? `${((props.firstDeposits / props.dialogs) * 100).toFixed(1)}%` : "-"}
			</MyTableCell>
			<MyTableCell className="text-center">
				{props.reDeposits != 0 && props.firstDeposits != 0 ? `${((props.reDeposits / props.firstDeposits) * 100).toFixed(1)}%` : "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDeposit != 0 && props.countTimeToDeposit != 0
					? dayjs.duration(props.sumTimeToDeposit / props.countTimeToDeposit, "milliseconds").humanize()
					: "-"}
			</MyTableCell>
			<MyTableCell>
				{props.sumTimeToDialog != 0 && props.countTimeToDialog != 0
					? dayjs.duration(props.sumTimeToDialog / props.countTimeToDialog, "milliseconds").humanize()
					: "-"}
			</MyTableCell>
		</MyTableRow>
	)
}
