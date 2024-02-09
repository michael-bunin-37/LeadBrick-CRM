import "@/application/styles/index.scss"
import "@/application/styles/fonts.scss"
import "react-lazy-load-image-component/src/effects/opacity.css"
import type {AppProps} from "next/app"
import {AppProvider} from "@/application/providers"
import dayjs from "dayjs"

import Duration from "dayjs/plugin/duration"
import RelativeTime from "dayjs/plugin/relativeTime"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import UTC from "dayjs/plugin/utc"
import Timezone from "dayjs/plugin/timezone"

import "dayjs/locale/ru"
import {useEffect} from "react"
dayjs.locale("ru")
dayjs.extend(UTC)
dayjs.extend(Timezone)
dayjs.extend(Duration)
dayjs.extend(RelativeTime)
dayjs.extend(LocalizedFormat)

export default function App({Component, pageProps}: AppProps) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	)
}
