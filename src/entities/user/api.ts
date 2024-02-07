import {db} from "@/utils/firebase"
import {UserModel} from "@/utils/types/user"
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	getDocs,
	query,
	collection,
	where,
	documentId,
	QuerySnapshot,
	DocumentData,
} from "firebase/firestore"

export const userCreate = (data: Partial<UserModel>) => {
	return setDoc(doc(db, "users", data.uid as string), data as UserModel).catch(
		(e) => {
			throw new Error(e)
		},
	)
}

export const userGetById = (uid: string) =>
	getDoc(doc(db, "users", uid)).catch((e) => {
		throw new Error(e)
	})

export const userUpdate = (data: Partial<UserModel>, uid: string) =>
	updateDoc(doc(db, "users", uid), data).catch((e: Error) => {
		throw new Error(e.message)
	})

export const usersGetByIds = async (uids: string[]) => {
	const q = query(collection(db, "users"), where(documentId(), "in", uids))
	return getDocs(q)
}
