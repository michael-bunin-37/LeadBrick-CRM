import React, {PropsWithChildren, useEffect} from "react"
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles"
// import {useThemeStore} from "@/features/theme-changer"
import {theme} from "@/utils/theme"

type Props = {}

export function ThemeProvider({children}: PropsWithChildren) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
