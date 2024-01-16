"use client"

import {cn} from "@/utils/lib"
import * as React from "react"
import {variants as buttonVariants} from "./Button"

import {DayPicker} from "react-day-picker"
import {
	IoArrowBack,
	IoArrowForward,
	IoChevronBack,
	IoChevronBackOutline,
	IoChevronForward,
	IoChevronForwardOutline,
} from "react-icons/io5"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({className, classNames, showOutsideDays = true, ...props}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(buttonVariants({variant: "outlined"}), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
				row: "flex w-full mt-2 gap-x-1",
				cell: "z-[2] relative h-9 w-9 text-center text-xs text-gray-700 [&:has(.day-today)]:!bg-blue-500 rounded-md",
				// cell: "text-center text-sm p-0 relative rounded-md [&:has([aria-selected].day-today)]:!bg-blue-500 [&:has([aria-selected].day-today)>*]:!text-gray-100 [&:has([aria-selected].day-outside)]:bg-gray-50 [&:has([aria-selected].day-outside)]:opacity-50 [&:has([aria-selected].day-range-start)]:bg-gray-900 [&:has([aria-selected].day-range-start)>*]:text-gray-50 [&:has([aria-selected].day-range-end)]:bg-gray-900 [&:has([aria-selected].day-range-end)>*]:text-gray-50 [&:has([aria-selected])]:bg-gray-100  focus-within:relative focus-within:z-20",
				day: "rounded-md h-full z-[1] w-full absolute top-0 left-0 hover:!bg-gray-900 hover:text-gray-50 focus:bg-gray-900 focus:text-gray-50 transition-all",
				day_range_middle: "[&:not(.day-today)]:bg-gray-100 [&]:hover:!bg-gray-900",
				day_today: "day-today bg-blue-500 text-gray-50",
				day_outside: "opacity-50",
				day_range_start: "bg-gray-900 text-gray-50",
				day_range_end: "bg-gray-900 text-gray-50",
				// day_disabled: "text-gray-400 opacity-50",
				// day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({...props}) => (
					<IoChevronBackOutline
						size={16}
						className="w-6"
					/>
				),
				IconRight: ({...props}) => (
					<IoChevronForwardOutline
						size={16}
						className="w-6"
					/>
				),
			}}
			{...props}
		/>
	)
}
