import React, {PropsWithChildren} from "react"
import {ErrorBoundaryProvider} from "./error-boundary-provider"
import {ThemeProvider} from "./theme-provider"
import {QueryProvider} from "./query-client-provider"
import {EmotionProvider} from "./emotion-cache-provider"
import {Router} from "next/router"
// @ts-ignore
import nProgress from "nprogress"
import {DrawersProvider} from "./drawers-provider"
import {SnackbarProvider} from "./snackbar-prodiver"
import {SessionRequired} from "@/features/session/session-required"
import {SessionProvider} from "./session-provider"
import dayjs from "dayjs"

nProgress.configure({showSpinner: true, minimum: 0.4})
Router.events.on("routeChangeStart", (url) => {
	nProgress.start()
})
Router.events.on("routeChangeComplete", (url) => {
	nProgress.done(false)
})

export function AppProvider({children}: PropsWithChildren) {
	return (
		<ErrorBoundaryProvider>
			<SessionProvider>
				<EmotionProvider>
					<QueryProvider>
						<ThemeProvider>
							{children}
							<DrawersProvider />
							<SnackbarProvider />
						</ThemeProvider>
					</QueryProvider>
				</EmotionProvider>
			</SessionProvider>
		</ErrorBoundaryProvider>
	)
}
