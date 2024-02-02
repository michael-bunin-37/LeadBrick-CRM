import {MyButton} from "@/components/Button"
import {MyDrawer} from "@/components/Drawer"
import {MyInputControlled} from "@/components/Input"
import {useDrawersStore} from "@/entities/drawers-store"
import React, {useEffect} from "react"
import {IoBriefcase, IoCloseOutline} from "react-icons/io5"
import {zodResolver} from "@hookform/resolvers/zod"
import {ProjectCreateSchema, defaultValues, useProjectCreate} from "../model"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {MyLoader} from "@/components/Loader"
import {Alert} from "@mui/material"
import {MyAlert} from "@/components/Alert"

type Props = {}

export function ProjectCreateDrawer({}: Props) {
	// STATE
	const {isOpen, type, setOpen, setType} = useDrawersStore()
	const {control, handleSubmit, reset} = useForm({
		resolver: zodResolver(ProjectCreateSchema),
		defaultValues,
	})

	// HANDLERS
	const {isPending, onSubmit, isSuccess, error} = useProjectCreate()

	const onClose = () => setOpen(false)

	// EFFECTS
	useEffect(() => {
		if (isSuccess) reset(defaultValues)
	}, [isSuccess])

	return (
		<MyDrawer
			onClose={onClose}
			open={isOpen && type == "PROJECT.CREATE"}
			anchor="right"
			slotProps={{
				backdrop: {className: "!bg-gray-900/10"},
			}}
			PaperProps={{
				className: "w-[512px] !p-0",
			}}>
			<div className="flex items-center justify-between p-6">
				<div className="flex items-center gap-x-6 font-semibold text-sm text-gray-700">
					<div className="flex items-center justify-center text-gray-50 h-6 w-6 bg-primary-600 rounded-md">
						<IoBriefcase />
					</div>
					Создать проект
				</div>
				<MyButton
					onClick={onClose}
					variant="default"
					size={"icon_sm"}>
					<IoCloseOutline
						size={16}
						className="text-gray-600"
					/>
				</MyButton>
			</div>

			{/* Form Alerts */}
			{(isSuccess || error) && (
				<div className="px-6">
					{isSuccess && <MyAlert variant="info">Проект был успешно добавлен!</MyAlert>}
					{error && <MyAlert variant="error">Ошибка: {error.message}</MyAlert>}
				</div>
			)}

			{/* Form Fields */}
			<div className="px-6 py-3 flex flex-col gap-y-6">
				<div className="flex items-start gap-x-3">
					{/* Chat Id Field */}
					<div className="flex flex-1 flex-col gap-y-3">
						<p className="text-xs font-medium text-gray-500">
							Chat Id <span className="text-primary-500">*</span>
						</p>
						<MyInputControlled
							control={control}
							name="chatId"
							inputProps={{
								className: "w-full h-[48px]",
								disabled: isPending,
								type: "number",
								placeholder: "Введите Telegram Chat Id",
							}}
						/>
					</div>

					{/* Subs Field */}
					<div className="flex flex-1 flex-col gap-y-3">
						<p className="text-xs font-medium text-gray-500">Подписчики (опционально)</p>
						<MyInputControlled
							control={control}
							name="subscribers"
							inputProps={{
								className: "w-full h-[48px]",
								disabled: isPending,
								type: "number",
								placeholder: "Введите кол-во подписчиков (опционально)",
							}}
						/>
					</div>
				</div>

				{/* Name Field */}
				<div className="flex flex-col gap-y-3">
					<p className="text-xs font-medium text-gray-500">Название (опционально)</p>
					<MyInputControlled
						control={control}
						name="name"
						inputProps={{
							className: "w-full h-[48px]",
							disabled: isPending,
							placeholder: "Введите название проекта (опционально)",
						}}
					/>
				</div>
			</div>

			{/* Form Actions */}
			<div className="mt-auto p-6 flex justify-end gap-x-2">
				{/* Form Submit */}
				<MyButton
					disabled={isPending}
					variant="default"
					size="sm"
					onClick={onClose}
					className="gap-x-3">
					Отмена
				</MyButton>
				<MyButton
					disabled={isPending}
					onClick={handleSubmit(onSubmit)}
					variant="primary"
					size="sm"
					className="gap-x-3">
					{isPending ? (
						<MyLoader
							size={14}
							className="text-white"
						/>
					) : (
						<IoBriefcase />
					)}
					Создать
				</MyButton>
			</div>
		</MyDrawer>
	)
}
