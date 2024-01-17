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

export function ProjectInviteLinksSearch({className, setParams, params, slotProps}: Props) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const [type, setType] = useState<FilterByParam>("inviteLinkName")
	const [value, setValue] = useState("")
	const debouncedValue = useDebounce(value, 350)

	// HANDLERS
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setValue(e.currentTarget.value)

	useEffect(() => setValue(""), [type])

	// EFFECTS
	useEffect(() => {
		setParams({...params, inviteLinkOrName: debouncedValue})
	}, [debouncedValue, type])

	return (
		<div className={cn("flex items-center", className)}>
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
