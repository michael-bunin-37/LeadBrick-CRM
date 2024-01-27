import {cn} from "@/utils/lib"
import {ButtonBase, ButtonBaseProps} from "@mui/material"
import {styled} from "@mui/material/styles"
import {VariantProps, cva} from "class-variance-authority"

export const buttonVariants = cva(
	"rounded-md !border-transparent font-medium transition-all focus:border-blue-600",
	{
		variants: {
			variant: {
				default: "dark:bg-gray-100 dark:text-gray-50 bg-gray-100 hover:bg-gray-200 text-gray-600",
				primary: "bg-primary-600 text-gray-50",
				dark: "bg-gray-800 text-gray-50",
				transparent: "bg-transparent dark:text-white text-gray-700 dark:hover:bg-gray-100",
				outlined:
					"border dark:!border-gray-800 !border-gray-200 text-gray-700 dark:text-white dark:hover:bg-gray-100 hover:bg-gray-100",
				outlined_active:
					"border dark:!border-blue-600 !border-blue-600 text-gray-700 dark:text-white dark:hover:bg-gray-100 hover:bg-gray-100",
			},
			size: {
				default: "h-[36px] px-[14px] text-sm leading-[14px]",
				sm: "h-[32px] px-[10px] text-[12px] leading-[12px]",
				icon: "h-[32px] w-[32px] rounded-md text-sm",
				icon_sm: "h-[24px] w-[24px] rounded-[4px] text-[12px]",
				icon_xs: "h-[20px] w-[20px] rounded-sm text-[12px]",
			},
		},
		defaultVariants: {
			size: "sm",
			variant: "default",
		},
	},
)

type Props = ButtonBaseProps & VariantProps<typeof buttonVariants>

export const MyButton = styled(
	({className, variant = "default", color, size = "default", ...props}: Props) => (
		<ButtonBase
			className={cn(buttonVariants({variant, size}), className)}
			{...props}
		/>
	),
)({
	border: "1px solid",
})
