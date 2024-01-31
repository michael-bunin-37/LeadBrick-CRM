export type ProjectReqDto = {
	chatId: string
	name: string
	subscribers?: number
}

export interface ProjectResDto extends ProjectReqDto {
	chatId: string
	id: string
	verified: boolean
	usersJoin: number
	usersLeave: number
	dialogs: number
	firstDeposits: number
	reDeposits: number
	info: {
		id: number
	}
	photo: {
		small_file_id: string
		big_file_id: string
	}
	lastUpdated: string
	countTimeToDialog: number
	sumTimeToDialog: number
	countTimeToDeposit: number
	sumTimeToDeposit: number
	tag?: string
}
