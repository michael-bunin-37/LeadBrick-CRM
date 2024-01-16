import {MyPagination} from "@/components/Pagination"
import {MyTable, MyTableBody, MyTableCell, MyTableHead, MyTableRow} from "@/components/Table"
import {DepositPreviewRow} from "@/entities/deposit"
import {useDepositList} from "@/utils/api/deposit"
import {GrayToken} from "@/utils/theme"
import {Cursor, SortParam} from "@/utils/types/server"
import {Box, Tooltip} from "@mui/material"
import React, {useState} from "react"
import {BiLogoTelegram} from "react-icons/bi"
import {IoCloudOfflineOutline, IoHelpCircle} from "react-icons/io5"
import {ProjectDepositsFilters} from "./project-deposits-filters"

type Props = {
	projectId?: string
	className?: string
}

export function ProjectDeposits({className, projectId}: Props) {
	// STATE
	const [showUnActive, setShowUnactive] = useState(true)
	const [params, setParams] = useState<Omit<Cursor, "sort">>({
		page: 1,
		pageSize: 30,
	})

	// QUERIES
	const {data, isPending} = useDepositList({...params, chatId: projectId as string}, {enabled: !!projectId})

	// HANDLERS
	const onChangePage = (page: number) => setParams({...params, page})

	return (
		<div className={className}>
			<div className="flex items-center justify-end gap-x-2">
				{/* Projects invite links Filters */}
				{/* <ProjectInviteLinksFilters
					className="flex-grow"
					params={params}
					setParams={setParams}
				/> */}

				<ProjectDepositsFilters
					setParams={setParams}
					params={params}
				/>

				{/* Projects invite links switch active and unactive projects */}
				{/* <ProjectsUnactiveSwitcher
					setActive={setShowUnactive}
					active={showUnActive}
				/> */}
			</div>

			{/* Body & Head */}
			<div className={"relative flex-grow"}>
				<Box
					sx={{
						"&::-webkit-scrollbar": {
							height: "5px",
							width: "0px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "transparent",
							transition: "background 150ms",
						},

						"&:hover::-webkit-scrollbar-thumb": {
							background: `${GrayToken[400]}`,
						},
					}}
					className="absolute top-0 left-0 w-full h-full overflow-x-auto">
					<MyTable>
						{/* Invite links list head */}
						<MyTableHead>
							<MyTableRow>
								<MyTableCell>User Id</MyTableCell>

								<MyTableCell>
									<div className="flex items-center gap-x-2">Имя</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">Фамилия</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">
										<BiLogoTelegram size={14} />
										Никнейм
									</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">Приглас. Ссылка</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">Назв. Ссылки</div>
								</MyTableCell>
								<MyTableCell>Дата - Время</MyTableCell>
								<MyTableCell>
									<Tooltip
										placement="top-end"
										title="Time to FTD">
										<div className="flex items-center gap-x-2">
											TTD
											<IoHelpCircle
												className="text-gray-400"
												size={14}
											/>
										</div>
									</Tooltip>
								</MyTableCell>
							</MyTableRow>
						</MyTableHead>

						{/* Ivnite links list body */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<DepositPreviewRow
										{...item}
										key={item.userId}
									/>
								))}
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
