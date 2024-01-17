import {MyButton} from "@/components/Button"
import React, {useEffect, useState} from "react"
import {IoCalendar, IoCalendarClearOutline, IoCalendarNumberOutline, IoCalendarOutline, IoCloseOutline} from "react-icons/io5"
import {DateRange} from "react-day-picker"
import {cn} from "@/utils/lib"
import {Divider, IconButton, Popover} from "@mui/material"
import {Calendar} from "@/components/Calendar"
import {MyMenuItem} from "@/components/MenuItem"
import {Cursor} from "@/utils/types/server"
import {usePrevious} from "@/utils/hooks"
import dayjs from "dayjs"
import {DateFilterInitialOptionsTypeEnum, dateFilterOptionsFunctions} from "./model"
import {HiOutlineSelector} from "react-icons/hi"
import {MyMenu} from "@/components/Menu"

type Props = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
	type?: "FILTER" | "PARAMS"
}

export function ProjectsDateFilter({className, setParams, params, type = "PARAMS"}: Props) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const [optionsAnch, setOptionsAnch] = useState<HTMLElement | null>(null)
	const [date, setDate] = useState<DateRange>()
	const [option, setOption] = useState<keyof typeof DateFilterInitialOptionsTypeEnum>()

	const prevDate = usePrevious(date) as undefined | DateRange

	useEffect(() => {
		if (!date) setOption(undefined)
	}, [date])

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

	useEffect(() => {
		if (option) {
			const func = dateFilterOptionsFunctions[option]
			setDate(func())
		}
	}, [option])

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
						{date.from ? dayjs(date.from).format("ll") : "Дата начала"} -&nbsp;
						{date.to ? dayjs(date.to).format("ll") : "Дата окончания"}
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
				<div className="flex flex-col gap-y-6 ">
					{/* Preset Options */}
					<div className="px-3 pt-6">
						<MyButton
							onClick={(e) => setOptionsAnch(e.currentTarget)}
							variant="outlined"
							className={cn("gap-x-3 w-full justify-between text-xs min-w-[276px] text-gray-500", option && "text-gray-700")}>
							<div className="flex items-center gap-x-3">
								<IoCalendarOutline />
								{option ? DateFilterInitialOptionsTypeEnum[option] : "Выбрать предустановленную опцию"}
							</div>
							<HiOutlineSelector />
						</MyButton>

						<MyMenu
							onClose={() => setOptionsAnch(null)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: -12,
								horizontal: "left",
							}}
							slotProps={{paper: {className: "min-w-[256px]"}}}
							anchorEl={optionsAnch}
							open={!!optionsAnch}>
							{Object.entries(DateFilterInitialOptionsTypeEnum).map(([key, value]) => (
								<MyMenuItem
									onClick={() => {
										setOption(key as keyof typeof DateFilterInitialOptionsTypeEnum)
										setOptionsAnch(null)
									}}
									selected={key === option}>
									{value}
								</MyMenuItem>
							))}
						</MyMenu>
					</div>

					{/* Date Range Picker */}
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</div>
			</Popover>
		</div>
	)
}
