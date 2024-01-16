import {cn} from "@/utils/lib"
import {BlueToken, PrimaryToken} from "@/utils/theme"
import {Tab, TabProps, Tabs, TabsProps} from "@mui/material"
import {styled} from "@mui/material/styles"
import {VariantProps, cva} from "class-variance-authority"
import colors from "tailwindcss/colors"

const variants = cva([""], {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

type Props = Omit<TabsProps, "variant"> & VariantProps<typeof variants>

export const MyTabs = styled(({className, variant = "default", ...props}: Props) => (
	<Tabs
		className={cn(variants({variant}), className)}
		{...props}
	/>
))({
	".MuiTabs-indicator": {
		backgroundColor: `${PrimaryToken[400]} !important`,
	},
})
