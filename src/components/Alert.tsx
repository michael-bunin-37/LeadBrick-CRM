import {cn} from "@/utils/lib"
import {VariantProps, cva} from "class-variance-authority"
import {PropsWithChildren} from "react"
import {IoAlert, IoAlertCircle} from "react-icons/io5"

const variants = cva(["font-medium"], {
	variants: {
		variant: {
			info: "bg-blue-500/5 text-blue-500",
			error: "bg-error-600/5 text-error-600",
			success: "bg-green-600/5 text-green-600",
		},
		size: {
			default: "px-[14px] py-3 text-sm",
		},
	},
	defaultVariants: {
		variant: "info",
	},
})

type Props = {
	className?: string
} & VariantProps<typeof variants> &
	PropsWithChildren

export const MyAlert = ({variant = "info", size = "default", className, children}: Props) => {
	return (
		<div className={cn(variants({variant, size}), className, "flex items-center")}>
			<div className="mr-3">
				<IoAlertCircle size={18} />
			</div>
			{children}
		</div>
	)
}
