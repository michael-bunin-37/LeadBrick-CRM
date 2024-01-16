import {cn} from "@/utils/lib"
import {BlueToken, GrayToken, PrimaryToken} from "@/utils/theme"
import {Tab, TabProps, tabClasses} from "@mui/material"
import {styled} from "@mui/material/styles"
import {VariantProps, cva} from "class-variance-authority"
import colors from "tailwindcss/colors"

const variants = cva([cn(`text-sm font-medium`)], {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

type Props = Omit<TabProps, "variant"> & VariantProps<typeof variants>

export const MyTab = styled(({className, variant = "default", ...props}: Props) => (
	<Tab
		disableRipple
		className={cn(variants({variant}), className)}
		{...props}
	/>
))({
	textTransform: "capitalize",
	padding: "0px",
	color: `${GrayToken[400]}`,

	"& + &": {
		marginLeft: "24px",
	},

	[`&.${tabClasses.selected}`]: {
		color: `${GrayToken[700]} !important`,
	},
})
