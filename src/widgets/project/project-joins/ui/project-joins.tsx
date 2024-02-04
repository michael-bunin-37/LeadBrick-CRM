import {useJoinsList} from "@/utils/api/joins"
import {Cursor, SortParam} from "@/utils/types/server"
import React, {useState} from "react"
import {ProjectJoinsFilters} from "./project-joins-filters"
import {Box} from "@mui/material"
import {MyTable, MyTableBody, MyTableCell, MyTableHead, MyTableRow} from "@/components/Table"
import {IoCloudOfflineOutline} from "react-icons/io5"
import {MyPagination} from "@/components/Pagination"
import {JoinPreviewRow} from "@/entities/join"

type Props = {
	projectId?: string
	className?: string
}

export function ProjectJoins({projectId, className}: Props) {
	// STATE
	const [params, setParams] = useState<Cursor>({
		page: 1,
		pageSize: 100,
		sort: {sortOrder: "DESC", sortBy: "createdAt"},
		filters: [],
	})

	// QUERIES

	const {data, isPending} = useJoinsList(
		{...params, chatId: projectId as string},
		{
			enabled: !!projectId,
		},
	)

	// HANDLERS
	const onChangeSort = (sort: SortParam) => setParams({...params, sort})
	const onChangePage = (page: number) => setParams({...params, page})

	return (
		<div className={className}>
			<div className="flex items-center justify-end gap-x-2 mb-6">
				{/* Projects invite links Filters */}
				<ProjectJoinsFilters
					className="flex-grow"
					params={params}
					setParams={setParams}
				/>
			</div>

			{/* Body & Head */}
			<div className={"relative flex-grow"}>
				<Box className="absolute top-0 left-0 w-full h-full overflow-x-auto">
					<MyTable>
						{/* Invite links list head */}
						<MyTableHead className="sticky top-[-1px] z-10">
							<MyTableCell>Имя</MyTableCell>
							<MyTableCell>Фамилия</MyTableCell>
							<MyTableCell>Никнейм</MyTableCell>
							<MyTableCell>Приглас. Ссылка</MyTableCell>
							<MyTableCell>Назв. Ссылки</MyTableCell>
							<MyTableCell>Диалог</MyTableCell>
							<MyTableCell>FTD</MyTableCell>
							<MyTableCell>RD</MyTableCell>
							<MyTableCell>Регистрация</MyTableCell>
							<MyTableCell>Первый Диалог</MyTableCell>
							<MyTableCell>Первый FTD</MyTableCell>
							<MyTableCell>Первый RD</MyTableCell>
						</MyTableHead>

						{/* Ivnite links list body */}
						<MyTableBody>
							{data &&
								data.data.map((item) => (
									<JoinPreviewRow
										{...item}
										key={item.id}
									/>
								))}

							{/* {isPending && [...Array(24)].map((_, i) => <InviteLinkPreviewRowSkeleton key={i} />)} */}
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
