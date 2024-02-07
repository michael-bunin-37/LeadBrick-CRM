import {auth} from "@/utils/firebase"
import {
	GoogleAuthProvider,
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth"
import {
	UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query"
import {useSession} from "./session-context"

export const useSessionLogout = (config?: UseMutationOptions<void, Error>) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: () => signOut(auth),
		onSuccess() {
			queryClient.invalidateQueries()
		},
		...config,
	})
}

export const useSessionSignInWithEmail = () =>
	useMutation<UserCredential, Error, {email: string; password: string}>({
		mutationFn: (vars) =>
			signInWithEmailAndPassword(auth, vars.email, vars.password),
	})

export const useSessionSignUpWithEmail = () =>
	useMutation<UserCredential, Error, {email: string; password: string}>({
		mutationFn: (vars) =>
			createUserWithEmailAndPassword(auth, vars.email, vars.password),
	})

export const useSessionSignInWithGoogle = (
	config?: UseMutationOptions<UserCredential, Error, void | null | undefined>,
) =>
	useMutation<UserCredential, Error>({
		mutationFn: () => signInWithPopup(auth, new GoogleAuthProvider()),
		...config,
	})
