import React, {PropsWithChildren, useEffect} from "react"
import dayjs from "dayjs"
import Duration from "dayjs/plugin/duration"
import RelativeTime from "dayjs/plugin/relativeTime"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone") // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ru")
dayjs.extend(Duration)
dayjs.extend(RelativeTime)
dayjs.extend(LocalizedFormat)

import "dayjs/locale/ru"

type Props = {} & PropsWithChildren

export function DatePluginProvider({children}: Props) {
	// useEffect(() => {
	// 	dayjs.locale("ru")
	// 	dayjs.extend(Duration)
	// 	dayjs.extend(RelativeTime)
	// 	dayjs.extend(LocalizedFormat)
	// }, [])

	return children
}
