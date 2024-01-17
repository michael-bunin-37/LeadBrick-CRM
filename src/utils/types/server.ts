export enum FilterByParamEnum {
	userId = "User Id",
	date = "Дата",
	inviteLinkName = "Название ссылки",
	inviteLink = "Тело ссылки",
}

export type FilterByParam = keyof typeof FilterByParamEnum

export type FilterOperatorParam = "EQUAL" | "MORE_OR_EQUAL" | "LESS_OR_EQUAL" | "LIKE%" | "%LIKE%"
export type FilterParam = {
	filterBy: FilterByParam
	filterValue: string | string[]
	filterOperator: FilterOperatorParam
}

export type SortByParam =
	| "lastUpdated"
	| "subscribers"
	| "usersJoin"
	| "usersLeave"
	| "dialogs"
	| "firstDeposits"
	| "reDeposits"
	| "sumTimeToDeposit"
	| "countTimeToDeposit"
	| "sumTimeToDialog"
	| "countTimeToDialog"
export type SortOrderParam = "DESC" | "ASC"
export type SortParam = {
	sortBy: SortByParam
	sortOrder: SortOrderParam
}

export type Cursor = {
	page: number
	pageSize: number
	sort?: SortParam
	windowStart?: string
	windowEnd?: string
	filters?: Array<FilterParam>
	inviteLinkOrName?: string
}

export type CursorList<T> = {
	data: T
	cursorPrev: Cursor
	cursorNext: Cursor
	counter: number
}
