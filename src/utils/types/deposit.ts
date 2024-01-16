import {ProjectResDto} from "./project"

export interface DepositResDto {
	chatId: string
	userId: string
	username: string
	firstName: string
	lastName: string
	inviteLink: string
	inviteLinkName: string
	timeToDeposit: number
	date: string
	firstDeposit: boolean
}
