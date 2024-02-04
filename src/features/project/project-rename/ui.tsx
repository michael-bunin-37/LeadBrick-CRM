import {MyInput} from "@/components/Input"
import {IconButton, Tooltip} from "@mui/material"
import React, {useEffect, useState} from "react"
import {IoCloseOutline} from "react-icons/io5"
import {RiEditFill} from "react-icons/ri"
import {useProjectRename} from "./model"
import {MyLoader} from "@/components/Loader"

type ProjectRenameProps = {
	id: string
	name: string
}

function ProjectRename({name, id: chatId}: ProjectRenameProps) {
	// STATE
	const [value, setValue] = useState("")
	const [isEdit, setEdit] = useState(false)

	// MUTATIONS
	const {mutate, isSuccess, isPending} = useProjectRename()

	// HANDLERS
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		mutate(
			{chatId, name: value},
			{
				onSuccess: () => {
					setEdit(false)
				},
			},
		)
	}

	const onToggleEdit = () => {
		if (isEdit) setValue(name)
		setEdit(!isEdit)
	}

	// EFFECTS
	useEffect(() => setValue(name), [name])

	return (
		<form
			onSubmit={onSubmit}
			className="flex items-center gap-x-4">
			{/* <span className="text-md text-gray-900 font-bold">{name}</span> */}

			<input
				placeholder="Название проекта"
				onChange={(e) => setValue(e.currentTarget.value)}
				value={value}
				disabled={!isEdit || isPending}
				className={`outline-none text-md text-gray-900 font-bold bg-transparent`}
				style={{
					minWidth: "186px",
					width: `${value.length * 11}px`,
					maxWidth: "512px",
				}}
			/>

			{isPending && (
				<MyLoader
					className="text-gray-700"
					size={14}
				/>
			)}

			<Tooltip
				title="Редактировать название"
				placement="bottom-end">
				<div>
					<IconButton
						onClick={onToggleEdit}
						className="text-gray-700">
						{isEdit ? <IoCloseOutline size={16} /> : <RiEditFill size={16} />}
					</IconButton>
				</div>
			</Tooltip>
		</form>
	)
}

export {ProjectRename}
