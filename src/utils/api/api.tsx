import kyUniversal from "ky"
import {auth} from "../firebase"
export const api = kyUniversal.extend({
	hooks: {
		beforeRequest: [
			// @ts-ignore
			async (request) => {
				// * => Insert User X-ID-TOKEN to request headers =>
				const token = await auth.currentUser?.getIdToken()
				request.headers.set("x-id-token", `${token}`)
			},
		],
		afterResponse: [
			async (req, opt, res) => {
				if (!res.ok) {
					const error = (await res.json()) as Error
					throw new Error(error.message)
				}
			},
		],
	},
	retry: {
		limit: 2,
		methods: ["get", "post", "delete", "patch"],
		statusCodes: [413],
		backoffLimit: 5000,
	},
	timeout: 5000,
})
