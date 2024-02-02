import {MyPagination} from "@/components/Pagination"
import {MyTable, MyTableBody, MyTableCell, MyTableHead, MyTableRow} from "@/components/Table"
import {StatisticsPreviewRow} from "@/entities/statistics"
import {StatisticsPreviewRowSkeleton} from "@/entities/statistics"
import {useStatisticsList, useStatisticsListCursorCounter} from "@/utils/api/statistics"
import {Cursor} from "@/utils/types/server"
import {Box, Tooltip} from "@mui/material"
import React, {useState} from "react"
import {IoCloudOfflineOutline, IoHelpCircle, IoInformation} from "react-icons/io5"
import {ProjectStatisticsFilters} from "./project-statistics-filters"
import {
	ProjectStatisticsStoreState,
	useProjectStatisticsStore,
} from "../model/project-statistics-store"

type Props = {
	projectId?: string
	className?: string
}

export function ProjectStatistics({projectId, className}: Props) {
	// STATE
	const [params, setParams] = useState<Omit<Cursor, "filters" | "sort"> & {inviteLink?: string}>({
		page: 1,
		pageSize: 30,
	})

	const {setOpen, setWindowStart, setChatId} = useProjectStatisticsStore()

	// QUERIES
	const {data, isPending} = useStatisticsList(
		{...params, telegramChatId: projectId as string},
		{enabled: !!projectId},
	)

	const {data: counter, isPending: isCounterPending} = useStatisticsListCursorCounter(
		{
			telegramChatId: projectId as string,
			...(params.windowEnd && {windowEnd: params.windowEnd}),
			...(params.windowStart && {windowStart: params.windowStart}),
		},
		{enabled: !!projectId},
	)

	// HANDLERS
	const onChangePage = (page: number) => setParams({...params, page})
	const onClickRow = (windowRange: ProjectStatisticsStoreState["windowStart"]) => {
		setWindowStart(windowRange)
		setChatId(projectId)
		setOpen(true)
	}

	return (
		<div className={className}>
			<div className="flex gap-x-2 mb-6">
				<ProjectStatisticsFilters
					className="flex-grow"
					setParams={setParams}
					params={params}
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
										Дата
										<span className="text-gray-500">{counter ? `(${counter.counter})` : ``}</span>
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										{/* <ProjectsSort
											sortBy="usersJoin"
											sort={params.sort}
											setSort={onChangeSort}
										/> */}
										Подписки
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										{/* <ProjectsSort
											sortBy="usersLeave"
											sort={params.sort}
											setSort={onChangeSort}
										/> */}
										Отписки
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center justify-center gap-x-2">
										{/* <ProjectsSort
											sortBy="dialogs"
											sort={params.sort}
											setSort={onChangeSort}
										/> */}
										Диалоги
									</div>
								</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="First Deposit">
										<div className="flex items-center justify-center gap-x-2">
											{/* <ProjectsSort
												sortBy="firstDeposits"
												sort={params.sort}
												setSort={onChangeSort}
											/> */}
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
							</MyTableRow>
						</MyTableHead>

						{/* Statistics List */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<StatisticsPreviewRow
										onClick={() => onClickRow(item.windowStart)}
										{...item}
										key={item.windowStart}
									/>
								))}

							{!data &&
								isPending &&
								[...Array(12)].map((_, i) => <StatisticsPreviewRowSkeleton key={i} />)}
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
				counter={counter?.counter || 0}
				size="small"
			/>
		</div>
	)
}
