import {CacheProvider} from "@emotion/react"
import {createEmotionCache} from "@/utils/emotion"
import React, {PropsWithChildren, useMemo} from "react"

type Props = {}

export function EmotionProvider({children}: PropsWithChildren) {
	const clientSideEmotionCache = useMemo(() => createEmotionCache(), [])
	return <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>
}
