import {userGetById, usersGetByIds} from "./api"
import {UserModel} from "@/utils/types/user"
import {DocumentData, QuerySnapshot} from "firebase/firestore"
import {QueryKeys} from "@/utils/query-keys"
import {UseQueryOptions, useQuery} from "@tanstack/react-query"

export const useUserById = (
	uid: string,
	config?: UseQueryOptions<UserModel, Error>,
) =>
	useQuery({
		queryFn: () => userGetById(uid).then((user) => user.data() as UserModel),
		queryKey: [QueryKeys["USER.BY.ID"], uid],
		...config,
	})

export const useUsersByIds = (
	uids: string[],
	config?: UseQueryOptions<UserModel[], Error>,
) =>
	useQuery({
		queryFn: () =>
			usersGetByIds(uids).then((data) => {
				const result: UserModel[] = []
				data.forEach((data) => {
					result.push(data.data() as UserModel)
				})
				return result
			}),
		queryKey: [QueryKeys["USER.BY.ID"], uids],
		...config,
	})
