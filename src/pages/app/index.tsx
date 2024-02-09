import {Layout} from "@/application/layout"
import {SessionRequired} from "@/features/session/session-required"
import {Navbar} from "@/widgets/navbar"
import Image from "next/image"
import {useRouter} from "next/router"
import {useEffect} from "react"

const Redirect = () => {
	const {replace} = useRouter()
	useEffect(() => {
		replace("/app/projects")
	}, [])

	return null
}

export default function Home() {
	return (
		<SessionRequired>
			<Layout>
				<Redirect />
			</Layout>
		</SessionRequired>
	)
}
