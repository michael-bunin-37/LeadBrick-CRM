import {cn} from "@/utils/lib"
import {PrimaryToken, BlueToken, GrayToken} from "@/utils/theme"
import {ButtonBase, ButtonBaseProps, InputBase, InputBaseProps, TextField, TextFieldProps, textFieldClasses} from "@mui/material"
import {styled} from "@mui/material/styles"
import {VariantProps, cva} from "class-variance-authority"
import {Control, Controller} from "react-hook-form"

const variants = cva("rounded-md border transition-all text-gray-700 dark:text-gray-50 px-[14px]", {
	variants: {
		variant: {
			default: "dark:border-gray-800 border-gray-200 hover:!border-blue-600",
		},
		size: {
			default: "h-[36px] rounded-md text-sm",
			large: "h-[48px] text-sm",
		},
	},
	defaultVariants: {
		size: "default",
		variant: "default",
	},
})

type Props = Omit<InputBaseProps, "size" | "variant"> & VariantProps<typeof variants>

export const MyInput = styled(({className, color, size = "default", variant = "default", ...props}: Props) => (
	<InputBase
		className={cn(variants({size}), className)}
		{...props}
	/>
))({
	"&.Mui-focused": {
		border: `1px solid ${BlueToken["600"]} !important`,
	},
})

export const MyTextField = styled(TextField)(({theme}) => ({
	"& label.Mui-focused": {
		color: "#A0AAB4",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "#B2BAC2",
	},
	"& .MuiOutlinedInput-root": {
		"input": {
			fontSize: "14px",
		},

		"& fieldset": {
			borderRadius: "6px",
			transition: "all 150ms",
			borderWidth: "1px !important",
			borderColor: theme.palette.mode == "dark" ? GrayToken[800] : GrayToken[200],
		},
		"&:hover fieldset": {
			borderColor: BlueToken[600],
		},
		"&.Mui-focused fieldset": {
			borderColor: BlueToken[600],
		},
	},
}))

type MyInputControlledProps = {
	inputProps?: Props
	control: Control<any>
	name: string
}

export const MyInputControlled = (props: MyInputControlledProps) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({field: {onChange, value, name, ref}, fieldState: {error}, formState}) => (
				<>
					<MyInput
						inputRef={ref}
						onChange={onChange}
						value={value}
						name={name}
						error={!!error}
						{...props.inputProps}
					/>
					{error && <p className="mt-2 font-medium text-[12px] text-error-600">{error.message}</p>}
				</>
			)}
		/>
	)
}
