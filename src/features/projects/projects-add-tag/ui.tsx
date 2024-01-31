import {MyButton} from "@/components/Button"
import {MyChip} from "@/components/Chip"
import React, {useEffect, useState} from "react"
import {IoCloseOutline, IoPricetag, IoPricetagOutline, IoPricetagsOutline} from "react-icons/io5"
import {useProjectsAddTag} from "./model"
import {MyMenu} from "@/components/Menu"
import {useTagsList} from "@/utils/api/tags"
import {MyMenuItem} from "@/components/MenuItem"
import {MyInput} from "@/components/Input"
import {InputAdornment, Popover} from "@mui/material"
import {cn} from "@/utils/lib"
import {MyLoader} from "@/components/Loader"

type ProjectsAddTagProps = {
	id: string
}

function ProjectsAddTag({id: chatId}: ProjectsAddTagProps) {
	const {
		mutate: createTag,
		isPending: isCreateTagPending,
		data: createTagData,
	} = useProjectsAddTag()
	const {mutate: addTag, isPending: isAddTagPending, data: addTagData} = useProjectsAddTag()
	const [anchor, setAnchor] = useState<HTMLElement | null>(null)
	const [value, setValue] = useState("")

	const {data: tagsList, isPending: isTagsListPending} = useTagsList({
		select(data) {
			return value.length !== 0
				? data.filter((tag) => tag.toLocaleLowerCase().match(value.toLowerCase()))
				: data
		},
	})

	// HANDLERS
	const onSubmit = () => {
		if (value.length !== 0) {
			createTag({chatId, tag: value})
		}
	}

	return (
		<React.Fragment>
			{/* pretier-ignore */}
			{createTagData || addTagData ? (
				<MyChip
					className="text-xs rounded-md h-[24px] px-2"
					label={createTagData || addTagData}
				/>
			) : (
				<>
					<MyButton
						onClick={(e) => setAnchor(e.currentTarget)}
						variant={"transparent"}
						size="sm"
						className="gap-x-2 text-gray-500 hover:text-gray-700 text-[11px] h-[24px] px-1">
						<IoPricetagOutline />
						Добав...
					</MyButton>

					<Popover
						onClose={() => setAnchor(null)}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: -12,
							horizontal: "left",
						}}
						slotProps={{paper: {className: "min-w-[256px] p-0"}}}
						open={!!anchor}
						anchorEl={anchor}>
						{/* Search Or Create Input */}
						<form
							onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()
								onSubmit()
							}}>
							<MyInput
								disabled={isCreateTagPending}
								onChange={(e) => setValue(e.currentTarget.value)}
								startAdornment={
									<InputAdornment position="start">
										<IoPricetagsOutline />
									</InputAdornment>
								}
								endAdornment={
									isCreateTagPending && (
										<InputAdornment position="end">
											<MyLoader
												size={12}
												className="text-gray-900"
											/>
										</InputAdornment>
									)
								}
								className="h-8 text-xs w-full rounded-[4px] rounded-b-none bg-gray-50 text-gray-900"
								placeholder="Искать или создать новый"
							/>
						</form>

						<div className="p-2 mt-2">
							<p className="mb-2 text-xs px-2 text-gray-400">
								Выбрать из предложеных / создать новый
							</p>
							{tagsList &&
								tagsList.map((tag) => (
									<MyMenuItem
										onClick={() => addTag({chatId, tag})}
										dense
										key={tag}
										className="px-1">
										<MyChip
											className="text-xs justify-start rounded-md h-[24px] px-2"
											size="sm"
											label={tag}
										/>
									</MyMenuItem>
								))}
							{tagsList?.length == 0 && value.length == 0 && (
								<p className="text-xs px-2">Ничего не найдено!</p>
							)}
							{tagsList?.length == 0 && value.length !== 0 && (
								<button
									onClick={onSubmit}
									className="flex items-center gap-x-2 text-xs px-2">
									Создать:
									<MyChip
										className="text-xs justify-start rounded-md h-[24px] px-2"
										size="sm"
										label={value}
									/>
								</button>
							)}
						</div>
					</Popover>
				</>
			)}
		</React.Fragment>
	)
}

export {ProjectsAddTag}
