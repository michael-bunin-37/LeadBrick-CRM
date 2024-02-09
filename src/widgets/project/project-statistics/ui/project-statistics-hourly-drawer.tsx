import {MyButton} from "@/components/Button"
import {MyDrawer} from "@/components/Drawer"
import React, {useState} from "react"
import {useProjectStatisticsStore} from "../model/project-statistics-store"
import {
	IoCloseOutline,
	IoCloudOfflineOutline,
	IoInformation,
} from "react-icons/io5"
import {useStatisticsHourlyList} from "@/utils/api/statistics"
import {Cursor} from "@/utils/types/server"
import dayjs from "dayjs"
import {Box, Tooltip} from "@mui/material"
import {
	MyTable,
	MyTableBody,
	MyTableCell,
	MyTableHead,
	MyTableRow,
} from "@/components/Table"
import {
	StatisticsPreviewRow,
	StatisticsPreviewRowSkeleton,
} from "@/entities/statistics"
import {useDateFilterStore} from "@/entities/date-filter-store"

type ProjectsStatisticsHourlyProps = {}

function ProjectsStatisticsHourlyDrawer({}: ProjectsStatisticsHourlyProps) {
	// STATE
	const {windowStart, isOpen, setOpen, chatId} = useProjectStatisticsStore()
	const [params, setParams] = useState<
		Omit<Cursor, "filters" | "sort"> & {inviteLink?: string}
	>({
		page: 1,
		pageSize: 30,
	})

	const {etc_gmt} = useDateFilterStore()

	// QUERIES
	const {data, isPending} = useStatisticsHourlyList(
		{
			...params,
			timeZone: etc_gmt,
			telegramChatId: chatId as string,
			...(windowStart && {
				windowStart: windowStart,
				// @ts-ignore
				windowEnd: dayjs(windowStart).endOf("day").toISOString(),
			}),
		},
		{
			enabled: !!(chatId && windowStart),
		},
	)

	// HANDLERS
	const onClose = () => setOpen(false)

	return (
		<MyDrawer
			onClose={onClose}
			anchor="right"
			slotProps={{
				backdrop: {className: "!bg-gray-900/10"},
			}}
			open={isOpen}
			PaperProps={{
				sx: {
					minWidth: "calc(100vw - 128px)",
				},
				className: "!p-0",
			}}>
			<div className="h-full flex flex-col">
				<div className="flex items-center justify-between p-6">
					<div className="flex items-center gap-x-6 font-semibold text-sm text-gray-700">
						Статистика:{" "}
						{windowStart && dayjs(windowStart).tz(etc_gmt).format("LL")}
					</div>
					<MyButton
						onClick={onClose}
						variant="default"
						size={"icon_sm"}>
						<IoCloseOutline
							size={16}
							className="text-gray-600"
						/>
					</MyButton>
				</div>
				<div className="px-6 pb-3 flex flex-grow">
					{/* Body & Head */}
					<div className={"relative flex-grow"}>
						<Box className="absolute top-0 left-0 w-full h-full overflow-x-auto">
							<MyTable>
								{/* Invite links list head */}
								<MyTableHead className="sticky top-[-1px] z-10">
									<MyTableRow>
										<MyTableCell>
											<div className="flex items-center gap-x-2">Дата</div>
										</MyTableCell>
										<MyTableCell>
											<div className="flex items-center justify-center gap-x-2">
												Подписки
											</div>
										</MyTableCell>
										<MyTableCell>
											<div className="flex items-center justify-center gap-x-2">
												Отписки
											</div>
										</MyTableCell>
										<MyTableCell>
											<div className="flex items-center justify-center gap-x-2">
												Диалоги
											</div>
										</MyTableCell>
										<MyTableCell>
											<Tooltip
												placement="top-end"
												title="First Deposit">
												<div className="flex items-center justify-center gap-x-2">
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
										<MyTableCell className="text-center">
											Подп. / Диал.
										</MyTableCell>
										<MyTableCell className="text-center">
											Подп. / FTD
										</MyTableCell>
										<MyTableCell className="text-center">
											Диал. / FTD
										</MyTableCell>
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
										data.data.map((item, i) => (
											<StatisticsPreviewRow
												{...item}
												key={i}
											/>
										))}

									{!data &&
										isPending &&
										[...Array(12)].map((_, i) => (
											<StatisticsPreviewRowSkeleton key={i} />
										))}
								</MyTableBody>
							</MyTable>

							{/* No Result */}
							{data && data.data.length == 0 && !isPending && (
								<div className="w-full px-[14px] py-9 flex gap-x-6 text-sm text-gray-500">
									<IoCloudOfflineOutline size={20} />К сожалению, но мы ничего
									не нашли
								</div>
							)}
						</Box>
					</div>
				</div>
			</div>
		</MyDrawer>
	)
}

export {ProjectsStatisticsHourlyDrawer}
