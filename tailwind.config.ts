import type {Config} from "tailwindcss"
// const tokens = require("./src/utils/theme")
const tokens = require("./src/utils/theme")

const screens = {}
for (const key in tokens.Breakpoints) {
	// @ts-ignore
	screens[key] = tokens.Breakpoints[key] + "px"
}

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/application/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/features/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
	],
	important: true,
	darkMode: "class",

	theme: {
		extend: {
			container: {
				center: true,
			},
		},
		colors: {
			transparent: "transparent",
			white: "#ffffff",
			gray: tokens.GrayToken,
			primary: tokens.PrimaryToken,
			error: tokens.RedToken,
			blue: tokens.BlueToken,
			green: tokens.GreenToken,
			warn: tokens.WarnToken,
		},
		screens,
		fontFamily: {
			sans: tokens.FontFamily.sans,
			medium: tokens.FontFamily.medium,
			semibold: tokens.FontFamily.semibold,
			bold: tokens.FontFamily.bold,
			black: tokens.FontFamily.black,
		},
		fontSize: {
			xs: tokens.FontHeaders.h6.fontSize,
			sm: tokens.FontHeaders.h5.fontSize,
			base: tokens.FontHeaders.h4.fontSize,
			md: tokens.FontHeaders.h3.fontSize,
			lg: tokens.FontHeaders.h2.fontSize,
			xl: tokens.FontHeaders.h1.fontSize,
		},
	},
	plugins: [],
}
export default config
