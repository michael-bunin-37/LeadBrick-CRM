import {ClassValue} from "class-variance-authority/types"
import clsx from "clsx"
import {twMerge} from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const truncate = (str: string, n: number) => {
	return typeof str === "string" && str?.length > n ? str.slice(0, n - 1) + "..." : str
}
