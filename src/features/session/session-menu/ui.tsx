import React, {useState} from "react"
import {FaUserAlt} from "react-icons/fa"
import {LazyLoadImage} from "react-lazy-load-image-component"
import {LuUser2} from "react-icons/lu"
import {MyMenu} from "@/components/Menu"
import {useSession, useSessionLogout} from "@/entities/session"
import {useRouter} from "next/router"
import {MyMenuItem} from "@/components/MenuItem"
import {RiLogoutBoxRFill} from "react-icons/ri"

type SessionMenuProps = {}

function SessionMenu({}: SessionMenuProps) {
	const {user} = useSession()
	const [anchor, setAnchor] = useState<HTMLElement | null>(null)
	const {push} = useRouter()

	//  MUTATIONS
	const {mutate: sessionLogout} = useSessionLogout({
		onSuccess: () => {
			push("/app/auth/in")
		},
	})

	if (!user) return null

	return (
		<React.Fragment>
			<button
				onClick={(e) => setAnchor(e.currentTarget)}
				className="relative h-10 w-10 flex items-center justify-center rounded-md bg-gray-100 transition-all hover:bg-gray-200">
				<LuUser2
					size={20}
					className="text-gray-400"
				/>

				<div className="absolute top-[-2px] left-[-2px] h-[9px] w-[9px] rounded-full bg-primary-500" />
			</button>

			<MyMenu
				onClose={() => setAnchor(null)}
				open={!!anchor}
				anchorEl={anchor}
				slotProps={{paper: {className: "min-w-[256px]"}}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: 56,
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}>
				<div className="px-[14px] py-2 flex items-start gap-x-4">
					<div>
						<p className="dark:text-gray-50 text-gray-700 text-sm font-medium">
							{user.displayName}
						</p>
						<p className="text-gray-500 text-xs mt-[2px] font-medium">
							Пользователь
						</p>
					</div>
				</div>

				<div className="px-[14px] my-2">
					<div className="h-[1px] w-full border border-gray-200 border-dashed" />
				</div>

				<MyMenuItem
					onClick={() => sessionLogout()}
					className="gap-x-3 text-error-500">
					<RiLogoutBoxRFill />
					Вийти
				</MyMenuItem>
			</MyMenu>
		</React.Fragment>
	)
}

export {SessionMenu}
