import React from "react"
import {IoCloseOutline} from "react-icons/io5"
import {useProjectsDeleteTag} from "./model"
import {MyLoader} from "@/components/Loader"

type ProjectsDeleteTagProps = {
	id: string
}

function ProjectsDeleteTag({id: chatId}: ProjectsDeleteTagProps) {
	const {data, isPending, mutate} = useProjectsDeleteTag()

	return (
		<button onClick={() => mutate({chatId})}>
			{isPending ? (
				<MyLoader
					size={12}
					className="text-gray-900"
				/>
			) : (
				<IoCloseOutline size={14} />
			)}
		</button>
	)
}

export {ProjectsDeleteTag}
