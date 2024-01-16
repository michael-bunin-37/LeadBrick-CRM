import {useMediaQuery} from "@mui/material"
import {theme} from "./theme"
import {useEffect, useRef, useState} from "react"

export const useDevice = () => {
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	const isTablet = useMediaQuery(theme.breakpoints.down("lg"))
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"))

	return {
		isMobile,
		isDesktop,
		isTablet,
	}
}

export const usePrevious = (value: any) => {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	}, [value])
	return ref.current
}

export function useDebounce<T>(value: T, delay: number) {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value)
	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)
			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler)
			}
		},
		[value, delay], // Only re-call effect if value or delay changes
	)
	return debouncedValue
}
