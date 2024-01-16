import {GrayToken, PrimaryToken} from "@/utils/theme"
import {Switch, SwitchProps} from "@mui/material"
import {alpha, styled} from "@mui/material/styles"
import {Control, Controller} from "react-hook-form"

export const MySwitch = styled((props: SwitchProps) => (
	<Switch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		{...props}
	/>
))(({theme}) => ({
	"& .MuiSwitch-switchBase": {
		// padding: 0,
		// margin: 2,
		// transitionDuration: "150ms",
		"&.Mui-checked": {
			"& + .MuiSwitch-track": {
				backgroundColor: alpha(PrimaryToken[400], 0.25),
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				// opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			// color: "#33cf4d",
			// border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color: theme.palette.mode === "light" ? GrayToken[100] : GrayToken[500],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		// boxSizing: "border-box",
		// width: 14,
		// height: 14,
		// boxShadow: "none !important",
		// border: `1px solid ${theme.palette.mode === "light" ? GrayToken[300] : GrayToken[700]}`,
	},
	"& .MuiSwitch-track": {
		// borderRadius: "999px",
		backgroundColor: theme.palette.mode === "light" ? GrayToken[200] : GrayToken[700],
		opacity: 1,
		// transition: theme.transitions.create(["background-color"], {
		// 	duration: 500,
		// }),
	},
}))

type PropsControlled = {
	slotProps?: {
		swithProps?: SwitchProps
	}
	control: Control<any>
	name: string
}

export const MySwitchControlled = (props: PropsControlled) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({field: {onChange, value, name, ref}, fieldState: {error}, formState}) => (
				<>
					<MySwitch
						inputRef={ref}
						onChange={onChange}
						value={value}
						name={name}
						{...props.slotProps?.swithProps}
					/>
				</>
			)}
		/>
	)
}
