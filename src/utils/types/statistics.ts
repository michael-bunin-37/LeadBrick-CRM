import {ProjectResDto} from "./project"

export interface StatisticsResDto
	extends Omit<ProjectResDto, "info" | "chatId" | "photo"> {
	windowStart?: string
	telegramChatId: string
}
