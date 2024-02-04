import {MyPagination} from "@/components/Pagination"
import {MyTable, MyTableBody, MyTableCell, MyTableHead, MyTableRow} from "@/components/Table"
import {InviteLinkPreviewRow, InviteLinkPreviewRowSkeleton} from "@/entities/invite-link"
import {ProjectsSort} from "@/features/projects/projects-sort"
import {useInviteLinksList} from "@/utils/api/invite-links"
import {useProjectById} from "@/utils/api/project"
import {GrayToken} from "@/utils/theme"
import {InviteLinkResDto} from "@/utils/types/invite-link"
import {ProjectResDto} from "@/utils/types/project"
import {Cursor, CursorList, SortParam} from "@/utils/types/server"
import {Box, Tooltip} from "@mui/material"
import {useRouter} from "next/router"
import React, {useState} from "react"
import {IoHelpCircle, IoInformation, IoLink} from "react-icons/io5"
import {IoCloudOfflineOutline} from "react-icons/io5"
import {ProjectInviteLinksFilters} from "./project-invite-links-filters"
import {ProjectsUnactiveSwitcher} from "@/features/projects/projects-unactive-swticher"

type Props = {
	className?: string
	projectId?: string
}

export function ProjectInviteLinksList({className, projectId}: Props) {
	// STATE
	const [showUnActive, setShowUnactive] = useState(false)
	const [params, setParams] = useState<Cursor>({
		page: 1,
		pageSize: 200,
		sort: {sortOrder: "DESC", sortBy: "lastUpdated"},
	})

	// QUERIES

	const {data, isPending} = useInviteLinksList(
		{...params, chatId: projectId as string},
		{
			enabled: !!projectId,
			select(data) {
				// Select active & unactive projects by show param
				return !showUnActive
					? {
							...data,
							data: data.data.filter(
								(inviteLink) =>
									inviteLink.usersJoin != 0 ||
									inviteLink.usersLeave != 0 ||
									inviteLink.dialogs != 0 ||
									inviteLink.firstDeposits != 0 ||
									inviteLink.reDeposits != 0,
							),
					  }
					: data
			},
		},
	)

	// HANDLERS
	const onChangeSort = (sort: SortParam) => setParams({...params, sort})
	const onChangePage = (page: number) => setParams({...params, page})

	return (
		<div className={className}>
			<div className="flex items-center justify-end gap-x-2 mb-6">
				{/* Projects invite links Filters */}
				<ProjectInviteLinksFilters
					className="flex-grow"
					params={params}
					setParams={setParams}
				/>

				{/* Projects invite links switch active and unactive projects */}
				<ProjectsUnactiveSwitcher
					setActive={setShowUnactive}
					active={showUnActive}
				/>
			</div>

			{/* Body & Head */}
			<div className={"relative flex-grow"}>
				<Box className="absolute top-0 left-0 w-full h-full overflow-x-auto">
					<MyTable>
						{/* Invite links list head */}
						<MyTableHead className="sticky top-[-1px] z-10">
							<MyTableRow>
								<MyTableCell>
									<div className="flex items-center gap-x-2">
										Название ссылки
										<span className="text-gray-500">{data ? `(${data.counter})` : ``}</span>
									</div>
								</MyTableCell>
								{/* <MyTableCell>
									<div className="flex items-center gap-x-2">
										<ProjectsSort
											sortBy="subscribers"
											sort={params.sort}
											setSort={onChangeSort}
										/>
										Подписчики
									</div>
								</MyTableCell> */}
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										<ProjectsSort
											sortBy="usersJoin"
											sort={params.sort}
											setSort={onChangeSort}
										/>
										Подписки
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										<ProjectsSort
											sortBy="usersLeave"
											sort={params.sort}
											setSort={onChangeSort}
										/>
										Отписки
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										<ProjectsSort
											sortBy="dialogs"
											sort={params.sort}
											setSort={onChangeSort}
										/>
										Диалоги
									</div>
								</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="First Deposit">
										<div className="flex items-center justify-center gap-x-2">
											<ProjectsSort
												sortBy="firstDeposits"
												sort={params.sort}
												setSort={onChangeSort}
											/>
											FTD
											<IoInformation size={14} />
										</div>
									</Tooltip>
								</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="Repeat Deposit">
										<div className="flex items-center justify-center gap-x-2">
											<ProjectsSort
												sortBy="reDeposits"
												sort={params.sort}
												setSort={onChangeSort}
											/>
											RD
											<IoInformation size={14} />
										</div>
									</Tooltip>
								</MyTableCell>
								<MyTableCell className="text-center">Подп. / Диал.</MyTableCell>
								<MyTableCell className="text-center">Подп. / FTD</MyTableCell>
								<MyTableCell className="text-center">Диал. / FTD</MyTableCell>
								<MyTableCell className="text-center">FTD / RD</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="Time to FTD">
										<div className="flex items-center gap-x-2">
											TTD
											<IoInformation size={14} />
										</div>
									</Tooltip>
								</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="Time to first Write">
										<div className="flex items-center gap-x-2">
											TTW
											<IoInformation size={14} />
										</div>
									</Tooltip>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">
										<IoLink size={14} />
										Приглас. Ссылка
									</div>
								</MyTableCell>
							</MyTableRow>
						</MyTableHead>

						{/* Ivnite links list body */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<InviteLinkPreviewRow
										{...item}
										key={item.id}
									/>
								))}

							{isPending && [...Array(24)].map((_, i) => <InviteLinkPreviewRowSkeleton key={i} />)}
						</MyTableBody>
					</MyTable>

					{/* No Result */}
					{data && data.data.length == 0 && !isPending && (
						<div className="w-full px-[14px] py-9 flex gap-x-6 text-sm text-gray-500">
							<IoCloudOfflineOutline size={20} />К сожалению, но мы ничего не нашли
						</div>
					)}
				</Box>
			</div>

			{/* Pagination */}
			<MyPagination
				className="mt-6"
				pageSize={params.pageSize}
				page={params.page}
				handleChange={(e, page) => onChangePage(page)}
				counter={data?.counter || 0}
				size="small"
			/>
		</div>
	)
}
