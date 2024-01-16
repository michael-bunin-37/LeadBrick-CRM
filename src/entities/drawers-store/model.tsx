import {QueryKeys} from "@/utils/query-keys"
import {create} from "zustand"

export type DrawerTypes = "PROJECT.CREATE"

export interface DrawersStoreState {
	type: DrawerTypes | null
	isOpen: boolean
}

export interface DrawersStoreActions {
	setType: (type: DrawersStoreState["type"]) => void
	setOpen: (isOpen: boolean) => void
}

export const useDrawersStore = create<DrawersStoreActions & DrawersStoreState>((set) => ({
	// STATE
	type: null,
	isOpen: false,

	setType: (type) => set({type}),
	setOpen: (isOpen) => set({isOpen}),
}))
