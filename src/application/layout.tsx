import React, {PropsWithChildren} from "react"

export function Layout({children}: PropsWithChildren) {
	return <div className="flex h-screen w-full">{children}</div>
}
