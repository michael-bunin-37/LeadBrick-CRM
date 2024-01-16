import React, {PropsWithChildren, useEffect} from "react"
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles"
// import {useThemeStore} from "@/features/theme-changer"
import {theme} from "@/utils/theme"

type Props = {}

export function ThemeProvider({children}: PropsWithChildren) {
	// const {theme: themeMode, setTheme} = useThemeStore()

	// Initial Theme
	// useEffect(() => {
	// 	if (typeof window !== "undefined" && window.localStorage) {
	// 		const storedPrefs = window.localStorage.getItem("current-theme")
	// 		if (typeof storedPrefs === "string") {
	// 			setTheme(storedPrefs as "light" | "dark")
	// 			return
	// 		}

	// 		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	// 			setTheme("dark")
	// 			return
	// 		}
	// 	}
	// }, [])

	// Observer theme change event
	// useEffect(() => {
	// 	if (themeMode == "light") {
	// 		window.document.documentElement.classList.remove("dark")
	// 		return
	// 	}

	// 	if (themeMode == "dark") {
	// 		window.document.documentElement.classList.add("dark")
	// 		return
	// 	}
	// }, [themeMode])

	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
