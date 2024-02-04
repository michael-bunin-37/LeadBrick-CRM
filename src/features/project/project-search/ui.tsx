import {MyInput} from "@/components/Input"
import {useDebounce} from "@/utils/hooks"
import {cn} from "@/utils/lib"
import {InputAdornment} from "@mui/material"
import React, {useEffect, useState} from "react"
import {IoSearchOutline} from "react-icons/io5"

type Props = {className?: string; onChange: (query: string) => void}

export function ProjectSearch({onChange: handleChage, className}: Props) {
	const [value, setValue] = useState("")
	const debouncedValue = useDebounce(value, 350)

	// HANDLERS
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setValue(e.currentTarget.value)

	// EFFECTS
	useEffect(() => {
		handleChage(debouncedValue)
	}, [debouncedValue])

	return (
		<MyInput
			startAdornment={
				<InputAdornment position="start">
					<IoSearchOutline size={14} />
				</InputAdornment>
			}
			className={cn("h-9", className)}
			placeholder="Поиск..."
			value={value}
			onChange={onChange}
		/>
	)
}
