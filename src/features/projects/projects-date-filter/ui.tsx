import {MyButton} from "@/components/Button"
import React, {useEffect, useState} from "react"
import {IoCalendar, IoCalendarClearOutline, IoCalendarNumberOutline, IoCalendarOutline, IoCloseOutline} from "react-icons/io5"
import {DateRange} from "react-day-picker"
import {addDays, format, formatISO} from "date-fns"
import {cn} from "@/utils/lib"
import {Divider, IconButton, Popover} from "@mui/material"
import {Calendar} from "@/components/Calendar"
import {MyMenuItem} from "@/components/MenuItem"
import {getLastMonthRange, getLastWeekRange, getLastYearRange} from "./model"
import {Cursor} from "@/utils/types/server"
import {usePrevious} from "@/utils/hooks"

type Props = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
	type?: "FILTER" | "PARAMS"
}

export function ProjectsDateFilter({className, setParams, params, type = "PARAMS"}: Props) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const [date, setDate] = useState<DateRange>()

	const prevDate = usePrevious(date) as undefined | DateRange

	useEffect(() => {
		if (date && date.from && date.to) {
			setParams({
				...params,
				...(type == "PARAMS" && {
					windowStart: date.from.toISOString(),
					windowEnd: date.to.toISOString(),
				}),
				...(type == "FILTER" && {
					filters: params.filters
						? [
								...params.filters.filter((filter) => filter.filterBy !== "date"),
								{filterBy: "date", filterValue: date.from.toISOString(), filterOperator: "MORE_OR_EQUAL"},
								{filterBy: "date", filterValue: date.to.toISOString(), filterOperator: "LESS_OR_EQUAL"},
						  ]
						: [],
				}),
			})
		} else if (date === undefined && prevDate !== undefined)
			setParams({
				...params,
				...(type == "PARAMS" && {
					windowStart: new Date(0).toISOString(),
					windowEnd: new Date().toISOString(),
				}),
				...(type == "FILTER" && {
					filters: params.filters ? [...params.filters.filter((filter) => filter.filterBy !== "date")] : [],
				}),
			})
	}, [date])

	return (
		<div className={className}>
			<MyButton
				onClick={(e) => setAnch(e.currentTarget)}
				variant="outlined"
				size="sm"
				className={cn("gap-x-2 h-9 w-full", !date && "text-gray-500")}>
				{!date && (
					<>
						Дата:
						<span className="text-gray-400">Выбрать дату</span>
					</>
				)}
				{date && (
					<>
						{date.from ? format(date.from, "LLL dd, y") : "Дата начала"} -&nbsp;
						{date.to ? format(date.to, "LLL dd, y") : "Дата окончания"}
					</>
				)}
				{date ? (
					<IconButton
						size="small"
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							setDate(undefined)
						}}>
						<IoCloseOutline size={14} />
					</IconButton>
				) : (
					<IoCalendarOutline size={12} />
				)}
			</MyButton>

			<Popover
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: -12,
					horizontal: "right",
				}}
				onClose={() => setAnch(null)}
				open={!!anch}
				anchorEl={anch}>
				<div>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>

					{/* <Divider className="border-gray-200 border-dashed mt-3 mb-6" /> */}

					{/* Default Actions */}
					{/* <div className="flex gap-x-1 pb-3">
						<MyButton
							onClick={() => setDate(getLastWeekRange())}
							size="sm"
							className="flex-1 bg-gray-100 text-[12px] gap-x-2 rounded-sm">
							<IoCalendarOutline size={14} />
							Последняя неделя
						</MyButton>
						<MyButton
							onClick={() => setDate(getLastMonthRange())}
							size="sm"
							className="flex-1 bg-gray-100 text-[12px] gap-x-2 rounded-sm">
							<IoCalendarNumberOutline size={14} />
							Последний месяц
						</MyButton>
						<MyButton
							onClick={() => setDate(getLastYearRange())}
							size="sm"
							className="flex-1 bg-gray-100 text-[12px] gap-x-2 rounded-sm">
							<IoCalendarClearOutline size={14} />
							Последний год
						</MyButton>
					</div> */}
				</div>
			</Popover>
		</div>
	)
}
