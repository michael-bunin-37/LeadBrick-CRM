import {buttonVariants} from "@/components/Button"
import {MyMenu} from "@/components/Menu"
import {MyMenuItem} from "@/components/MenuItem"
import {EtcTimezone, useDateFilterStore} from "@/entities/date-filter-store"
import {cn} from "@/utils/lib"
import {Popover} from "@mui/material"
import React, {useEffect, useState} from "react"
import {IoChevronDown} from "react-icons/io5"
import {useProjectsPersistTimezone} from "./model"
import {QueryKeys} from "@/utils/query-keys"

type ProjectsTimezoneSwitcherProps = {
	className?: string
}

function ProjectsTimezoneSwitcher({className}: ProjectsTimezoneSwitcherProps) {
	// STATE
	const [anch, setAnch] = useState<HTMLElement | null>(null)
	const {etc_gmt, setEtc_gmt} = useDateFilterStore()
	const persistTimezone = useProjectsPersistTimezone()

	// HANDLERS
	const onChange = (key: typeof etc_gmt) => {
		if (window.localStorage) {
			window.localStorage.setItem(`${QueryKeys["PERSIST.TIMEZONE"]}`, key)
		}
		setEtc_gmt(key)
	}

	// EFFECTS
	useEffect(() => {
		if (persistTimezone) setEtc_gmt(persistTimezone)
	}, [persistTimezone])

	return (
		<div className={className}>
			<button
				onClick={(e) => setAnch(e.currentTarget)}
				className={cn(
					buttonVariants({size: "sm", variant: "outlined"}),
					"gap-x-2 h-9 w-full flex items-center cursor-pointer",
				)}>
				<span>GMT:</span>
				{EtcTimezone[etc_gmt]}{" "}
				{EtcTimezone[etc_gmt] === "GMT+2" && `( Ukraine, Kyiv )`}
				<span>
					<IoChevronDown />
				</span>
			</button>

			<MyMenu
				sx={{
					"& .MuiPaper-root": {
						maxHeight: "256px",
						minWidth: "256px",
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: -12,
					horizontal: "right",
				}}
				onClose={() => setAnch(null)}
				open={!!anch}
				anchorEl={anch}>
				{/* {Object.entries(EtcTimezone).map(([key, value]) => (
					<MyMenuItem
						// @ts-ignore
						onClick={() => onChange(key)}
						key={key}
						selected={etc_gmt === key}>
						{value}
					</MyMenuItem>
				))} */}
				<MyMenuItem
					// @ts-ignore
					onClick={() => onChange("Etc/GMT-2")}
					// key={}
					selected={etc_gmt == "Etc/GMT-2"}>
					"ETC/GMT-2"
				</MyMenuItem>
				<MyMenuItem
					// @ts-ignore
					onClick={() => onChange("Etc/GMT+5")}
					selected={etc_gmt == "Etc/GMT+5"}>
					"ETC/GMT+5"
				</MyMenuItem>
			</MyMenu>
		</div>
	)
}

export {ProjectsTimezoneSwitcher}
