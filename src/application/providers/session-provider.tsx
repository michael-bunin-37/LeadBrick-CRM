import {
	SessionContextInterface,
	SessionContext,
	defaultSessionState,
} from "@/entities/session"
import {userCreate, userGetById} from "@/entities/user"
import {auth} from "@/utils/firebase"
import {UserModel} from "@/utils/types/user"
import {onAuthStateChanged} from "firebase/auth"
import React, {PropsWithChildren, useEffect, useMemo, useState} from "react"

type Props = {}

export function SessionProvider({children}: PropsWithChildren) {
	const [state, setState] =
		useState<SessionContextInterface>(defaultSessionState)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setState(defaultSessionState)
			if (!user) {
				return setState((state) => ({
					user: null,
					isUserLoading: false,
					idToken: null,
				}))
			}

			const {uid, displayName, email, photoURL} = user
			const userDocSnap = await userGetById(user.uid)

			let userModel: UserModel = {
				uid,
				displayName: (displayName || email) as string,
				photoURL,
				email,
			}

			if (!userDocSnap.exists()) {
				userCreate(userModel)
			}

			setState({
				user: {...user, ...(userDocSnap.exists() && userDocSnap.data())},
				isUserLoading: false,
				idToken: null,
			})
		})

		return () => unsubscribe()
	}, [])

	return (
		<SessionContext.Provider value={state}>{children}</SessionContext.Provider>
	)
}
