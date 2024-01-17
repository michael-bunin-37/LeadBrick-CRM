import {MyButton} from "@/components/Button"
import {MyInput, MyInputProps} from "@/components/Input"
import {MyMenu} from "@/components/Menu"
import {MyMenuItem} from "@/components/MenuItem"
import {useDebounce} from "@/utils/hooks"
import {cn} from "@/utils/lib"
import {Cursor, FilterByParam, FilterByParamEnum, FilterParam} from "@/utils/types/server"
import {InputAdornment, InputProps} from "@mui/material"
import React, {useEffect, useState} from "react"
import {IoChevronDown, IoSearchOutline} from "react-icons/io5"

type Props = {
	className?: string
	setParams: (params: Cursor) => void
	params: Cursor
	slotProps?: {
		input?: MyInputProps
	}
}

export function ProjectDepositsSearch({className, setParams, params, slotProps}: Props) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const [type, setType] = useState<FilterByParam>("inviteLinkName")
	const [value, setValue] = useState("")
	const debouncedValue = useDebounce(value, 350)

	// HANDLERS
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setValue(e.currentTarget.value)
	const onChangeType = (type: FilterByParam) => {
		setValue("")
		setType(type)
	}

	// EFFECTS
	useEffect(() => {
		const filters: FilterParam[] = params.filters ? [...params.filters.filter((filter) => filter.filterBy === "date")] : []
		if (debouncedValue.length > 2) {
			if (type === "inviteLink") filters.push({filterBy: "inviteLink", filterOperator: "%LIKE%", filterValue: debouncedValue})
			if (type === "inviteLinkName")
				filters.push({filterBy: "inviteLinkName", filterOperator: "LIKE%", filterValue: debouncedValue})
			if (type === "userId") filters.push({filterBy: "userId", filterOperator: "EQUAL", filterValue: debouncedValue})
			setParams({...params, filters})
		} else {
			setParams({...params, filters})
		}
	}, [debouncedValue, type])

	return (
		<div className={cn("flex items-center", className)}>
			<MyButton
				size="sm"
				onClick={(e) => setAnch(e.currentTarget)}
				variant="outlined"
				className="h-9 bg-gray-50 rounded-r-none border-r-transparent gap-x-2">
				{!type && "Тип поиска"}
				{type && FilterByParamEnum[type]}
				<IoChevronDown className={cn(!!anch && "rotate-180")} />
			</MyButton>

			<MyMenu
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: -12,
					horizontal: "left",
				}}
				onClose={() => setAnch(null)}
				anchorEl={anch}
				open={!!anch}>
				{Object.entries(FilterByParamEnum).map(([key, value]) => {
					if (key == "date") return null
					return (
						<MyMenuItem
							key={key}
							onClick={() => onChangeType(key as FilterByParam)}
							selected={key === type}
							dense>
							{/* @ts-ignore */}
							{FilterByParamEnum[key]}
						</MyMenuItem>
					)
				})}
			</MyMenu>

			<MyInput
				startAdornment={
					<InputAdornment position="start">
						<IoSearchOutline size={14} />
					</InputAdornment>
				}
				placeholder="Поиск..."
				{...slotProps?.input}
				value={value}
				onChange={onChange}
				className={cn("h-9 rounded-l-none flex-grow", slotProps?.input?.className)}
			/>
		</div>
	)
}
