import "@/application/styles/index.scss"
import "@/application/styles/fonts.scss"
import "react-lazy-load-image-component/src/effects/opacity.css"
import type {AppProps} from "next/app"
import {AppProvider} from "@/application/providers"

export default function App({Component, pageProps}: AppProps) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	)
}
