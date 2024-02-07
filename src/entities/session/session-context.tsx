import {UserModel} from "@/utils/types/user"
import {createContext, useContext} from "react"

export interface SessionContextInterface {
	user: UserModel | null
	idToken: string | null
	isUserLoading: boolean
}

export const defaultSessionState: SessionContextInterface = {
	user: null,
	idToken: null,
	isUserLoading: true,
}

export const SessionContext = createContext<SessionContextInterface>(
	{} as SessionContextInterface,
)
export const useSession = () => useContext(SessionContext)
