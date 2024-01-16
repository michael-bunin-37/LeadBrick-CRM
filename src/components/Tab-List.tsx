import {cn} from "@/utils/lib"
import {BlueToken, GrayToken, PrimaryToken} from "@/utils/theme"
import TabList, {TabListProps} from "@mui/lab/TabList"
import {styled} from "@mui/material/styles"

export const MyTabList = styled(({className, ...props}: TabListProps) => (
	<TabList
		className={cn(className)}
		{...props}
	/>
))({
	".MuiTabs-indicator": {
		backgroundColor: `${GrayToken[700]} !important`,
	},
})
