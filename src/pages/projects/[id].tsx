import {Layout} from "@/application/layout"
import {MySkeleton} from "@/components/Skeleton"
import {MyTab} from "@/components/Tab"
import {MyTabList} from "@/components/Tab-List"
import {useProjectById} from "@/utils/api/project"
import {Header} from "@/widgets/header"
import {Navbar} from "@/widgets/navbar"
import {useRouter} from "next/router"
import React, {useState} from "react"
import TabsContext from "@mui/lab/TabContext"
import {useInviteLinksList} from "@/utils/api/invite-links"
import {Cursor} from "@/utils/types/server"
import {Breadcrumbs} from "@mui/material"
import Link from "next/link"
import {MyChip} from "@/components/Chip"
import {IoBriefcase} from "react-icons/io5"
import {ProjectInviteLinksList} from "@/widgets/project/project-invite-links-list"
import {ProjectInviteLinksFilters} from "@/widgets/project/project-invite-links-filters"
import {ProjectsUnactiveSwitcher} from "@/features/projects/projects-unactive-swticher"
import {ProjectDeposits} from "@/widgets/project/project-deposits"

type Props = {}

export default function ProjectPage({}: Props) {
	// STATE
	const {query} = useRouter()
	const [tab, setTab] = useState("0")

	// QUERIES
	const {data: project, isPending: isProjectPending} = useProjectById(query.id as string, {enabled: !!query.id})

	return (
		<Layout>
			{/* ==> Navbar ==> */}
			<Navbar />

			<div className="flex flex-col flex-grow">
				{/* ==> Header ==> */}
				<Header />

				<div
					style={{
						height: "calc(100vh - 56px)	",
					}}
					className="overflow-y-auto py-9 px-12 flex flex-col flex-grow">
					{/* Breadcrumbs */}
					<Breadcrumbs className="text-sm font-medium">
						<Link
							href="/projects"
							passHref
							legacyBehavior>
							<MyChip
								className="text-[12px] rounded-sm"
								size="sm"
								label="Проекты"
								icon={<IoBriefcase className="mr-2 ml-[-2px]" />}
							/>
						</Link>
						{project ? (
							<MyChip
								className="text-[12px] rounded-sm"
								size="sm"
								label={project.name}
							/>
						) : (
							<MySkeleton
								width="112px"
								height={18}
								variant="text"
							/>
						)}
					</Breadcrumbs>

					{/* Header */}
					<div className="flex items-start gap-x-2 mt-6">
						{project ? (
							<span className="text-md text-gray-900 font-bold">{project.name}</span>
						) : (
							<MySkeleton
								width="196px"
								height={24}
								variant="text"
							/>
						)}
					</div>

					{/* Tabs */}
					<TabsContext value={tab}>
						<div className="border-b border-gray-200 mt-3">
							<MyTabList
								className="mb-[-1px]"
								onChange={(e, newValue) => setTab(newValue)}
								aria-label="lab API tabs example">
								<MyTab
									label="Приглас. ссылки"
									value="0"
								/>
								<MyTab
									label="Все депозиты"
									value="1"
								/>
							</MyTabList>
						</div>

						{tab == "0" && (
							<ProjectInviteLinksList
								projectId={query.id as string}
								className="flex flex-col flex-grow mt-6"
							/>
						)}
						{tab == "1" && (
							<ProjectDeposits
								projectId={query.id as string}
								className="flex flex-col flex-grow mt-6"
							/>
						)}
					</TabsContext>
				</div>
			</div>
		</Layout>
	)
}
