import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"

type Props = {}

export function SnackbarProvider({}: Props) {
	return <ToastContainer />
}
