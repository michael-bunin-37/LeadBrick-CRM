// import {sub} from "date-fns"
import {DateFilterStoreState} from "@/entities/date-filter-store"
import dayjs from "dayjs"
import {DateRange} from "react-day-picker"
import Duration from "dayjs/plugin/duration"
import RelativeTime from "dayjs/plugin/relativeTime"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import UTC from "dayjs/plugin/utc"
import Timezone from "dayjs/plugin/timezone"
import {todo} from "node:test"
dayjs.extend(UTC)
dayjs.extend(Timezone)

export const getToday = (etc_gmt: DateFilterStoreState["etc_gmt"]) => {
	return {
		from: dayjs().tz(etc_gmt).startOf("day").toDate(),
		to: dayjs().tz(etc_gmt).endOf("day").toDate(),
	} as DateRange
}

export const getYesterday = (etc_gmt: DateFilterStoreState["etc_gmt"]) => {
	return {
		from: dayjs().tz(etc_gmt).subtract(1, "day").startOf("day").toDate(),
		to: dayjs().tz(etc_gmt).subtract(1, "day").endOf("day").toDate(),
	} as DateRange
}

export const getLastSevenDayRange = (
	etc_gmt: DateFilterStoreState["etc_gmt"],
) => {
	return {
		from: dayjs().tz(etc_gmt).subtract(6, "day").startOf("day").toDate(),
		to: dayjs().tz(etc_gmt).endOf("day").toDate(),
	} as DateRange
}

export const getCurrentWeekRange = (
	etc_gmt: DateFilterStoreState["etc_gmt"],
) => {
	return {
		// @ts-ignore
		from: dayjs().tz(etc_gmt).startOf("week").startOf("day").toDate(),
		// @ts-ignore
		to: dayjs().tz(etc_gmt).endOf("week").endOf("day").toDate(),
	} as DateRange
}

export const getLastMonthRange = (etc_gmt: DateFilterStoreState["etc_gmt"]) => {
	return {
		from: dayjs().tz(etc_gmt).startOf("month").startOf("day").toDate(),
		to: dayjs().tz(etc_gmt).endOf("month").endOf("day").toDate(),
	} as DateRange
}

export const getLastYearRange = (etc_gmt: DateFilterStoreState["etc_gmt"]) => {
	return {
		from: dayjs().tz(etc_gmt).startOf("year").startOf("day").toDate(),
		to: dayjs().tz(etc_gmt).endOf("year").endOf("day").toDate(),
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
