import {ProjectResDto} from "./project"

export type JoinResDto = {
	"chatId": number
	"id": number
	"inviteLink": string
	"inviteLinkName": string
	"username": string
	"firstName": string
	"lastName": string
	"dialog": true
	"firstDeposit": true
	"reDeposit": number
	"createdAt": string
	"dialogAt": string
	"depositAt": string
	"reDepositAt": string
}
