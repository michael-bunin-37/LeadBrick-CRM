import {SessionRequired} from "@/features/session/session-required"
import {useRouter} from "next/router"
import {useEffect} from "react"

export default function HomePage() {
	const {replace} = useRouter()
	useEffect(() => {
		replace("/app")
	}, [])

	return <div />
}
