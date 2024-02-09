import {DateFilterStoreState} from "@/entities/date-filter-store"
import {QueryKeys} from "@/utils/query-keys"
import {useEffect, useState} from "react"

export const useProjectsPersistTimezone = () => {
	const [timezone, setTimezone] = useState<
		DateFilterStoreState["etc_gmt"] | null
	>(null)

	useEffect(() => {
		if (window.localStorage) {
			const timezone = window.localStorage.getItem(
				`${QueryKeys["PERSIST.TIMEZONE"]}`,
			)

			if (timezone) {
				setTimezone(timezone as DateFilterStoreState["etc_gmt"])
			}
		}
	}, [])

	return timezone
}
