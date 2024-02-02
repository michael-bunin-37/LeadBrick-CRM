import "@/application/styles/index.scss"
import "@/application/styles/fonts.scss"
import "react-lazy-load-image-component/src/effects/opacity.css"
import type {AppProps} from "next/app"
import {AppProvider} from "@/application/providers"
import dayjs from "dayjs"

export default function App({Component, pageProps}: AppProps) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	)
}
