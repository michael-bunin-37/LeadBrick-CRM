import {cn} from "@/utils/lib"
import {GrayToken} from "@/utils/theme"
import {MenuItem, MenuItemProps} from "@mui/material"
import {alpha, styled} from "@mui/material/styles"

export const MyMenuItem = styled(({className, ...props}: MenuItemProps) => (
	<MenuItem
		{...props}
		className={cn(className, "hover:bg-gray-200/75 hover:dark:bg-white/10")}
	/>
))(({theme, dense}) => ({
	fontSize: "14px",
	borderRadius: "4px",

	...(dense && {
		padding: "4px 14px",
	}),

	...(!dense && {
		padding: "8px 14px",
	}),

	"& + &": {
		marginTop: "4px",
	},

	"&.Mui-selected": {
		backgroundColor:
			theme.palette.mode === "light" ? `${alpha(GrayToken[200], 0.75)} !important` : `rgba(255,255,255, 0.1) !important`,
	},

	// transition: "all 150ms",
	// borderRadius: "6px",
	// fontFamily: theme.typography.fontWeightMedium as string,
	// fontSize: "15px",
	// "&:hover": {
	// 	background: theme.palette.mode == "light" ? `${GrayToken[200]} !important` : "",
	// },
	// "& + &": {
	// 	marginTop: "4px",
	// },
	// "&.Mui-selected": {
	// 	background: `${GrayToken[825]} !important`,
	// 	color: GrayToken[25],
	// 	"&:hover": {
	// 		background: `${GrayToken[825]} !important`,
	// 	},
	// },
	// "&.Mui-disabled": {
	// 	background: "transparent",
	// 	color: GrayToken[600],
	// },
}))
