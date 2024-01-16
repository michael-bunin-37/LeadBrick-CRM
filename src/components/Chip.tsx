import {cn} from "@/utils/lib"
import {ButtonBase, ButtonBaseProps, Chip, ChipProps} from "@mui/material"
import {styled} from "@mui/material/styles"
import {VariantProps, cva} from "class-variance-authority"

const variants = cva("rounded-md font-medium rounded-full dark:text-white", {
	variants: {
		variant: {
			default: "dark:text-gray-50 bg-gray-100 text-gray-700",
		},
		size: {
			default: "h-[28px] px-2 text-sm",
			sm: "h-[22px] text-[12px] px-2",
		},
	},
	defaultVariants: {
		size: "sm",
		variant: "default",
	},
})

type Props = Omit<ChipProps, "variant" | "size"> & VariantProps<typeof variants>

export const MyChip = styled(({className, variant = "default", color, size = "default", ...props}: Props) => (
	<Chip
		className={cn(variants({variant, size}), className)}
		{...props}
	/>
))({
	"& .MuiChip-label": {
		padding: "0px !important",
	},
})
