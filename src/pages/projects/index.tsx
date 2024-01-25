import {Layout} from "@/application/layout"
import {MyChip} from "@/components/Chip"
import {ProjectCreate} from "@/features/project/project-create"
import {ProjectsUnactiveSwitcher} from "@/features/projects/projects-unactive-swticher"
import {useProjectList} from "@/utils/api/project"
import {Cursor, SortParam} from "@/utils/types/server"
import {Header} from "@/widgets/header"
import {Navbar} from "@/widgets/navbar"
import {ProjectsFilters} from "@/widgets/projects/projects-filters"
import {ProjectsList} from "@/widgets/projects/projects-list"
import {Breadcrumbs} from "@mui/material"
import React, {useState} from "react"
import {IoBriefcase} from "react-icons/io5"

type Props = {}

export default function ProjectsPage({}: Props) {
	// STATE
	const [showUnActive, setShowUnactive] = useState(true)
	const [params, setParams] = useState<Cursor>({
		page: 1,
		pageSize: 30,
		sort: {sortOrder: "DESC", sortBy: "lastUpdated"},
	})

	// QUERIES
	const {data, isPending} = useProjectList(params, {
		select(data) {
			// Select active & unactive projects by show param
			return !showUnActive
				? {
						...data,
						data: data.data.filter(
							(project) =>
								project.usersJoin != 0 || project.dialogs != 0 || project.firstDeposits != 0 || project.reDeposits != 0,
						),
				  }
				: data
		},
	})

	return (
		<Layout>
			{/* Navbar */}
			<Navbar />

			<div className="flex flex-col flex-grow">
				{/* Header */}
				<Header />

				<div
					style={{
						height: "calc(100vh - 56px)	",
					}}
					className="overflow-y-auto py-9 px-12 flex flex-col">
					<Breadcrumbs className="text-sm font-medium">
						<MyChip
							className="text-gray-700 text-[12px] font-medium rounded-sm"
							size="sm"
							label="Проекты"
							icon={<IoBriefcase className="mr-2 ml-[-2px]" />}
						/>
						<span></span>
					</Breadcrumbs>

					<div className={"flex items-center justify-between mt-6"}>
						{/* Heading */}
						<div className="flex items-start gap-x-2">
							<span className="text-md text-gray-900 font-bold">Проекты</span>
							<span className="text-sm text-gray-500">{data && `(${data.counter})`}</span>
						</div>

						<div className="flex items-center gap-x-2">
							{/* Projects switch active and unactive projects */}
							<ProjectsFilters
								className="flex-grow"
								setParams={setParams}
								params={params}
							/>

							<ProjectsUnactiveSwitcher
								setActive={setShowUnactive}
								active={showUnActive}
							/>

							<ProjectCreate />
						</div>
					</div>

					<ProjectsList
						params={params}
						setParams={setParams}
						data={data}
						isPending={isPending}
						className="flex flex-col flex-grow mt-6"
					/>
				</div>
			</div>
		</Layout>
	)
}
