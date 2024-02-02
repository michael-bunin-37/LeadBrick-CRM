import {MyMenuItem} from "@/components/MenuItem"
import {cn} from "@/utils/lib"
import React from "react"
import {IoTrashOutline} from "react-icons/io5"
import {useProjectDelete} from "./model"
import {MyLoader} from "@/components/Loader"
import {useRouter} from "next/router"

type ProjectDeleteProps = {
	id: string
	className?: string
}

function ProjectDelete({className, id}: ProjectDeleteProps) {
	const {push} = useRouter()

	// MUTATIONS
	const {mutate, data, isPending} = useProjectDelete()

	return (
		<MyMenuItem
			onClick={() => mutate({chatId: id})}
			disabled={isPending}
			dense
			className={cn("flex items-center gap-x-3", className)}>
			{isPending ? <MyLoader size={14} /> : <IoTrashOutline />}
			Удалить проект
		</MyMenuItem>
	)
}

export {ProjectDelete}
