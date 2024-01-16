import colors from "tailwindcss/colors"
import {Fade} from "@mui/material"
import {createTheme} from "@mui/material/styles"

// * => Color Scheme Tokens =>
export const GrayToken = colors.zinc
export const RedToken = colors.red
export const BlueToken = colors.blue
export const PrimaryToken = colors.rose
export const GreenToken = colors.green
export const WarnToken = colors.amber

// * => Typography =>
export const SystemFonts = [
	"-apple-system",
	"BlinkMacSystemFont",
	"Segoe UI",
	"Roboto",
	"Helvetica",
	"Arial",
	"sans-serif",
	"Apple Color Emoji",
	"Segoe UI Emoji",
	"Segoe UI Symbol",
]

export const FontFamily = {
	sans: ["Inter Regular", ...SystemFonts],
	medium: ["Inter Medium", ...SystemFonts],
	semibold: ["Inter SemiBold", ...SystemFonts],
	bold: ["Inter Bold", ...SystemFonts],
	extrabold: ["Inter Extra-Bold", ...SystemFonts],
	black: ["Inter Black", ...SystemFonts],
}

export const FontHeaders = {
	h1: {
		fontSize: 48,
		fontFamily: FontFamily.bold.join(","),
	},
	h2: {
		fontSize: 24,
		fontFamily: FontFamily.bold.join(","),
	},
	h3: {
		fontSize: 20,
		fontFamily: FontFamily.bold.join(","),
	},
	h4: {
		fontSize: 16,
		fontFamily: FontFamily.bold.join(","),
	},
	h5: {
		fontSize: 14,
		fontFamily: FontFamily.bold.join(","),
	},
	h6: {
		fontSize: 12,
		fontFamily: FontFamily.bold.join(","),
	},
}

// * => Grid Breakpoints =>
export const Breakpoints = {
	xs: 415,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1280,
}

// * => MUI Theme =>
export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: PrimaryToken[500],
			contrastText: PrimaryToken[900],
			light: PrimaryToken[50],
		},
		text: {
			primary: GrayToken[700],
			secondary: GrayToken[500],
			disabled: GrayToken[400],
		},
		success: {
			main: GreenToken[500],
			light: GreenToken[50],
			dark: GreenToken[900],
		},
		warning: {
			main: WarnToken[500],
			light: WarnToken[50],
			dark: WarnToken[900],
		},
		error: {
			main: colors.red[400],
			light: colors.red[50],
			dark: colors.red[900],
		},
		divider: GrayToken[200],
		background: {
			default: "#ffffff",
			paper: "#ffffff",
		},
	},
	typography: {
		fontFamily: FontFamily.sans.join(","),
		fontWeightMedium: FontFamily.medium.join(","),
		fontWeightBold: FontFamily.bold.join(","),
	},
	breakpoints: {
		values: Breakpoints,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					border: `1px solid`,
					borderColor: GrayToken[100],
					backgroundImage: "none",
					backgroundColor: `#ffffff !important`,
					boxShadow: "0px 6px 24px 4px rgba(0, 0, 0, 0.025)",
					borderRadius: "4px",
					padding: "0px 8px !important",
				},
			},
		},
		MuiPopover: {
			defaultProps: {
				TransitionComponent: Fade,
				transitionDuration: 150,
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					background: `${GrayToken[700]} !important`,
					color: `white !important`,
				},
			},
			defaultProps: {
				TransitionComponent: Fade,
				TransitionProps: {timeout: 150},
			},
		},
		// MuiButtonBase: {
		// 	defaultProps: {
		// 		disableRipple: true,
		// 	},
		// },
		// MuiIconButton: {
		// 	defaultProps: {
		// 		disableRipple: true,
		// 	},
		// },
	},
})
