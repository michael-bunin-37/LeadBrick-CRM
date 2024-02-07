import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"
import {cn} from "@/utils/lib"

type Props = {}

import {styled} from "@mui/material/styles"
// import { ToastContainer } from "react-toastify";

const StyledContainer = styled(ToastContainer)({
	".Toastify__progress-bar": {
		borderRadius: "0px",
	},
})

export function SnackbarProvider({}: Props) {
	return <StyledContainer />
}
