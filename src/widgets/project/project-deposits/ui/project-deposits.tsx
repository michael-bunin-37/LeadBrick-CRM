import {MyPagination} from "@/components/Pagination"
import {
	MyTable,
	MyTableBody,
	MyTableCell,
	MyTableHead,
	MyTableRow,
} from "@/components/Table"
import {DepositPreviewRow, DepositPreviewRowSkeleton} from "@/entities/deposit"
import {useDepositList} from "@/utils/api/deposit"
import {GrayToken} from "@/utils/theme"
import {Cursor, SortParam} from "@/utils/types/server"
import {Box, Tooltip} from "@mui/material"
import React, {useState} from "react"
import {BiLogoTelegram} from "react-icons/bi"
import {IoCloudOfflineOutline, IoHelpCircle, IoLink} from "react-icons/io5"
import {ProjectDepositsFilters} from "./project-deposits-filters"
import {ProjectDepositsTotal} from "./project-deposits-total"

type Props = {
	projectId?: string
	className?: string
}

export function ProjectDeposits({className, projectId}: Props) {
	// STATE
	const [params, setParams] = useState<Omit<Cursor, "sort">>({
		page: 1,
		pageSize: 30,
	})

	// QUERIES
	const {data, isPending} = useDepositList(
		{...params, chatId: projectId as string},
		{enabled: !!projectId},
	)

	// HANDLERS
	const onChangePage = (page: number) => setParams({...params, page})

	return (
		<div className={className}>
			<div className="flex gap-x-2 mb-6">
				<ProjectDepositsFilters
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
										User Id
										<span className="text-gray-500">
											{data ? `(${data.counter})` : ``}
										</span>
									</div>
								</MyTableCell>

								<MyTableCell>
									<div className="flex items-center gap-x-2">Имя</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">Фамилия</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">Никнейм</div>
								</MyTableCell>
								<MyTableCell>
									<div className="flex items-center gap-x-2">
										<IoLink size={14} />
										Приглас. Ссылка
									</div>
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
								<MyTableCell>Тип Депозита</MyTableCell>
							</MyTableRow>
						</MyTableHead>

						{/* Ivnite links list body */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<DepositPreviewRow
										{...item}
										key={item.date}
									/>
								))}

							{!data &&
								isPending &&
								[...Array(12)].map((_, i) => (
									<DepositPreviewRowSkeleton key={i} />
								))}
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
