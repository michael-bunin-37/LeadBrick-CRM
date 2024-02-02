// import {sub} from "date-fns"
import dayjs from "dayjs"
import {DateRange} from "react-day-picker"

export const getToday = () => {
	return {
		// @ts-ignore
		from: dayjs().utcOffset(0).startOf("day").toDate(),
		// @ts-ignore
		to: dayjs().utcOffset(0).endOf("day").toDate(),
	} as DateRange
}

export const getYesterday = () => {
	return {
		// @ts-ignore
		from: dayjs().utcOffset(0).subtract(1, "day").startOf("day").toDate(),
		// @ts-ignore
		to: dayjs().utcOffset(0).subtract(1, "day").endOf("day").toDate(),
	} as DateRange
}

export const getLastSevenDayRange = () => {
	return {
		// @ts-ignore
		from: dayjs().utcOffset(0).subtract(6, "day").startOf("day").toDate(),
		// @ts-ignore
		to: dayjs().utcOffset(0).endOf("day").toDate(),
	} as DateRange
}

export const getCurrentWeekRange = () => {
	return {
		// @ts-ignore
		from: dayjs().utcOffset(0).startOf("week").startOf("day").toDate(),
		// @ts-ignore
		to: dayjs().utcOffset(0).endOf("week").endOf("day").toDate(),
	} as DateRange
}

export const getLastMonthRange = () => {
	return {
		from: dayjs().startOf("month").startOf("day").toDate(),
		to: dayjs().endOf("month").endOf("day").toDate(),
	} as DateRange
}

export const getLastYearRange = () => {
	return {
		from: dayjs().startOf("year").startOf("day").toDate(),
		to: new Date(Date.now()),
	}
}

export enum DateFilterInitialOptionsTypeEnum {
	today = "За сегодня",
	yesterday = "За вчера",
	lastSeven = "За последние 7 дней",
	lastWeek = "За текущую неделю",
	lastMonth = "За этот месяц",
	lastYear = "За этот год",
}

export const dateFilterOptionsFunctions = {
	today: getToday,
	yesterday: getYesterday,
	lastSeven: getLastSevenDayRange,
	lastWeek: getCurrentWeekRange,
	lastMonth: getLastMonthRange,
	lastYear: getLastYearRange,
}
