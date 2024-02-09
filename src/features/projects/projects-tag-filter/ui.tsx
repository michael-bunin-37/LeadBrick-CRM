import {buttonVariants} from "@/components/Button"
import {MyChip} from "@/components/Chip"
import {MyInput} from "@/components/Input"
import {MyMenuItem} from "@/components/MenuItem"
import {useTagsList} from "@/utils/api/tags"
import {cn} from "@/utils/lib"
import {Cursor, FilterParam} from "@/utils/types/server"
import {IconButton, InputAdornment, Popover} from "@mui/material"
import React, {useEffect, useState} from "react"
import {
	IoCloseOutline,
	IoPricetagOutline,
	IoPricetagsOutline,
} from "react-icons/io5"

type ProjectsTagFilterProps = {
	className?: string
	setParams: (cursor: Cursor) => void
	params: Cursor
}

function ProjectsTagFilter({params, setParams}: ProjectsTagFilterProps) {
	// STATE
	const [anchor, setAnchor] = useState<HTMLElement | null>(null)
	const [value, setValue] = useState("")
	const [tag, setTag] = useState<string | null>(null)
	const {data: tagsList, isPending: isTagsListPending} = useTagsList({
		select: (data) =>
			value.length !== 0
				? data.filter((tag) =>
						tag.toLocaleLowerCase().match(value.toLowerCase()),
				  )
				: data,
	})

	// HANDLERS
	const onChange = (tag: string | null) => {
		setTag(tag)
	}

	// EFFECTS
	useEffect(() => {
		const filters: FilterParam[] = []
		if (tag)
			filters.push({filterBy: "tag", filterOperator: "EQUAL", filterValue: tag})
		setParams({...params, filters})
	}, [tag])

	return (
		<React.Fragment>
			<div
				onClick={(e) => setAnchor(e.currentTarget)}
				className={cn(
					buttonVariants({size: "sm", variant: "outlined"}),
					"gap-x-2 h-9 flex items-center cursor-pointer text-gray-500",
				)}>
				<>
					Тег:
					<span className={cn("text-gray-400", tag && "text-gray-700")}>
						{tag ? tag : "Выбрать тег"}
					</span>
					{tag ? (
						<IconButton
							size="small"
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								onChange(null)
							}}>
							<IoCloseOutline size={14} />
						</IconButton>
					) : (
						<IoPricetagsOutline size={12} />
					)}
				</>
			</div>

			<Popover
				onClose={() => setAnchor(null)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: -12,
					horizontal: "right",
				}}
				slotProps={{paper: {className: "min-w-[256px] p-0"}}}
				open={!!anchor}
				anchorEl={anchor}>
				{/* Search Or Create Input */}

				<MyInput
					onChange={(e) => setValue(e.currentTarget.value)}
					startAdornment={
						<InputAdornment position="start">
							<IoPricetagsOutline />
						</InputAdornment>
					}
					className="h-8 text-xs w-full rounded-[4px] rounded-b-none bg-gray-50 text-gray-900"
					placeholder="Поиск по названию"
				/>

				<div className="p-2 mt-2">
					<p className="mb-2 text-xs px-2 text-gray-400">
						Выбрать из предложеных
					</p>
					{tagsList &&
						tagsList.map((t) => (
							<MyMenuItem
								selected={t === tag}
								onClick={() => onChange(t)}
								dense
								key={t}
								className="px-1">
								<MyChip
									className="text-xs justify-start rounded-md h-[24px] px-2"
									size="sm"
									label={t}
								/>
							</MyMenuItem>
						))}
					{tagsList?.length == 0 && (
						<p className="text-xs px-2">Ничего не найдено!</p>
					)}
				</div>
			</Popover>
		</React.Fragment>
	)
}

export {ProjectsTagFilter}
