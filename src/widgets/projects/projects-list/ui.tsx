import {Cursor, CursorList, SortParam} from "@/utils/types/server"
import React from "react"
import {Box, Tooltip} from "@mui/material"
import {
	MyTable,
	MyTableBody,
	MyTableCell,
	MyTableHead,
	MyTableRow,
} from "@/components/Table"
import {MyPagination} from "@/components/Pagination"
import {ProjectPreviewRow, ProjectPreviewRowSkeleton} from "@/entities/project"
import {ProjectsSort} from "@/features/projects/projects-sort"
import {
	IoCloudOfflineOutline,
	IoInformation,
	IoPricetag,
	IoPricetagsOutline,
} from "react-icons/io5"
import {ProjectResDto} from "@/utils/types/project"
import {ProjectsAddTag} from "@/features/projects/projects-add-tag"
import {ProjectsDeleteTag} from "@/features/projects/projects-delete-tag"
import {ProjectsTotalStatistics} from "../projects-total"

type Props = {
	className?: string
	params: Cursor
	setParams: (params: Cursor) => void
	data?: CursorList<ProjectResDto[]>
	isPending: boolean
}

export function ProjectsList({
	className,
	data,
	params,
	setParams,
	isPending,
}: Props) {
	// HANDLERS
	const onChangeSort = (sort: SortParam) => setParams({...params, sort})
	const onChangePage = (page: number) => setParams({...params, page})

	return (
		<div className={className}>
			<div className={"relative flex-grow"}>
				<Box className="absolute top-0 left-0 w-full h-full overflow-x-auto">
					<MyTable>
						{/* Projects list head */}
						<MyTableHead className="sticky top-[-1px] z-10">
							<MyTableRow>
								<MyTableCell>Название проекта</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										<ProjectsSort
											sortBy="subscribers"
											sort={params.sort}
											setSort={onChangeSort}
										/>
										Подписчики
									</div>
								</MyTableCell>
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
									<div className="flex items-center gap-x-3">
										<IoPricetagsOutline />
										Тег
									</div>
								</MyTableCell>
							</MyTableRow>
						</MyTableHead>

						{/* Projects list */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<ProjectPreviewRow
										Slots={{
											ProjectAddTag: ProjectsAddTag,
											ProjectDeleteTag: ProjectsDeleteTag,
											Img: (
												<div className="h-6 w-6 rounded-[4px] bg-gray-100" />
											),
										}}
										{...item}
										key={item.id}
									/>
								))}

							{isPending &&
								[...Array(24)].map((_, i) => (
									<ProjectPreviewRowSkeleton key={i} />
								))}

							<ProjectsTotalStatistics
								className="sticky bottom-0"
								params={params}
							/>
						</MyTableBody>
					</MyTable>

					{/* No Result */}
					{data && data.data.length == 0 && !isPending && (
						<div className="w-full px-[14px] py-9 flex gap-x-6 text-sm text-gray-500">
							<IoCloudOfflineOutline size={20} />К сожалению, но мы ничего не
							нашли
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
