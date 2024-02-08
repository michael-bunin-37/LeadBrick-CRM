import {MyButton, buttonVariants} from "@/components/Button"
import React, {useEffect, useState} from "react"
import {
	IoCalendar,
	IoCalendarClearOutline,
	IoCalendarNumberOutline,
	IoCalendarOutline,
	IoCloseOutline,
} from "react-icons/io5"
import {DateRange} from "react-day-picker"
import {cn} from "@/utils/lib"
import {Divider, IconButton, Popover} from "@mui/material"
import {Calendar} from "@/components/Calendar"
import {MyMenuItem} from "@/components/MenuItem"
import {Cursor, FilterByParam, FilterParam} from "@/utils/types/server"
import {usePrevious} from "@/utils/hooks"
import dayjs from "dayjs"
import {
	DateFilterInitialOptionsTypeEnum,
	dateFilterOptionsFunctions,
	getToday,
} from "./model"
import {HiOutlineSelector} from "react-icons/hi"
import {MyMenu} from "@/components/Menu"
import {useDateFilterStore} from "@/entities/date-filter-store"

type Props = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
	type?: "FILTER" | "PARAMS"
	filterBy?: FilterByParam
}

export function ProjectsDateFilter({
	className,
	setParams,
	params,
	type = "PARAMS",
	filterBy = "date",
}: Props) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const [option, setOption] =
		useState<keyof typeof DateFilterInitialOptionsTypeEnum>()
	const {dateRange: date, setDateRange: setDate, etc_gmt} = useDateFilterStore()

	// EFFECTS
	useEffect(() => {
		if (!date) setOption(undefined)
	}, [date])

	useEffect(() => {
		const newParams: Cursor = {...params}

		if (date && type === "PARAMS") {
			if (date.from) newParams.windowStart = date.from.toISOString()
			if (date.to) newParams.windowEnd = date.to.toISOString()
		}

		if (date && type === "FILTER") {
			const filters: FilterParam[] = []
			if (date.from)
				filters.push({
					filterBy,
					filterOperator: "MORE_OR_EQUAL",
					filterValue: date.from.toISOString(),
				})

			if (date.to)
				filters.push({
					filterBy,
					filterOperator: "LESS_OR_EQUAL",
					filterValue: date.to.toISOString(),
				})

			newParams.filters = filters
		}

		if (!date && type === "PARAMS") {
			newParams.windowStart = new Date(0).toISOString()
			newParams.windowEnd = new Date().toISOString()
		}

		if (!date && type === "FILTER") {
			newParams.filters = newParams.filters
				? [
						...newParams.filters.filter(
							(filter) => filter.filterBy !== filterBy,
						),
				  ]
				: []
		}

		setParams(newParams)
	}, [date, type])

	useEffect(() => {
		if (option) {
			const func = dateFilterOptionsFunctions[option]
			setDate(func())
		}
	}, [option])

	return (
		<div className={className}>
			<div
				onClick={(e) => setAnch(e.currentTarget)}
				className={cn(
					buttonVariants({size: "sm", variant: "outlined"}),
					"gap-x-2 h-9 w-full flex items-center cursor-pointer",
					!date && "text-gray-500",
				)}>
				{!date && (
					<>
						Дата:
						<span className="text-gray-400">Выбрать дату</span>
					</>
				)}
				{date && (
					<>
						{date.from
							? // @ts-ignore
							  dayjs(date.from).tz(etc_gmt).format("lll")
							: "Дата начала"}{" "}
						- &nbsp;
						{date.to
							? // @ts-ignore
							  dayjs(date.to).tz(etc_gmt).format("lll")
							: "Дата окончания"}
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
			</div>

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
				<div className="flex gap-x-6 pt-6">
					{/* Preset Options */}
					<div className="flex items-start">
						<div className="flex flex-col gap-y-1 mt-3 pr-6 pl-3 border-r border-r-gray-200 border-dashed">
							<div className="px-3 text-xs font-medium text-gray-500 mb-2">
								Выберите опции
							</div>
							<MyButton
								onClick={() => setOption("today")}
								size={"sm"}
								variant={option == "today" ? "default" : "transparent"}
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За сегодня
							</MyButton>
							<MyButton
								onClick={() => setOption("yesterday")}
								size={"sm"}
								variant={option == "yesterday" ? "default" : "transparent"}
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За вчера
							</MyButton>
							<MyButton
								onClick={() => setOption("lastWeek")}
								size={"sm"}
								variant={option == "lastWeek" ? "default" : "transparent"}
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За эту неделю
							</MyButton>
							<MyButton
								onClick={() => setOption("lastSeven")}
								size={"sm"}
								variant={option == "lastSeven" ? "default" : "transparent"}
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За последние 7 дней
							</MyButton>
							<MyButton
								onClick={() => setOption("lastMonth")}
								size={"sm"}
								variant={option == "lastMonth" ? "default" : "transparent"}
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За этот месяц
							</MyButton>
							<MyButton
								onClick={() => {
									setOption(undefined)
									setDate(undefined)
								}}
								size={"sm"}
								variant="transparent"
								className="col-span-4 justify-start gap-x-2 rounded-sm">
								<IoCalendarClearOutline />
								За всё время
							</MyButton>
						</div>
					</div>

					{/* Date Range Picker */}
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
						disabled={{
							before: dayjs().subtract(2, "month").toDate(),
						}}
					/>
				</div>
			</Popover>
		</div>
	)
}
