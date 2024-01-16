import React, {PropsWithChildren, useMemo} from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

type Props = {}

export function QueryProvider({children}: PropsWithChildren) {
	const queryClient = useMemo(() => {
		return new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					staleTime: 1000 * 60 * 30,
					gcTime: 1000 * 60 * 60 * 24,
				},
			},
		})
	}, [])

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
