import {Layout} from "@/application/layout"
import {SessionRequired} from "@/features/session/session-required"
import {Navbar} from "@/widgets/navbar"
import Image from "next/image"

export default function Home() {
	return (
		<SessionRequired>
			<Layout>
				<Navbar />
			</Layout>
		</SessionRequired>
	)
}
